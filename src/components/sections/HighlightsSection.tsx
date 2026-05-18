import { Award, Users, MountainSnow, Flower2, Trophy, HeartHandshake, Medal, Leaf } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface HighlightsSectionProps {
  t: typeof I18N["en"];
}

const featureIcons = [Users, MountainSnow, Flower2, Trophy, HeartHandshake, Medal];
const featureDescriptions = [
  "Engaging sessions that encourage curiosity, communication, and collaborative learning.",
  "Explore new places, enjoy exciting games, and learn beyond the classroom.",
  "Build inner peace, focus, and mindfulness through yoga, meditation, and shloka chanting.",
  "Showcase talents, build confidence, and develop essential life skills through healthy competitions.",
  "Strengthen the bond between parents and the program through meaningful interaction and feedback.",
  "Recognizing achievements and encouraging excellence at every step."
];

export default function HighlightsSection({ t }: HighlightsSectionProps) {
  return (
    <>
      {/* What Students Gain Section */}
      <section className="py-24 relative bg-white border-y border-[#D5CDBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative z-10">
            <span className="section-title-anim section-kicker block mb-3 text-[#9B3A30] font-bold tracking-wider uppercase text-sm">
              Benefits
            </span>
            <h2 className="section-title-anim text-3xl md:text-5xl font-bold text-[#122E43] font-serif">
              {t.gains.title}
            </h2>
          </div>
          
          <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.gains.items.map((gain, i) => (
              <div key={i} className="group relative bg-[#F7F4EB] p-8 rounded-2xl flex flex-col items-start gap-4 hover:bg-white hover:border-[#9B3A30]/40 border border-[#D5CDBD]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D5CDBD] to-[#E8E0D0] group-hover:from-[#9B3A30] group-hover:to-[#D5CDBD] transition-colors duration-500"></div>
                
                <div className="w-14 h-14 rounded-xl bg-white border border-[#D5CDBD] flex items-center justify-center shrink-0 group-hover:bg-[#9B3A30]/10 group-hover:border-[#9B3A30]/30 transition-colors shadow-sm">
                  <Award className="w-7 h-7 text-[#9B3A30] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-[#122E43] mb-3 font-serif">{gain.title}</span>
                  <span className="text-base text-[#5C6B73] leading-relaxed">{gain.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section className="py-24 relative bg-[#F7F4EB] border-b border-[#D5CDBD] overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A4D39]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3A4D39]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#3A4D39]/30"></div>
              <span className="section-title-anim section-kicker block text-[#3A4D39] font-bold tracking-widest uppercase text-xs md:text-sm">
                HIGHLIGHTS
              </span>
              <div className="h-[1px] w-12 bg-[#3A4D39]/30"></div>
            </div>
            
            <div className="flex justify-center mb-4">
              <Leaf className="w-6 h-6 text-[#3A4D39]" strokeWidth={1.5} />
            </div>

            <h2 className="section-title-anim text-4xl md:text-5xl font-bold text-[#122E43] font-serif mb-6">
              {t.features.title}
            </h2>
            <p className="max-w-2xl mx-auto text-[#4A5D6A] text-lg">
              A thoughtfully designed experience to inspire learning, growth, and holistic development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {t.features.items.map((feat, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              const description = featureDescriptions[i % featureDescriptions.length];
              
              return (
                <div key={i} className="group flex flex-col sm:flex-row items-start gap-5 p-8 bg-white border border-[#D5CDBD]/60 rounded-3xl shadow-sm hover:shadow-md hover:border-[#9B3A30]/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#F7F4EB] group-hover:bg-[#E8E0D0] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#122E43]" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-bold text-[1.15rem] text-[#122E43] leading-snug font-serif mb-2">{feat}</span>
                    <span className="text-sm text-[#5C6B73] leading-relaxed">{description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
