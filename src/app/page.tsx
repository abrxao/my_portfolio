import { HeroSection } from "@/components/sections/HeroSection";
import {
  CursorFollow,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
import { UnderConstructionBanner } from "@/components/under-construction";
export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-lvw overflow-x-hidden">
      <UnderConstructionBanner />
      <CursorProvider>
        <CursorFollow>
          <div className="h-4 w-4 rounded-lg bg-zinc-600 dark:bg-zinc-200">
            .
          </div>
        </CursorFollow>
      </CursorProvider>
      <HeroSection />
    </main>
  );
}
