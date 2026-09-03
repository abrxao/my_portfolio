"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toogle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/client";

const navLinks = [
  { href: "#home", key: "home", enabled: true },
  { href: "#projects", key: "projects", enabled: false },
  { href: "#experience", key: "experience", enabled: false },
  { href: "#publications", key: "publications", enabled: false },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLabels: Record<(typeof navLinks)[number]["key"], string> = {
    home: t("header.nav.home"),
    projects: t("header.nav.projects"),
    experience: t("header.nav.experience"),
    publications: t("header.nav.publications"),
  };

  return (
    <header className="bg-background/80 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={`/${locale}#home`}
          className="text-xl font-bold tracking-tight"
        >
          Abraão A.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => {
            const isDisabled = !link.enabled;
            return (
              <Link
                key={link.href}
                href={isDisabled ? "#" : link.href}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isDisabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={isDisabled ? t("header.underConstruction") : ""}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : undefined}
              >
                {navLabels[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button asChild>
            <Link href="https://www.linkedin.com/in/abrxao" target="_blank">
              {t("header.viewLinkedin")}
            </Link>
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button onClick={toggleMenu} variant="ghost" size="icon">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">{t("header.toggleMenu")}</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="bg-background absolute top-16 left-0 w-full shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => {
              const isDisabled = !link.enabled;
              return (
                <Link
                  key={link.href}
                  href={isDisabled ? "#" : link.href}
                  onClick={(e) => {
                    if (isDisabled) {
                      e.preventDefault();
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                  className={cn(
                    "text-lg font-medium",
                    isDisabled && "text-muted-foreground/50 cursor-not-allowed"
                  )}
                  title={isDisabled ? t("header.underConstruction") : ""}
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : undefined}
                >
                  {navLabels[link.key]}
                </Link>
              );
            })}
            <Button asChild className="mt-4">
              <Link
                href="https://www.linkedin.com/in/abrxao"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.viewLinkedin")}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
