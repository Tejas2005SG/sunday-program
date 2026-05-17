"use client";

import { useRef } from "react";
import { ArrowRight, BookOpen, Sparkles, Calendar, Users, ShieldAlert } from "lucide-react";
import { I18N } from "@/lib/i18n";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroSectionProps {
  t: typeof I18N["en"];
}

export default function HeroSection({ t }: HeroSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-kicker",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(
      ".hero-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".hero-banner",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-stats-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative pt-32 pb-20 overflow-hidden px-4 min-h-screen flex flex-col justify-between items-center bg-cover bg-center bg-no-repeat" 
      id="home"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <div className="max-w-5xl w-full mx-auto text-center relative z-10 flex flex-col items-center flex-grow justify-start pt-10">
        
        {/* Top Kicker */}
        <span className="hero-kicker inline-block px-6 py-2 rounded-full border border-[#D5CDBD] text-[#9B3A30] uppercase tracking-widest text-[11px] sm:text-xs font-semibold mb-6 bg-[#F7F4EB]/80 backdrop-blur-sm">
          {t.hero.kicker}
        </span>

        {/* Main Title */}
        <h1 className="hero-title text-[#122E43] font-serif text-5xl sm:text-6xl md:text-[5rem] font-bold leading-[1.1] mb-4 max-w-4xl tracking-tight">
          Medha Samvardhan<br />Gurukul
        </h1>

        {/* Subtitle */}
        <h2 className="hero-subtitle text-[#9B3A30] font-serif text-2xl sm:text-3xl md:text-[2rem] mb-2 tracking-widest">
          {t.hero.subtitle}
        </h2>

        {/* Hindi Sanskrit Title */}
        <h3 className="hero-subtitle text-[#9B3A30] font-serif text-2xl sm:text-3xl font-medium mb-8">
          {t.hero.titleHindi}
        </h3>

        {/* Tagline Banner */}
        <div className="hero-banner relative z-20 mb-10">
          <div 
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full shadow-lg text-white font-medium text-sm sm:text-base tracking-wider"
            style={{ backgroundColor: "#3A4D39", border: "1px solid #4D614B" }}
          >
            <Sparkles className="w-4 h-4 text-[#D8DFCC]" />
            {t.hero.tagline}
            <Sparkles className="w-4 h-4 text-[#D8DFCC]" />
          </div>
        </div>

        {/* Buttons */}
        <div className="hero-buttons flex flex-wrap justify-center gap-5">
          <a 
            href="/register" 
            className="group px-8 py-3.5 rounded-full text-white font-medium flex items-center gap-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: "linear-gradient(to right, #B56D39, #8C4618)" }}
          >
            {t.hero.ctaMain}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#modules" 
            className="px-8 py-3.5 rounded-full font-medium flex items-center gap-2 transition-all hover:bg-[#F0EBE0]/80 bg-[#F7F4EB]/60 backdrop-blur-sm"
            style={{ border: "1px solid #C2B29D", color: "#4A3B2C" }}
          >
            {t.hero.ctaSec}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="w-full max-w-4xl relative pb-8 px-4 sm:px-10 z-10 mt-auto">
        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#122E43]/30 to-transparent relative mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div className="hero-stats-item flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#122E43]/10 text-[#122E43]">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-[#122E43] text-xl uppercase tracking-wider">
              10 Days
            </p>
          </div>
          
          <div className="hero-stats-item flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#122E43]/10 text-[#122E43]">
              <Users className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-[#122E43] text-xl uppercase tracking-wider">
              9 to 15 Years
            </p>
          </div>
          
          <div className="hero-stats-item flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#122E43]/10 text-[#122E43]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-[#122E43] text-xl uppercase tracking-wider">
              Limited Seats
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
