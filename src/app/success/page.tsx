import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Submitted",
  description: "Your payment details have been submitted successfully to Medha Samvardhan Gurukul.",
  robots: {
    index: false, // Don't index success page
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <>
      <main className="min-h-screen bg-[#F7F4EB]/30 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A4D39]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9B3A30]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="mx-auto flex max-w-lg w-full flex-col items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#D5CDBD]/60 shadow-xl text-center relative z-10">
          {/* Success icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#9B3A30]/10">
            <CheckCircle size={44} className="text-[#9B3A30]" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold font-serif text-[#122E43] tracking-tight">
            Payment Submitted!
          </h1>

          {/* Message */}
          <p className="mt-4 text-sm leading-relaxed text-[#5C6B73] font-medium sm:text-base">
            Your payment details have been submitted successfully. Our team will
            verify your transaction and confirm your registration.
          </p>

          {/* Info card */}
          <div className="mt-8 w-full rounded-2xl border border-[#D5CDBD]/60 bg-[#F7F4EB] p-6 text-left">
            <h3 className="text-base font-bold font-serif text-[#9B3A30]">
              What happens next?
            </h3>
            <ul className="mt-3.5 space-y-3 text-sm text-[#122E43]">
              <li className="flex items-start gap-2.5 font-medium">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9B3A30]" />
                Admin will verify your transaction ID and screenshot
              </li>
              <li className="flex items-start gap-2.5 font-medium">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9B3A30]" />
                Your payment status will be updated to &quot;Paid&quot;
              </li>
              <li className="flex items-start gap-2.5 font-medium">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9B3A30]" />
                You will receive confirmation details shortly
              </li>
            </ul>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#9B3A30] hover:bg-[#9B3A30]/90 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-102 hover:shadow-md"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
