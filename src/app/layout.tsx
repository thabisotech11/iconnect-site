import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/providers";
import { ThemeProvider } from "@/components/layout/theme-toggle";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CompareBar } from "@/components/product/compare-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iconnectpreowned.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "iConnect Pre-Owned | Certified Pre-Owned iPhones, Samsung & MacBooks — South Africa",
    template: "%s | iConnect Pre-Owned",
  },
  description:
    "Shop certified pre-owned iPhones, Samsung Galaxy, iPads, Apple Watches, AirPods and MacBooks in South Africa. 60-point tested, 30-day warranty, nationwide delivery, trade-ins and financing.",
  keywords: [
    "pre-owned iPhone South Africa",
    "refurbished Samsung Galaxy",
    "certified used MacBook",
    "trade in phone South Africa",
    "sell my iPhone South Africa",
  ],
  authors: [{ name: "iConnect Pre-Owned" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "iConnect Pre-Owned",
    title: "iConnect Pre-Owned | Premium Pre-Owned Devices You Can Trust",
    description:
      "Certified pre-owned Apple & Samsung devices — tested, warrantied and delivered nationwide across South Africa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "iConnect Pre-Owned",
    description: "Premium pre-owned devices you can trust. Certified, warrantied, nationwide delivery.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <AppProviders>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <CompareBar />
            <WhatsAppButton />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
