"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import en from "../../public/locales/en/common.json";
import ptBR from "../../public/locales/pt-BR/common.json";
import fr from "../../public/locales/fr/common.json";
import { useLocale } from "@/hooks/use-locale";
import { defaultNS, getOptions } from "./settings";

// Locale files are tiny (single "common" namespace), so we bundle them
// statically instead of fetching via a backend plugin. This keeps `t()`
// fully synchronous on both the server-rendered pass of a client component
// and the client, which avoids the hydration flash / race you'd get from
// mutating a shared i18next instance's "current language" via
// changeLanguage() (async, and a client component's SSR pass never runs
// the effect that would trigger it).
if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    ...getOptions(),
    resources: {
      en: { common: en },
      "pt-BR": { common: ptBR },
      fr: { common: fr },
    },
  });
}

/**
 * Client-side translation hook. Resolves the current locale itself (from
 * the route, via `useLocale`) so components never need it passed as a prop.
 * The returned `t` is fixed to that locale via `getFixedT`, independent of
 * the shared i18next instance's mutable "current language".
 */
export function useTranslation(
  ns: string | string[] = defaultNS,
  options?: { keyPrefix?: string }
) {
  const locale = useLocale();
  const ret = useTranslationOrg(ns, options);
  const namespace = Array.isArray(ns) ? ns[0] : ns;
  const t = ret.i18n.getFixedT(locale, namespace, options?.keyPrefix);
  return { ...ret, t, locale };
}
