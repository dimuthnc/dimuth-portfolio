import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import dynamic from "next/dynamic";
import { getSiteUrl, defaultOgImage } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const Toaster = dynamic(() => import("sonner").then((m) => ({ default: m.Toaster })), {
  ssr: false,
});

/* The four faces the design system declares (theme/tokens.css). next/font
   self-hosts them; globals.css points the --fx-font-* tokens at these vars. */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const fontVars = [sora.variable, inter.variable, jetbrainsMono.variable, instrumentSerif.variable].join(" ");

const site = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: site,
  title: {
    default: "Dimuth Menikgamage",
    template: "%s | Dimuth Menikgamage",
  },
  description:
    "Senior Software Engineer @ Crédit Agricole CIB. Building reliable platforms, APIs, and developer tools.",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "Dimuth Menikgamage – Blog RSS Feed" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dimuth Menikgamage",
    description: "Senior Software Engineer @ Crédit Agricole CIB.",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Dimuth Menikgamage — Portfolio",
      },
    ],
    siteName: "Dimuth Menikgamage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimuth Menikgamage",
    description: "Senior Software Engineer @ Crédit Agricole CIB.",
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVars}>
      <body className="fx-page flex min-h-dvh flex-col">
        <ThemeProvider
          attribute={["class", "data-fx-theme"]}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main id="content" className="flex-1 py-10 sm:py-14">
            {children}
          </main>
          <SiteFooter />
          <Toaster position="top-center" />
        </ThemeProvider>
        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
