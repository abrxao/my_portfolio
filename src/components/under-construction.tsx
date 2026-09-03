import { cn } from "@/lib/utils";
import { getServerTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

interface UnderConstructionBannerProps {
  locale: Locale;
  className?: string;
}

export async function UnderConstructionBanner({
  locale,
  className,
}: UnderConstructionBannerProps) {
  const { t } = await getServerTranslation(locale);

  return (
    <div
      className={cn(
        "absolute top-12 -left-18 z-9999 w-72 -rotate-45 transform bg-yellow-400 py-1 text-center font-bold tracking-wider text-black uppercase shadow-lg",
        className
      )}
      aria-hidden="true"
    >
      <p>{t("underConstructionBanner.line1")}</p>
      <p>{t("underConstructionBanner.line2")}</p>
    </div>
  );
}
