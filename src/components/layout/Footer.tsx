import { Landmark } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 opacity-80">
          <Landmark className="w-6 h-6 text-[var(--accent)]" />
          <span className="font-bold text-xl text-[var(--foreground)] tracking-tight">
            Medhasamvardhan Gurukul
          </span>
        </div>
        <p className="text-[var(--ink-soft)] font-medium mb-6">
          &copy; {new Date().getFullYear()} Medhasamvardhan Gurukul. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="/register" className="chip-link text-xs">Register</a>
          <a href="/admin/login" className="chip-link text-xs">Admin Login</a>
        </div>
      </div>
    </footer>
  );
}
