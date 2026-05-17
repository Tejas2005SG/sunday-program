"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { I18N, Language } from "@/lib/i18n";

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Language | null;
    if (stored && I18N[stored]) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  const t = I18N[lang];

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/register", label: t.nav.register },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 dark:border-neutral-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
          <Image
            src="/logo.png"
            alt="Medha Samvardhan Gurukul Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>
            {lang === "en" ? "Medha Samvardhan" : "मेधासंवर्धन"}{" "}
            <span className="text-accent">Gurukul</span>
          </span>
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
          <div className="relative group ml-1">
            <button className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-shadow duration-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी"}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900">
              <button
                onClick={() => setLang("en")}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${lang === "en" ? "text-accent-strong" : "text-foreground"}`}
              >
                English
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${lang === "hi" ? "text-accent-strong" : "text-foreground"}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang("mr")}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${lang === "mr" ? "text-accent-strong" : "text-foreground"}`}
              >
                मराठी
              </button>
            </div>
          </div>
          <Link
            href="/register"
            className="ml-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            {t.nav.enrollNow}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <div className="relative flex items-center rounded-full border border-neutral-200 bg-white/70 pl-3 pr-2 py-1.5 text-xs font-bold text-foreground shadow-sm backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900">
            <Globe className="mr-1 h-4 w-4 text-muted-foreground" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="appearance-none bg-transparent pr-4 text-xs font-bold outline-none"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
            {t.nav.enrollNow}
          </Link>
        </div>
      )}
    </nav>
  );
}
