"use client";

import DotPattern from "@/components/ui/dot-pattern";
import Particles from "@/components/ui/particles";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const BackgroundPattern = () => {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "mask-[radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]",
            "dark:fill-slate-700"
          )}
        />
        <Particles
          className="absolute inset-0"
          quantity={64}
          ease={80}
          color={isLightTheme ? "#000" : "#fff"}
          drift={0.3}
          refresh
        />
      </div>

      {/* A second, sparser layer floating above every other layer (header,
          content, footer) for a "dust in the air" effect - more opaque and
          more restless than the background one, tuned entirely through
          Particles' own props rather than special-cased in its code. */}
      <Particles
        className="pointer-events-none fixed inset-0 z-60"
        quantity={28}
        ease={80}
        size={0.5}
        minAlpha={0.2}
        maxAlpha={0.5}
        drift={0.5}
        vy={0.03}
        color={isLightTheme ? "#000" : "#fff"}
        refresh
      />
    </>
  );
};
