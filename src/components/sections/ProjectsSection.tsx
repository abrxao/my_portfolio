import { ProjectsStack } from "@/components/projects-stack";
import { getServerTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const { t } = await getServerTranslation(locale);

  return (
    <section id="projects" className="relative w-full px-6 pt-18 md:pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("projects.punchline")}
        </h2>
        <p className="text-foreground/70 mt-4 md:text-lg">
          {t("projects.punchlineSubtitle")}
        </p>
      </div>
      <ProjectsStack />
    </section>
  );
}
