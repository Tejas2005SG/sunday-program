import { CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface ModulesSectionProps {
  t: typeof I18N["en"];
}

export default function ModulesSection({ t }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="text-center mb-16">
          <span className="section-title-anim section-kicker block mb-3">{t.modules.title}</span>
          <h2 className="section-title-anim text-3xl md:text-5xl font-bold text-[var(--foreground)]">4 Powerful Modules</h2>
        </div>

        <div className="modules-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {[t.modules.m1, t.modules.m2, t.modules.m3, t.modules.m4].map((mod, idx) => (
            <div key={idx} className="module-card glass-panel p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mb-6 border border-[var(--border)] text-[var(--accent-strong)] font-bold text-xl group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6 border-b border-[var(--border)] pb-4">{mod.title}</h3>
              <ul className="space-y-4">
                {mod.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mr-3 mt-0.5" />
                    <span className="text-[var(--ink-soft)] font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
