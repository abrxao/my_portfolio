"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { isSoundEnabled } from "@/hooks/use-sound-enabled";
import { playTone } from "@/lib/sound";
import { cardEnter, cardExit } from "@/lib/sound-palette";
import { cn } from "@/lib/utils";

// Shared across every ScrollStackItem instance so a fast scroll that flips
// several cards within one frame burst collapses to a single audible cue
// instead of overlapping sounds firing simultaneously.
let lastStackSoundAt = 0;
const STACK_SOUND_MIN_GAP_MS = 90;

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

// Each item owns a slice of the stack's scroll progress, but doesn't scrub
// with it: crossing into a slice just flips the item to "active" and lets a
// fixed, eased transition carry it in, independent of how fast the user
// scrolled. It holds there - fully readable, not fading with the next item -
// until the user scrolls back above its own slice, which reverses the same
// transition to slide it back out.
export function ScrollStackItem({
  index,
  className,
  children,
}: ScrollStackItemProps) {
  const { progress, count } = useScrollStack();
  const segmentSize = 1 / count;
  const start = index * segmentSize;
  const rest = index * 16;

  // The staggered horizontal offset ("rest") fans the stack out on desktop,
  // but on narrow viewports there's no slack left in the container to
  // absorb it, so later windows get clipped past the edge. Drop it on
  // mobile and let items slide in flush instead.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const restX = isDesktop ? rest : 0;

  // Strictly-greater-than matters for the first item: scrollYProgress is
  // clamped to a minimum of 0, so with `>=` its threshold (0) would already
  // be satisfied at mount, before the section is even scrolled into view,
  // and its entrance would play off-screen instead of when the user gets
  // there.
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(progress.get() > start);
  }, [progress, start]);
  useMotionValueEvent(progress, "change", (latest) => {
    setIsActive((current) => {
      const next = latest > start;
      if (next !== current) {
        const now = Date.now();
        if (now - lastStackSoundAt > STACK_SOUND_MIN_GAP_MS) {
          lastStackSoundAt = now;
          if (isSoundEnabled()) playTone(next ? cardEnter : cardExit);
        }
      }
      return next === current ? current : next;
    });
  });

  return (
    <motion.div
      initial={false}
      animate={
        isActive
          ? { opacity: 1, x: restX, y: rest }
          : { opacity: 0, x: 140 + restX, y: rest }
      }
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute inset-x-0 top-0", className)}
    >
      {children}
    </motion.div>
  );
}
