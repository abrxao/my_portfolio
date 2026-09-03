"use client";

import { useParams } from "next/navigation";
import { fallbackLng, isLocale, type Locale } from "@/i18n/settings";

/**
 * Reads the current locale straight from the matched route's `[locale]`
 * segment (via Next's own router context), so Client Components never need
 * it passed down as a prop. Correct on both the server-rendered pass and
 * after hydration since it comes from the actual route being rendered.
 */
export function useLocale(): Locale {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale;
  return locale && isLocale(locale) ? locale : fallbackLng;
}
