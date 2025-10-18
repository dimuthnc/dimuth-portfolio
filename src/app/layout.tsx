import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import dynamic from "next/dynamic";
import { getSiteUrl, defaultOgImage } from "@/lib/seo";

const Toaster = dynamic(() => import("sonner").then((m) => ({ default: m.Toaster })), {
  ssr: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main
            id="content"
            className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8"
          >
            {children}
          </main>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
