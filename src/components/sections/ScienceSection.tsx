import { RayTracingStack } from "@/components/ray-tracing-stack";
import { getServerTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

export async function ScienceSection({ locale }: { locale: Locale }) {
  const { t } = await getServerTranslation(locale);

  return (
    <section id="science" className="relative w-full px-6 pt-18 md:pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("science.punchline")}
        </h2>
        <p className="text-foreground/70 mt-4 md:text-lg">
          {t("science.punchlineSubtitle")}
        </p>
      </div>
      <RayTracingStack />
    </section>
  );
}
