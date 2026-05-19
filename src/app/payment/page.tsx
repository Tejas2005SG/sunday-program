"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PaymentQR from "@/components/registration/PaymentQR";
import Loader from "@/components/registration/Loader";
import Image from "next/image";

function PaymentContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  if (!userId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950/30">
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
          Invalid Access
        </h2>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400/80">
          Please register first before proceeding to payment.
        </p>
        <a
          href="/register"
          className="mt-4 inline-block rounded-xl bg-[#9B3A30] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9B3A30]/90"
        >
          Go to Registration
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Payment
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl font-serif text-[#122E43]">
          Complete Your Payment
        </h1>
        <p className="mt-2 text-sm text-[#5C6B73]">
          Scan the QR code below to make payment via Google Pay
        </p>
      </div>

      <PaymentQR userId={userId} token={token} />
    </>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white lg:h-screen lg:overflow-hidden">
      {/* Left Section (Logo & Branding) */}
      <div className="lg:w-1/2 bg-[#F7F4EB] flex flex-col items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#D5CDBD] relative overflow-hidden lg:h-full">
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

      {/* Right Section (Form/Content) */}
      <div className="lg:w-1/2 flex flex-col px-4 py-12 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 lg:h-full lg:overflow-y-auto">
        <div className="w-full max-w-lg mx-auto my-auto">
          <Suspense fallback={<Loader fullScreen={false} />}>
            <PaymentContent />
          </Suspense>
        </div>
      </div>
    </main>
  );}
