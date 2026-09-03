import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { defaultNS, getOptions, type Locale } from "./settings";

async function initI18next(lng: Locale, ns: string | string[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
}

/**
 * Resolves a `t` function for Server Components. Each call spins up its own
 * i18next instance (cheap: resources are just JSON) so requests never share
 * mutable state.
 */
export async function getServerTranslation(
  lng: Locale,
  ns: string | string[] = defaultNS,
  keyPrefix?: string
) {
  const i18nextInstance = await initI18next(lng, ns);
  const namespace = Array.isArray(ns) ? ns[0] : ns;
  return {
    t: i18nextInstance.getFixedT(lng, namespace, keyPrefix),
    i18n: i18nextInstance,
  };
}
