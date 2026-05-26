import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { HideOnHome } from "@/components/site/HideOnHome";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "850 English OS",
  description: "Learn more with fewer words.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <HideOnHome><Header /></HideOnHome>
          <div className="flex-1">{children}</div>
          <HideOnHome><Footer /></HideOnHome>
        </div>
      </body>
    </html>
  );
}
