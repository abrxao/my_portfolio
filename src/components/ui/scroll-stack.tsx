"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface ScrollStackContextValue {
  progress: MotionValue<number>;
  count: number;
}

const ScrollStackContext = createContext<ScrollStackContextValue | null>(
  null
);

function useScrollStack() {
  const context = useContext(ScrollStackContext);
  if (!context) {
    throw new Error("ScrollStackItem must be used within a ScrollStack");
  }
  return context;
}

interface ScrollStackProps {
  count: number;
  vhPerItem?: number;
  className?: string;
  children: ReactNode;
}

// A pinned scroll-reveal stack: the section is as tall as
// count * vhPerItem. While the user scrolls through that height the sticky
// stage stays pinned in the viewport - the page doesn't visibly advance -
// and scroll progress (0 -> 1 across that whole height) drives which
// ScrollStackItem is showing instead.
export function ScrollStack({
  count,
  vhPerItem = 120,
  className,
  children,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <ScrollStackContext.Provider
      value={{ progress: scrollYProgress, count }}
    >
      <div
        ref={containerRef}
        style={{ height: `${count * vhPerItem}vh` }}
        className="relative w-full"
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <div
            className={cn(
              "relative min-h-[420px] w-full max-w-sm",
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </ScrollStackContext.Provider>
  );
}

interface ScrollStackItemProps {
  index: number;
  className?: string;
  children: ReactNode;
}

// Each item owns a slice of the stack's scroll progress. It slides in and
// snaps to full opacity over the first fraction of its slice, then holds in
// place (fully readable, not fading with the next item) for the rest of it
// - the "hold" is the remaining, larger part of the slice.
export function ScrollStackItem({
  index,
  className,
  children,
}: ScrollStackItemProps) {
  const { progress, count } = useScrollStack();
  const segmentSize = 1 / count;
  const start = index * segmentSize;
  const end = start + segmentSize;
  const fadeEnd = start + (end - start) * 0.2;
  const rest = index * 16;

  // The staggered horizontal offset ("rest") fans the stack out on desktop,
  // but on narrow viewports there's no slack left in the container to
  // absorb it, so later windows get clipped past the edge. Drop it on
  // mobile and let items slide in flush instead.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const restX = isDesktop ? rest : 0;

  const x = useTransform(progress, [start, fadeEnd], [140 + restX, restX]);
  const elementRef = useRef<HTMLDivElement>(null);

  // Opacity is written to the DOM directly on every scroll tick instead of
  // going through the `style` prop's MotionValue handling. A sticky-pinned
  // target confuses Motion's hardware-accelerated opacity path (it produces
  // a fade-in-then-fade-out curve instead of holding at 1), so this bypasses
  // that path entirely.
  useMotionValueEvent(progress, "change", (latest) => {
    const t = (latest - start) / (fadeEnd - start);
    if (elementRef.current) {
      elementRef.current.style.opacity = String(Math.min(1, Math.max(0, t)));
    }
  });

  return (
    <motion.div
      ref={elementRef}
      style={{ opacity: 0, x, y: rest }}
      className={cn("absolute inset-x-0 top-0", className)}
    >
      {children}
    </motion.div>
  );
}
