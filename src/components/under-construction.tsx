import { cn } from "@/lib/utils";

interface UnderConstructionBannerProps {
  className?: string;
}

export function UnderConstructionBanner({
  className,
}: UnderConstructionBannerProps) {
  return (
    <div
      className={cn(
        "absolute top-12 -left-18 z-9999 w-72 -rotate-45 transform bg-yellow-400 py-1 text-center font-bold tracking-wider text-black uppercase shadow-lg",
        className
      )}
      aria-hidden="true"
    >
      <p>Under</p>
      <p>Construction</p>
    </div>
  );
}
