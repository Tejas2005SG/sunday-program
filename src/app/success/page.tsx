import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import SiteNavbar from "@/components/registration/Navbar";

export const metadata = {
  title: "Payment Submitted | Medhasamvardhan Gurukul",
  description: "Your payment details have been submitted successfully",
};

export default function SuccessPage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
          {/* Success icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Payment Submitted!
          </h1>

          {/* Message */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your payment details have been submitted successfully. Our team will
            verify your transaction and confirm your registration.
          </p>

          {/* Info card */}
          <div className="mt-8 w-full rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left dark:border-blue-900 dark:bg-blue-950/30">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              What happens next?
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-blue-700 dark:text-blue-400/90">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Admin will verify your transaction ID
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Your payment status will be updated to &quot;Paid&quot;
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                You will receive confirmation details
              </li>
            </ul>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
