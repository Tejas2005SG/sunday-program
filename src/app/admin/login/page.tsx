"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/admin/dashboard",
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Login successful");
      router.replace(res?.url || "/admin/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 px-4 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="w-full max-w-sm">
        {/* Logo / Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <ShieldCheck size={28} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 dark:focus:border-accent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 dark:focus:border-accent"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </main>
  );
}
