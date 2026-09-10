import type { IconType } from "react-icons";
import { isSoundEnabled } from "@/hooks/use-sound-enabled";
import { playTone } from "@/lib/sound";
import { hoverTick } from "@/lib/sound-palette";
import { cn } from "@/lib/utils";

export function SkillCard({
  name,
  Icon,
  color,
  className,
}: {
  name: string;
  Icon: IconType;
  color?: string;
  className?: string;
}) {
  const featured = Boolean(color || className);

  return (
    <div
      className="group relative flex flex-col items-center gap-1.5"
      onMouseEnter={() => {
        if (isSoundEnabled()) playTone(hoverTick);
      }}
    >
      <div
        className={cn(
          "bg-card flex size-14 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:z-10 group-hover:scale-125",
          featured ? className : "border-foreground/20 text-foreground/80"
        )}
        style={
          color
            ? {
                borderColor: color,
                color,
                boxShadow: `0 0 14px color-mix(in oklch, ${color} 40%, transparent)`,
              }
            : undefined
        }
      >
        <Icon className="size-7" aria-hidden="true" />
      </div>
      <span
        className={cn(
          "font-mono text-[10px] whitespace-nowrap",
          featured ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </div>
  );
}
