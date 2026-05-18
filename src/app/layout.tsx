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
  metadataBase: new URL("https://medhasamvardhangurukul.com"), // Placeholder domain, change when deploying
  title: {
    default: "Medha Samvardhan Gurukul | Value-Based Education for Youth",
    template: "%s | Medha Samvardhan Gurukul",
  },
  description:
    "A transformative 1-year Sunday School program by Gaurang Dham for students of Std. 8 to 10. Focused on character building, confidence, emotional strength, and spiritual wisdom.",
  keywords: [
    "Sunday School for Youth",
    "Medha Samvardhan Gurukul",
    "Atmonnati Gurukula",
    "Sanskar Gurukula",
    "Character development for students",
    "Gaurang Dham",
    "Youth value education",
    "Personality Development",
    "Spiritual Wisdom",
  ],
  authors: [{ name: "Gaurang Dham" }],
  creator: "Gaurang Dham",
  publisher: "Gaurang Dham",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Medha Samvardhan Gurukul | Sunday School for Youth",
    description:
      "A structured 1-year Sunday School for students of Std. 8th, 9th, and 10th focused on character, personality, emotional strength, and life purpose.",
    url: "https://medhasamvardhangurukul.com",
    siteName: "Medha Samvardhan Gurukul",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Medha Samvardhan Gurukul Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medha Samvardhan Gurukul | Sunday School for Youth",
    description:
      "Value-based youth education program at Gaurang Dham for students of Std. 8th, 9th, and 10th.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
