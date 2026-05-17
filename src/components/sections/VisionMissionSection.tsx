import { Target, Flag } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface VisionMissionSectionProps {
  t: typeof I18N["en"];
}

export default function VisionMissionSection({ t }: VisionMissionSectionProps) {
  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="section-kicker block mb-3 text-[var(--accent-strong)]">
            {t.visionMission.kicker}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            {t.visionMission.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  {t.visionMission.visionTitle}
                </h3>
                <p className="text-[var(--ink-soft)] leading-relaxed">
                  {t.visionMission.visionBody}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <Flag className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  {t.visionMission.missionTitle}
                </h3>
                <p className="text-[var(--ink-soft)] leading-relaxed">
                  {t.visionMission.missionBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
