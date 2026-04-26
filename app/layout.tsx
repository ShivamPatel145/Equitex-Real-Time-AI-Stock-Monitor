import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Equitex — Indian Stock Market Terminal",
    template: "%s | Equitex",
  },
  description:
    "Professional-grade Indian stock market terminal. Real-time SENSEX, NIFTY 50, sector heatmaps, AI-powered market analysis, and live stock screener — all in one place.",
  keywords: [
    "Indian stock market",
    "NSE BSE live",
    "NIFTY 50",
    "SENSEX",
    "stock screener India",
    "market dashboard",
    "equity terminal",
    "stock analysis",
  ],
  authors: [{ name: "Equitex" }],
  creator: "Equitex",
  metadataBase: new URL("https://equitex.pro"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://equitex.pro",
    title: "Equitex — Indian Stock Market Terminal",
    description:
      "Professional-grade Indian stock market terminal. Real-time SENSEX, NIFTY 50, sector heatmaps, AI-powered market analysis.",
    siteName: "Equitex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equitex — Indian Stock Market Terminal",
    description:
      "Professional-grade Indian stock market terminal. Real-time SENSEX, NIFTY 50, sector heatmaps, AI-powered market analysis.",
    creator: "@equitexpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
