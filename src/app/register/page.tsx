import RegisterForm from "@/components/registration/RegisterForm";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for Medha Samvardhan Gurukul Sunday School program. Secure your spot in our transformative 1-year value-based education program.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Register | Medha Samvardhan Gurukul",
    description: "Secure your spot in our transformative 1-year value-based education program.",
    url: "https://medhasamvardhangurukul.com/register",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Medha Samvardhan Gurukul" }],
  },
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section (Logo & Branding) */}
      <div className="lg:w-1/2 bg-[#F7F4EB] flex flex-col items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#D5CDBD] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A4D39]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9B3A30]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-500">
            <Image
              src="/logo.png"
              alt="Medha Samvardhan Gurukul Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#122E43] text-center tracking-tight leading-tight">
            Medha Samvardhan <br className="hidden sm:block" />
            <span className="text-[#9B3A30]">Gurukul</span>
          </h1>
          <div className="h-1 w-16 bg-[#D5CDBD] mt-6 mb-4 rounded-full"></div>
          <p className="text-[#5C6B73] text-lg text-center max-w-sm font-medium">
            Building Character, Confidence & Culture
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="w-full max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-serif text-[#122E43]">
              Register for the Program
            </h2>
            <p className="mt-2 text-sm text-[#5C6B73]">
              Fill in your details below to secure your spot
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-[#D5CDBD]/60 bg-white p-6 shadow-xl sm:p-8 dark:bg-neutral-900 dark:border-neutral-700 relative z-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
