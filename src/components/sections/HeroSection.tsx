import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface HeroSectionProps {
  t: typeof I18N["en"];
}

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4" id="home">
      <div className="absolute top-0 inset-x-0 h-[1000px] w-full bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-[var(--background)] opacity-40 pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="hero-animate section-kicker mb-4 inline-block px-3 py-1 bg-white/80 border border-[var(--border)] rounded-full backdrop-blur-sm">
          {t.hero.kicker}
        </span>
        <h1 className="hero-animate text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-3 leading-tight break-words">
          {t.hero.title}
        </h1>
        <h2 className="hero-animate text-xl sm:text-2xl md:text-3xl text-[var(--accent-strong)] font-script mb-6">
          {t.hero.titleHindi} — {t.hero.meaning}
        </h2>
        <p className="hero-animate text-xl md:text-2xl font-medium text-[var(--ink-soft)] mb-6 max-w-2xl mx-auto italic">
          {t.hero.subtitle}
        </p>

        <div className="hero-animate flex flex-wrap justify-center gap-4 mb-20">
          <a href="/register" className="primary-button group">
            {t.hero.ctaMain}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#modules" className="secondary-button">
            {t.hero.ctaSec}
          </a>
        </div>

        {/* Premium Quote Grid */}
        <div className="hero-animate relative max-w-4xl mx-auto mt-4 px-2 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-soft)] to-[var(--surface-muted)] rounded-3xl transform rotate-1 scale-105 opacity-60 blur-lg -z-10 transition-transform duration-700 hover:rotate-2"></div>
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-[var(--border)] relative bg-white/70 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(135,69,24,0.15)] w-full">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] text-white px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/20 w-max max-w-[90%]">
              <Sparkles className="w-4 h-4 text-[var(--accent-soft)] animate-pulse shrink-0" />
              <h3 className="font-bold text-sm md:text-base font-script tracking-wide truncate">{t.hero.tagline}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-8 text-left mt-6">
              {t.quotes.slice(0, 4).map((q, i) => (
                <div key={i} className="hero-quote flex items-start gap-4 group p-4 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-[var(--border)]/50">
                  <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl group-hover:bg-[var(--accent)] group-hover:-rotate-3 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-inner">
                    <BookOpen className="w-5 h-5 text-[var(--accent-strong)] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[var(--ink-soft)] text-sm md:text-[15px] font-medium leading-relaxed group-hover:text-[var(--foreground)] transition-colors mt-0.5">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
