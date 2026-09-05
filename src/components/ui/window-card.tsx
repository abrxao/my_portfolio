import * as React from "react";

import { cn } from "@/lib/utils";

function WindowCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-card"
      className={cn(
        "bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function WindowCardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-card-header"
      className={cn(
        "bg-muted/40 flex items-center gap-1.5 border-b px-3 py-2",
        className
      )}
      {...props}
    >
      <span
        className="size-2.5 rounded-full bg-red-500/70"
        aria-hidden="true"
      />
      <span
        className="size-2.5 rounded-full bg-yellow-500/70"
        aria-hidden="true"
      />
      <span
        className="size-2.5 rounded-full bg-green-500/70"
        aria-hidden="true"
      />
      <div className="text-muted-foreground ml-2 truncate font-mono text-xs">
        {children}
      </div>
    </div>
  );
}

function WindowCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-card-content"
      className={cn("p-4", className)}
      {...props}
    />
  );
}

interface WindowCardLineProps extends React.ComponentProps<"p"> {
  index: number;
}

function WindowCardLine({
  index,
  className,
  children,
  ...props
}: WindowCardLineProps) {
  return (
    <p
      data-slot="window-card-line"
      className={cn(
        "flex gap-3 font-mono text-base leading-relaxed",
        className
      )}
      {...props}
    >
      <span className="text-muted-foreground/50 shrink-0 tabular-nums select-none">
        {index}
      </span>
      <span>{children}</span>
    </p>
  );
}

export { WindowCard, WindowCardHeader, WindowCardContent, WindowCardLine };
