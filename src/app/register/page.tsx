import RegisterForm from "@/components/registration/RegisterForm";
import SiteNavbar from "@/components/registration/Navbar";

export const metadata = {
  title: "Register | Medhasamvardhan Gurukul",
  description: "Register for Medhasamvardhan Gurukul Sunday School program",
};

export default function RegisterPage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-strong">
              Registration
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Register for the Program
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details below to secure your spot
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 dark:bg-neutral-900 dark:border-neutral-700">
            <RegisterForm />
          </div>
        </div>
      </main>
    </>
  );
}
