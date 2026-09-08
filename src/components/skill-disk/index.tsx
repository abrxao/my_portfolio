"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { SkillCard } from "./skill-card";
import { CARD_SIZE, SKILLS } from "./skills";
import { useDiskRotation } from "./use-disk-rotation";

// A ring of skill cards spinning in 3D. Each card is placed around the ring
// via rotateY + translateZ so it always faces outward; backface-visibility
// hides cards once they've rotated past the side edge, giving the floating
// "disk" look instead of a flat carousel.
export function SkillsDisk() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const { ringRef, isDragging, handlers } = useDiskRotation(
    !prefersReducedMotion
  );

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    );
  }

  const count = SKILLS.length;
  const angleStep = 360 / count;
  const radius = Math.round(CARD_SIZE / 2 / Math.tan(Math.PI / count));

  return (
    <div
      className="relative mx-auto h-64 w-full touch-pan-y overflow-hidden select-none perspective-distant"
      role="img"
      aria-label={SKILLS.map((skill) => skill.name).join(", ")}
      {...handlers}
    >
      <div
        ref={ringRef}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transform-3d",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        {SKILLS.map((skill, index) => (
          <div
            key={skill.name}
            className="absolute top-1/2 left-1/2 backface-hidden"
            style={{
              width: CARD_SIZE,
              transform: `translate(-50%, -50%) rotateY(${index * angleStep}deg) translateZ(${radius}px)`,
            }}
          >
            <SkillCard {...skill} />
          </div>
        ))}
      </div>
    </div>
  );
}
