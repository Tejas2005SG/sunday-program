import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Medha Samvardhan Gurukul. We're here to answer any questions about our 1-year Sunday School youth program.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Medha Samvardhan Gurukul",
    description: "Get in touch with Medha Samvardhan Gurukul. We're here to answer any questions about our youth program.",
    url: "https://medhasamvardhangurukul.com/contact",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Contact Medha Samvardhan Gurukul" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
