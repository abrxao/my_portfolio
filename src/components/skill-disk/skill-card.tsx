import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export function SkillCard({
  name,
  Icon,
  color,
}: {
  name: string;
  Icon: IconType;
  color?: string;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "bg-card flex size-14 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:z-10 group-hover:scale-125",
          !color && "border-border/60"
        )}
        style={
          color
            ? { borderColor: color, boxShadow: `0 0 14px ${color}66` }
            : undefined
        }
      >
        <Icon
          className={cn("size-7", !color && "text-foreground/80")}
          style={color ? { color } : undefined}
          aria-hidden="true"
        />
      </div>
      <span
        className={cn(
          "font-mono text-[10px] whitespace-nowrap",
          color ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </div>
  );
}
