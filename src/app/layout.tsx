import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroSpark — Aerospace Learning Ecosystem",
  description:
    "A futuristic aerospace engineering ecosystem combining education, R&D, and enterprise solutions for the next generation of aerospace professionals.",
  keywords: [
    "aerospace",
    "education",
    "drone",
    "DGCA",
    "CATIA",
    "CFD",
    "FEA",
    "AS9100D",
    "engineering",
    "SaaS",
  ],
  authors: [{ name: "AeroSpark" }],
  openGraph: {
    title: "AeroSpark — Aerospace Learning Ecosystem",
    description:
      "Master aerospace engineering through industry-grade courses, hands-on R&D, and expert consultation.",
    type: "website",
    siteName: "AeroSpark",
  },
};

import { GlobalBackground } from "@/components/layout/global-bg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen relative" suppressHydrationWarning>
        <GlobalBackground />
        <div className="scan-line" />
        {children}
      </body>
    </html>
  );
}
