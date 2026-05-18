import { Globe, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { Language, I18N } from "@/lib/i18n";
import { useState } from "react";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  scrolled: boolean;
}

export default function Navbar({ lang, setLang, scrolled }: NavbarProps) {
  const t = I18N[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`nav-logo fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--border)] py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          <a href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Medha Samvardhan Gurukul Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="font-bold text-xl md:text-2xl text-[var(--foreground)] tracking-tight">
              {lang === "en" ? "Medha Samvardhan" : "मेधासंवर्धन"} <span className="text-[#9B3A30]">Gurukul</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.about}</a>
            <a href="#modules" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.modules}</a>
            <a href="#mentors" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.mentors}</a>
            <a href="/contact" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--accent-strong)] transition-colors">{t.nav.contact}</a>

            <div className="relative group">
              <button className="flex items-center gap-2 bg-white/70 border border-[var(--border)] rounded-full px-4 py-2 backdrop-blur-md transition-shadow duration-300 hover:shadow-md hover:border-[var(--border)] focus:outline-none">
                <Globe className="w-4 h-4 text-[var(--ink-soft)]" />
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                </span>
                <ChevronDown className="w-4 h-4 text-[var(--ink-soft)] transition-transform duration-300 group-hover:-rotate-180" />
              </button>

              <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-[var(--border)] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top right scale-95 group-hover:scale-100 z-50 overflow-hidden divide-y divide-[var(--border)]/40 p-1">
                <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'en' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>English</button>
                <button onClick={() => setLang('hi')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'hi' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>हिंदी</button>
                <button onClick={() => setLang('mr')} className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[var(--accent-soft)] ${lang === 'mr' ? 'text-[var(--accent-strong)] bg-[var(--surface-muted)]' : 'text-[var(--foreground)]'}`}>मराठी</button>
              </div>
            </div>

            <a href="/register" className="primary-button hidden lg:inline-flex">{t.hero.ctaMain}</a>
          </div>

          {/* Mobile Lang & Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="relative flex items-center bg-white/70 border border-[var(--border)] rounded-full pl-3 pr-2 py-1.5 cursor-pointer backdrop-blur-md shadow-sm">
              <Globe className="w-4 h-4 text-[var(--ink-soft)] mr-1" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-sm font-bold text-[var(--foreground)] border-none outline-none cursor-pointer appearance-none bg-none pr-4 relative z-10"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="mr">MR</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-soft)] absolute right-2 pointer-events-none" />
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/70 border border-[var(--border)] rounded-full backdrop-blur-md text-[var(--foreground)]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-[var(--border)] shadow-xl p-4 flex flex-col gap-4 z-50">
          <a onClick={() => setMobileMenuOpen(false)} href="#about" className="text-base font-medium text-[var(--foreground)] p-2 hover:bg-[var(--surface-muted)] rounded-lg transition-colors">{t.nav.about}</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#modules" className="text-base font-medium text-[var(--foreground)] p-2 hover:bg-[var(--surface-muted)] rounded-lg transition-colors">{t.nav.modules}</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#mentors" className="text-base font-medium text-[var(--foreground)] p-2 hover:bg-[var(--surface-muted)] rounded-lg transition-colors">{t.nav.mentors}</a>
          <a onClick={() => setMobileMenuOpen(false)} href="/contact" className="text-base font-medium text-[var(--foreground)] p-2 hover:bg-[var(--surface-muted)] rounded-lg transition-colors">{t.nav.contact}</a>
          <a onClick={() => setMobileMenuOpen(false)} href="/register" className="primary-button text-center w-full mt-2 py-3">{t.hero.ctaMain}</a>
        </div>
      )}
    </nav>
  );
}
