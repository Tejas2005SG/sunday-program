import { Calendar, Clock, MapPin } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface DetailsBannerProps {
  t: typeof I18N["en"];
}

export default function DetailsBanner({ t }: DetailsBannerProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="stats-container grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="stat-item py-4 flex flex-col items-center">
            <Calendar className="w-8 h-8 mb-2 text-white/80" />
            <p className="text-sm uppercase tracking-widest text-white/70 mb-1">{t.details.title}</p>
            <p className="font-bold text-lg">{t.details.duration}</p>
          </div>
          <div className="stat-item py-4 flex flex-col items-center">
            <Clock className="w-8 h-8 mb-2 text-white/80" />
            <p className="text-sm uppercase tracking-widest text-white/70 mb-1">Time</p>
            <p className="font-bold text-lg">{t.details.day}<br />{t.details.time}</p>
          </div>
          <div className="stat-item py-4 flex flex-col items-center">
            <MapPin className="w-8 h-8 mb-2 text-white/80" />
            <p className="text-sm uppercase tracking-widest text-white/70 mb-1">Location</p>
            <p className="font-bold text-lg">{t.details.venue}</p>
          </div>
          <div className="stat-item py-4 flex flex-col items-center justify-center">
            <a href="/register" className="bg-white text-[var(--accent-strong)] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              {t.hero.ctaMain}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
