import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getServerTranslation } from "@/i18n/server";
import { isLocale, locales } from "@/i18n/settings";
import { Analytics } from "@vercel/analytics/next";

const tektur = localFont({
  src: "../../../src/assets/fonts/tektur_font.ttf",
  display: "swap",
  variable: "--font-tektur",
});

const siteUrl = "https://abrxao.dev.br";
const ogLocales: Record<(typeof locales)[number], string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
  fr: "fr_FR",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { t } = await getServerTranslation(locale);

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    authors: [{ name: "Abraão Albuquerque" }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Abraão Albuquerque",
      images: ["/portrait.webp"],
      locale: ogLocales[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/portrait.webp"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <Analytics />
      <body className={`${tektur.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
