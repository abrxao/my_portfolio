"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toogle";
import { LanguageSwitcher } from "./language-switcher";
import { SoundToggle } from "./sound-toggle";
import { useTranslation } from "@/i18n/client";

export function Header() {
  const { t, locale } = useTranslation();

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={`/${locale}#home`}
          className="text-xl font-bold tracking-tight"
        >
          Abraão A.
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="https://www.linkedin.com/in/abrxao" target="_blank">
              {t("header.viewLinkedin")}
            </Link>
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}
