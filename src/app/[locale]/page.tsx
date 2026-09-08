import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OtherProjectsSection } from "@/components/sections/OtherProjectsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { BackgroundPattern } from "@/components/background-pattern";
import { CustomCursor } from "@/components/custom-cursor";
import { isLocale } from "@/i18n/settings";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main className="relative mx-auto max-w-lvw">
      <BackgroundPattern />
      <CustomCursor />
      <HeroSection locale={locale} />
      <AboutSection />
      <ProjectsSection locale={locale} />
      <OtherProjectsSection locale={locale} />
      <SkillsSection locale={locale} />
    </main>
  );
}
