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
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var accent = localStorage.getItem('accentColor') || 'blue';
                  document.documentElement.setAttribute('data-accent', accent);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen relative" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <GlobalBackground />
          <div className="scan-line" />
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
