import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dimuth Portfolio",
  description: "Next.js 14 + Tailwind CSS + shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          `${jetbrainsMono.variable} min-h-screen bg-background text-foreground antialiased`
        }
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
