import { CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

interface AboutSectionProps {
  t: typeof I18N["en"];
}

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-[#F7F4EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col">
            <div className="inline-block self-start px-4 py-1.5 rounded-full bg-[#9B3A30]/10 border border-[#9B3A30]/20 mb-6 mt-2 lg:mt-0">
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
            <ul className="space-y-4 mb-10">
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
          <div className="order-1 lg:order-2 relative flex justify-center items-start pt-0 lg:pt-8">
            <div className="relative w-full max-w-lg aspect-square lg:scale-110 drop-shadow-2xl">
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

        {/* Full-width Inspiration section below */}
        <div className="mt-4 bg-white/80 backdrop-blur-sm border border-[#D5CDBD] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm max-w-7xl mx-auto w-full">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg relative">
            <Image 
              src="/shrila-prabhupad.jpg" 
              alt="A.C. Bhaktivedanta Swami Prabhupada" 
              fill 
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="text-[#9B3A30] font-bold text-sm tracking-widest uppercase">{t.about.ourInspiration?.label || "OUR INSPIRATION"}</span>
              <div className="h-px bg-[#D5CDBD] flex-1 max-w-[100px] hidden md:block"></div>
            </div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 max-w-4xl">
              {t.about.ourInspiration?.desc || "Our program is inspired by the timeless teachings and example of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, who dedicated his life to spreading wisdom, devotion, and values worldwide."}
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/our-inspiration" className="inline-flex items-center justify-center px-8 py-3 bg-[#9B3A30] text-white font-medium text-sm rounded-lg hover:bg-[#7A2A22] transition-colors shadow-md hover:shadow-lg whitespace-nowrap">
              {t.about.ourInspiration?.btn || "Read about our inspiration"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
