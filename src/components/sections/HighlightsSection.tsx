import { Award, Target, Check } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface HighlightsSectionProps {
  t: typeof I18N["en"];
}

export default function HighlightsSection({ t }: HighlightsSectionProps) {
  return (
    <section className="py-20 md:py-28 relative bg-[url('/features.png')] bg-cover bg-center bg-no-repeat border-y border-[#D5CDBD]">
      {/* Slightly increased light overlay to maintain readability of detailed cards */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      
      <div className="max-w-6xl mx-auto px-10 sm:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* What Students Gain */}
          <div>
            <div className="section-title-anim flex items-center gap-4 mb-8">
              <div className="p-2.5 bg-white/90 backdrop-blur rounded-xl shadow-sm border border-[#D5CDBD] rotate-3 hover:rotate-0 transition-transform duration-500">
                <Award className="w-6 h-6 text-[#9B3A30]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#122E43] font-serif">{t.gains.title}</h2>
            </div>
            
            <div className="stats-container grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.gains.items.map((gain, i) => (
                <div key={i} className="group relative bg-white/80 backdrop-blur-md border border-[#D5CDBD]/80 p-3.5 rounded-xl flex items-start gap-3 hover:bg-white hover:border-[#9B3A30]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                  {/* Left decorative accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D5CDBD] to-[#E8E0D0] group-hover:from-[#9B3A30] group-hover:to-[#D5CDBD] transition-colors duration-500"></div>
                  
                  {/* Custom Bullet Point */}
                  <div className="w-6 h-6 rounded-full bg-[#F7F4EB] border border-[#D5CDBD] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9B3A30]/10 group-hover:border-[#9B3A30]/30 transition-colors">
                    <div className="w-2 h-2 rotate-45 bg-[#9B3A30] opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                  
                  <span className="font-semibold text-sm text-[#122E43] leading-snug">{gain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Features */}
          <div>
            <div className="section-title-anim flex items-center gap-4 mb-8">
              <div className="p-2.5 bg-white/90 backdrop-blur rounded-xl shadow-sm border border-[#D5CDBD] -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Target className="w-6 h-6 text-[#3A4D39]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#122E43] font-serif">{t.features.title}</h2>
            </div>
            
            <ul className="features-list space-y-3">
              {t.features.items.map((feat, i) => (
                <li key={i} className="feature-item group flex items-center p-3 bg-gradient-to-r from-white/90 to-white/50 backdrop-blur-md border border-[#D5CDBD]/80 rounded-xl hover:to-[#F7F4EB]/90 hover:border-[#3A4D39]/40 hover:shadow-md hover:translate-x-1.5 transition-all duration-300">
                  {/* Decorative Icon Wrapper */}
                  <div className="relative mr-4 shrink-0">
                    {/* Rotating Background Shape */}
                    <div className="absolute inset-0 bg-[#3A4D39] rotate-45 rounded-lg opacity-10 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500"></div>
                    {/* Icon Box */}
                    <div className="relative bg-gradient-to-br from-[#3A4D39] to-[#253224] w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transform group-hover:scale-105 transition-transform border border-[#3A4D39]/50">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  
                  <span className="font-semibold text-[0.95rem] text-[#122E43] leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}