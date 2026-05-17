import { Users } from "lucide-react";
import Image from "next/image";
import { I18N } from "@/lib/i18n";

interface MentorsSectionProps {
  t: typeof I18N["en"];
}

export default function MentorsSection({ t }: MentorsSectionProps) {
  return (
    <section id="mentors" className="py-24 relative overflow-hidden bg-[#F7F4EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-title-anim section-kicker block mb-3 text-[#9B3A30] font-bold tracking-wider uppercase text-sm">Mentorship</span>
          <h2 className="section-title-anim text-3xl md:text-5xl font-bold text-[#122E43] font-serif mb-6">{t.mentors.title}</h2>
          <p className="section-title-anim text-xl text-gray-800">
            {t.mentors.subtitle}
          </p>
        </div>

        <div className="mentors-grid flex flex-wrap justify-center gap-6">
          {t.mentors.list.map((mentor, idx) => (
            <div key={idx} className="mentor-card bg-white border border-[#D5CDBD] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <div className="w-20 h-20 rounded-full bg-[#F7F4EB] border-2 border-[#D5CDBD] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#3A4D39] transition-all duration-300 overflow-hidden relative">
                {(mentor as any).image ? (
                  <Image 
                    src={(mentor as any).image} 
                    alt={mentor.name} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8 text-[#3A4D39]" />
                )}
              </div>
              <h3 className="text-xl font-bold text-[#122E43] font-serif mb-2">{mentor.name}</h3>
              <p className="text-sm font-medium text-gray-800 leading-relaxed">{mentor.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
