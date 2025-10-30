import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/header";

const tektur = localFont({
  src: "../../src/assets/fonts/tektur_font.ttf",
  display: "swap",
  variable: "--font-tektur",
});

export const metadata: Metadata = {
  title: "Abraão Albuquerque | Software Engineer",
  description:
    "Dual Degree Engineering student specializing in Cybersecurity & E-payment, with hands-on full-stack development experience.",
  authors: [{ name: "Abraão Albuquerque" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tektur.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
