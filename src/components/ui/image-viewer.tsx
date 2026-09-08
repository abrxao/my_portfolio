"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/utils";

interface ImageViewerImage {
  src: string;
  alt: string;
}

interface ImageViewerProps {
  images: ImageViewerImage[];
  className?: string;
  sizes?: string;
  previousLabel?: string;
  nextLabel?: string;
  goToLabel?: (index: number) => string;
}

// Minimum horizontal drag, in pixels, before a swipe counts as a page
// change instead of a tap.
const SWIPE_THRESHOLD = 40;

// A single image is just a picture. More than one turns it into a small
// carousel - prev/next buttons, dot indicators, and a swipe gesture, since
// hover-only controls are unreachable on touch. The swipe listener lives on
// its own layer behind the buttons so dragging never fights with tapping
// them.
export function ImageViewer({
  images,
  className,
  sizes = "(min-width: 768px) 320px, 90vw",
  previousLabel = "Previous image",
  nextLabel = "Next image",
  goToLabel = (index) => `Go to image ${index}`,
}: ImageViewerProps) {
  const [index, setIndex] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const hasMultiple = images.length > 1;

  if (images.length === 0) return null;

  const goTo = (next: number) =>
    setIndex((next + images.length) % images.length);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setSwipeStartX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartX !== null) {
      const deltaX = event.clientX - swipeStartX;
      if (deltaX > SWIPE_THRESHOLD) goTo(index - 1);
      else if (deltaX < -SWIPE_THRESHOLD) goTo(index + 1);
    }
    setSwipeStartX(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={cn(
        "border-border/60 relative w-full overflow-hidden rounded-md border",
        className
      )}
    >
      <div
        className="absolute inset-0 touch-pan-y select-none"
        onPointerDown={hasMultiple ? handlePointerDown : undefined}
        onPointerUp={hasMultiple ? handlePointerUp : undefined}
        onPointerCancel={() => setSwipeStartX(null)}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes={sizes}
          className="zoom-150 object-cover"
        />
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => goTo(index - 1)}
            className="bg-background/70 text-foreground absolute top-1/2 left-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => goTo(index + 1)}
            className="bg-background/70 text-foreground absolute top-1/2 right-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
          >
            <ChevronRight className="size-3.5" />
          </button>
          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((image, dotIndex) => (
              <button
                key={image.src}
                type="button"
                aria-label={goToLabel(dotIndex + 1)}
                onClick={() => goTo(dotIndex)}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  dotIndex === index ? "bg-foreground" : "bg-foreground/30"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
