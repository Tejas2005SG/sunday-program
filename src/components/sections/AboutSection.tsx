import { Heart, User, Target, Award, CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface AboutSectionProps {
  t: typeof I18N["en"];
}

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="about-cards-container grid grid-cols-2 gap-4">
              <div className="about-card glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Heart className="w-10 h-10 text-[var(--accent)] mb-3" />
                <h4 className="font-bold text-[var(--foreground)]">{t.about.points[0]}</h4>
              </div>
              <div className="about-card glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center translate-y-6 hover:-translate-y-2 transition-transform duration-300">
                <User className="w-10 h-10 text-[var(--accent)] mb-3" />
                <h4 className="font-bold text-[var(--foreground)]">{t.about.points[1]}</h4>
              </div>
              <div className="about-card glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Target className="w-10 h-10 text-[var(--accent)] mb-3" />
                <h4 className="font-bold text-[var(--foreground)]">{t.about.points[2]}</h4>
              </div>
              <div className="about-card glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center translate-y-6 hover:-translate-y-2 transition-transform duration-300">
                <Award className="w-10 h-10 text-[var(--accent)] mb-3" />
                <h4 className="font-bold text-[var(--foreground)]">{t.about.points[3]}</h4>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="section-title-anim section-title mb-6 text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">{t.about.title}</h2>
            <p className="about-card text-[var(--ink-soft)] text-lg leading-relaxed mb-6">{t.about.p1}</p>
            <p className="about-card text-[var(--ink-soft)] text-lg leading-relaxed mb-6">{t.about.p2}</p>
            <ul className="space-y-3">
              {t.about.points.map((point, i) => (
                <li key={i} className="about-card flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0" />
                  <span className="text-[var(--foreground)] font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
