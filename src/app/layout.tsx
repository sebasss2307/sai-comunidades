import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { getAnalyticsRepository } from "@/repositories";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SAI Comunidades",
    template: "%s · SAI Comunidades",
  },
  description:
    "Administración residencial, gestión de condominios y comunidad en Santiago poniente.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

async function recordVisitOnce() {
  const analytics = getAnalyticsRepository();
  await analytics.recordVisit();
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await recordVisitOnce();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}