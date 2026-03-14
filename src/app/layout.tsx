import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Founder Show — Real Stories, Real Founders, Real Impact",
  description:
    "The Founder Show hosted by Girish Singania — intimate conversations with visionary founders. Stories that build startups, fuel ambition, and inspire action.",
  keywords: "podcast, founders, startup, entrepreneurship, Girish Singania, The Founder Show",
  openGraph: {
    title: "The Founder Show",
    description: "Conversations with visionary founders hosted by Girish Singania.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased bg-brand-dark text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
