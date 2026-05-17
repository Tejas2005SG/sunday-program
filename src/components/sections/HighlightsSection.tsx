import { Award, Target, CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface HighlightsSectionProps {
  t: typeof I18N["en"];
}

export default function HighlightsSection({ t }: HighlightsSectionProps) {
  return (
    <section className="py-20 bg-[var(--surface-muted)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* What Students Gain */}
          <div>
            <div className="section-title-anim flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-[var(--accent)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">{t.gains.title}</h2>
            </div>
            <div className="stats-container grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.gains.items.map((gain, i) => (
                <div key={i} className="stat-item bg-white/60 backdrop-blur border border-[var(--border)] p-4 rounded-xl flex items-center gap-3 hover:bg-white hover:-translate-y-1 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-strong)] shrink-0"></div>
                  <span className="font-semibold text-[var(--ink-soft)]">{gain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Features */}
          <div>
            <div className="section-title-anim flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-[var(--accent)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">{t.features.title}</h2>
            </div>
            <ul className="features-list space-y-5">
              {t.features.items.map((feat, i) => (
                <li key={i} className="feature-item flex items-center p-3 rounded-lg hover:bg-white/60 hover:translate-x-2 transition-all duration-300">
                  <div className="bg-[var(--accent)] rounded-full p-1.5 mr-4 shadow-sm shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-lg text-[var(--foreground)]">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
