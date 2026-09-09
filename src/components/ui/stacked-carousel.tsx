"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSoundEnabled } from "@/hooks/use-sound-enabled";
import { playSample } from "@/lib/sound";
import { cn } from "@/lib/utils";

const VISIBLE_LAYERS = 3;
const DRAG_COMMIT_DISTANCE = 80;
const DRAG_COMMIT_VELOCITY = 400;
const SWIPE_SOUND_URL = "/floraphonic-movement-swipe-whoosh-3-186577.mp3";
const SWIPE_SOUND_GAIN = 0.25;

// Indexed by offset from the active card (0 = front). Cards fan out to
// alternating sides rather than shrinking in place, since a same-width card
// scaled down and centered would sit fully hidden behind the front one
// regardless of how tall or short its content is.
const LAYER_TRANSFORMS = [
  { scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 },
  { scale: 0.97, x: -16, y: 10, rotate: -3, opacity: 0.85 },
  { scale: 0.94, x: 18, y: 18, rotate: 3, opacity: 0.7 },
];

interface StackedCarouselProps {
  items: ReactNode[];
  className?: string;
  ariaLabel?: string;
}

// A shallow deck of cards fanned behind the active one, drag-to-flip like a
// hand of cards instead of a plain next/prev slide. Only the front layer is
// interactive; the peeking layers behind are `inert` so their content (links,
// text) never steals focus or gets announced twice. Items can differ in
// height - the stage measures the tallest of the currently visible layers on
// every step so a shorter or taller card next in line never gets clipped or
// leaves dead space below it.
export function StackedCarousel({
  items,
  className,
  ariaLabel,
}: StackedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState<number>();
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const count = items.length;
  const layerCount = Math.min(VISIBLE_LAYERS, count);

  // Sound plays here so every way of passing a card - dragging it off, or
  // clicking the prev/next buttons - gets the same cue.
  const go = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + count) % count);
    if (isSoundEnabled()) playSample(SWIPE_SOUND_URL, SWIPE_SOUND_GAIN);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (
      info.offset.x < -DRAG_COMMIT_DISTANCE ||
      info.velocity.x < -DRAG_COMMIT_VELOCITY
    ) {
      go(1);
    } else if (
      info.offset.x > DRAG_COMMIT_DISTANCE ||
      info.velocity.x > DRAG_COMMIT_VELOCITY
    ) {
      go(-1);
    }
  };

  const layers = useMemo(
    () =>
      Array.from({ length: layerCount }, (_, offset) => ({
        index: (activeIndex + offset) % count,
        offset,
      })),
    [activeIndex, count, layerCount]
  );

  useEffect(() => {
    const nodes = layerRefs.current
      .slice(0, layerCount)
      .filter((node): node is HTMLDivElement => node !== null);
    if (nodes.length === 0) return;

    const measure = () =>
      setStageHeight(Math.max(...nodes.map((node) => node.offsetHeight)));

    measure();
    const observer = new ResizeObserver(measure);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activeIndex, layerCount]);

  return (
    <div
      className={cn("mx-auto w-full max-w-md", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className="relative transition-[height] duration-500 ease-out"
        style={{ height: stageHeight }}
      >
        {layers.map(({ index, offset }) => {
          const isFront = offset === 0;
          const transform = LAYER_TRANSFORMS[offset];

          return (
            <div
              key={index}
              ref={(node) => {
                layerRefs.current[offset] = node;
              }}
              className={cn(
                "absolute inset-x-0 top-0",
                !isFront && "pointer-events-none"
              )}
              style={{ zIndex: layerCount - offset }}
              inert={!isFront}
            >
              <motion.div
                initial={false}
                animate={transform}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={isFront ? handleDragEnd : undefined}
                whileDrag={{ cursor: "grabbing" }}
                className={isFront ? "cursor-grab" : undefined}
              >
                {items[index]}
              </motion.div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Previous project"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  index === activeIndex
                    ? "bg-foreground"
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Next project"
            onClick={() => go(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
