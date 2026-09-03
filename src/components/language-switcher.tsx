"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/i18n/client";
import { cookieName, locales, type Locale } from "@/i18n/settings";

export function LanguageSwitcher() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const localeLabels: Record<Locale, string> = {
    en: t("language.en"),
    "pt-BR": t("language.pt-BR"),
    fr: t("language.fr"),
  };

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      document.cookie = `${cookieName}=${nextLocale}; path=/; max-age=31536000`;
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.push(segments.join("/"));
    },
    [locale, pathname, router]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => switchLocale(loc)}>
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
