"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, BookOpen, FileText, Loader2, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.program.trim()) errs.program = "Program name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (form.address.trim().length > 500) {
      errs.address = "Address must be 500 characters or less";
    }
    if (form.notes.trim().length > 500) {
      errs.notes = "Notes must be 500 characters or less";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // If already registered, check payment status
        if (res.status === 409 && data.userId) {
          if (data.paymentStatus === "paid") {
            toast.success("You are already registered and have completed payment!");
            router.push(`/success`);
            return;
          }
          toast.error(data.error);
          router.push(`/payment?userId=${data.userId}`);
          return;
        }
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful!");
      const tokenParam = data.paymentToken ? `&token=${data.paymentToken}` : "";
      router.push(`/payment?userId=${data.userId}${tokenParam}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:ring-2 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 ${errors[field]
      ? "border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
      : "border-neutral-200 focus:border-[#9B3A30] focus:ring-[#9B3A30]/20 dark:border-neutral-700 dark:focus:border-[#9B3A30]"
    }`;

  const programs = [
    "Medha Samvardhan Gurukul - Std 8",
    "Medha Samvardhan Gurukul - Std 9",
    "Medha Samvardhan Gurukul - Std 10",
    "Medha Samvardhan Gurukul - All Standards",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass("name")}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            maxLength={10}
            className={inputClass("phone")}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Program */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Program <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <BookOpen
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <select
            name="program"
            value={form.program}
            onChange={handleChange}
            className={inputClass("program")}
          >
            <option value="">Select a program</option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {errors.program && (
          <p className="mt-1 text-xs text-red-500">{errors.program}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin
            size={16}
            className="absolute left-3.5 top-3.5 text-neutral-400"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            rows={3}
            className={inputClass("address")}
          />
        </div>
        {errors.address && (
          <p className="mt-1 text-xs text-red-500">{errors.address}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Notes <span className="text-neutral-400">(optional)</span>
        </label>
        <div className="relative">
          <FileText
            size={16}
            className="absolute left-3.5 top-3.5 text-neutral-400"
          />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional information..."
              rows={3}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:focus:border-[#9B3A30]"
            />
            {errors.notes && (
              <p className="mt-1 text-xs text-red-500">{errors.notes}</p>
            )}
          </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9B3A30] py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#9B3A30]/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Registering...
          </>
        ) : (
          "Register & Proceed to Payment"
        )}
      </button>
    </form>
  );
}
