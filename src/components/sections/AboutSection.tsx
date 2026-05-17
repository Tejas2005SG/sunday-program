import { CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";
import Image from "next/image";

interface AboutSectionProps {
  t: typeof I18N["en"];
}

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-[#F7F4EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#9B3A30]/10 border border-[#9B3A30]/20 mb-6">
              <span className="text-[#9B3A30] font-semibold text-sm tracking-widest uppercase">MEDHA SAMVARDHAN</span>
            </div>
            <h2 className="section-title-anim text-4xl md:text-5xl font-bold tracking-tight text-[#122E43] font-serif mb-6 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
              {t.about.p1}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {t.about.p2}
            </p>
            <ul className="space-y-4">
              {t.about.points.map((point, i) => (
                <li key={i} className="flex items-center gap-4 bg-white/40 p-3 rounded-lg border border-[#D5CDBD] hover:bg-white/60 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#3A4D39]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#3A4D39]" />
                  </div>
                  <span className="text-[#122E43] font-bold font-serif text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Image Collage */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square drop-shadow-2xl">
              <Image 
                src="/about.png" 
                alt="About Medha Samvardhan"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
