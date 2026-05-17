"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 dark:border-neutral-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          Medhasamvardhan <span className="text-accent">Gurukul</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-accent/10 text-accent-strong"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="ml-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 pb-4 sm:hidden dark:bg-neutral-950 dark:border-neutral-800">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-accent/10 text-accent-strong"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Enroll Now
          </Link>
        </div>
      )}
    </nav>
  );
}
