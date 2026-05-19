"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2, Copy, Check, Upload } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface PaymentQRProps {
  userId: string;
  token: string | null;
}

const AMOUNT = "2000";

export default function PaymentQR({ userId, token }: PaymentQRProps) {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionId.trim() || transactionId.trim().length < 5) {
      toast.error("Please enter a valid transaction ID");
      return;
    }

    if (!token) {
      toast.error("Payment session expired. Please register again.");
      return;
    }

    if (!screenshot) {
      toast.error("Please upload a payment screenshot");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("transactionId", transactionId.trim());
      if (token) {
        formData.append("paymentToken", token);
      }
      formData.append("screenshot", screenshot);

      const res = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment submission failed");
      }

      toast.success("Payment details submitted!");
      router.push("/success");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* QR Code Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:bg-neutral-900 dark:border-neutral-700">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Step 1: Scan & Pay
          </span>
        </div>

        {/* QR Image */}
        <div className="mx-auto mb-4 flex overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-md dark:border-neutral-700 dark:bg-neutral-800 max-w-[260px]">
          <Image
            src="/GooglePAY-QR.jpeg"
            alt="Google Pay QR Code"
            width={400}
            height={500}
            className="w-full h-auto rounded-xl object-contain"
            priority
          />
        </div>

        {/* Amount */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">Amount to Pay</p>
          <p className="text-3xl font-bold text-foreground">
            ₹{AMOUNT}
          </p>
        </div>



        <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
          Open Google Pay → Scan QR Code → Complete Payment → Note the Transaction ID
        </div>
      </div>

      {/* Transaction ID Form */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            Step 2: Submit Transaction ID
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Transaction ID / UTR Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CreditCard
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 dark:focus:border-[#9B3A30]"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              You can find the transaction ID in your payment app&apos;s transaction history
            </p>
          </div>

          {/* Screenshot Upload Field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Upload Screenshot <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                className="hidden"
                id="screenshot-upload"
              />
              <label
                htmlFor="screenshot-upload"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-600 transition-all duration-200 hover:border-[#9B3A30] hover:bg-[#9B3A30]/5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {screenshot ? (
                  <span className="font-medium text-[#9B3A30]">{screenshot.name}</span>
                ) : (
                  <>
                    <Upload size={16} className="text-neutral-400" />
                    <span>Choose an image or screenshot</span>
                  </>
                )}
              </label>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload a screenshot of your payment confirmation for faster verification
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9B3A30] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#9B3A30]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Payment Details"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
