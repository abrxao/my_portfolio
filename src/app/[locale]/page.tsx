import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BackgroundPattern } from "@/components/background-pattern";
import { CustomCursor } from "@/components/custom-cursor";
import { UnderConstructionBanner } from "@/components/under-construction";
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
      <UnderConstructionBanner locale={locale} />
      <CustomCursor />
      <HeroSection locale={locale} />
      <AboutSection />
    </main>
  );
}
