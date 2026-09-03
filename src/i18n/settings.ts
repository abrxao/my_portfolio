export const fallbackLng = "en";
export const locales = [fallbackLng, "pt-BR", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultNS = "common";
export const cookieName = "i18next";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getOptions(lng: Locale = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
