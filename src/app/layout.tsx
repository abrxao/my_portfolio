import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={`${tektur.className}`}>
      <body>{children}</body>
    </html>
  );
}
