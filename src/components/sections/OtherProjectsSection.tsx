import { OtherProjectsStack } from "@/components/other-projects-stack";
import { getServerTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

export async function OtherProjectsSection({ locale }: { locale: Locale }) {
  const { t } = await getServerTranslation(locale);

  return (
    <section
      id="other-projects"
      className="relative w-full px-6 pt-18 md:pt-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("otherProjects.punchline")}
        </h2>
        <p className="text-foreground/70 mt-4 md:text-lg">
          {t("otherProjects.punchlineSubtitle")}
        </p>
      </div>
      <OtherProjectsStack />
    </section>
  );
}
