"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PaymentQR from "@/components/registration/PaymentQR";
import SiteNavbar from "@/components/registration/Navbar";
import Loader from "@/components/registration/Loader";

function PaymentContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950/30">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Invalid Access
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400/80">
            Please register first before proceeding to payment.
          </p>
          <a
            href="/register"
            className="mt-4 inline-block rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Go to Registration
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Payment
        </div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Complete Your Payment
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Scan the QR code below to make payment via Google Pay
        </p>
      </div>

      <PaymentQR userId={userId} />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <Suspense fallback={<Loader fullScreen />}>
          <PaymentContent />
        </Suspense>
      </main>
    </>
  );
}
