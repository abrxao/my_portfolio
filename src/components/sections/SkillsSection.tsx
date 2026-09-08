import { SkillsDisk } from "@/components/skill-disk";
import { getServerTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

export async function SkillsSection({ locale }: { locale: Locale }) {
  const { t } = await getServerTranslation(locale);

  return (
    <section id="skills" className="relative w-full px-6 pt-18 md:pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("skills.punchline")}
        </h2>
        <p className="text-foreground/70 mt-4 md:text-lg">
          {t("skills.punchlineSubtitle")}
        </p>
      </div>
      <div className="mt-16 md:mt-24">
        <SkillsDisk />
      </div>
    </section>
  );
}
