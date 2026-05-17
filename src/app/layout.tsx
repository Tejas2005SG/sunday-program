import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: {
      default: "Medha Samvardhan Gurukul | Sunday School for Youth",
      template: "%s | Medha Samvardhan Gurukul",
  },
  description:
    "A 1-year Sunday School program by Gaurang Dham for students of standards 8 to 10, focused on character, confidence, culture, and spiritual wisdom.",
  keywords: [
    "Sunday School for Youth",
    "Atmonnati Gurukula",
    "Sanskar Gurukula",
    "Character development for students",
    "Gaurang Dham",
    "Youth value education",
  ],
  openGraph: {
    title: "Atmonnati Gurukula | Sunday School for Youth",
    description:
      "A structured 1-year Sunday School for students of Std. 8th, 9th, and 10th focused on character, personality, emotional strength, and life purpose.",
    type: "website",
  },
  twitter: {
    title: "Medha Samvardhan Gurukul | Sunday School for Youth",
    description:
      "Value-based youth education program at Gaurang Dham for students of Std. 8th, 9th, and 10th.",
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
      className={cn("h-full", "antialiased", outfit.variable, notoSansDevanagari.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
