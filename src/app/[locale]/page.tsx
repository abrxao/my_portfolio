import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BackgroundPattern } from "@/components/background-pattern";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
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
      <CursorProvider>
        <CursorFollow>
          <div className="h-4 w-4 rounded-lg bg-zinc-600 dark:bg-zinc-200">
            .
          </div>
        </CursorFollow>
      </CursorProvider>
      <HeroSection locale={locale} />
      <AboutSection />
    </main>
  );
}
