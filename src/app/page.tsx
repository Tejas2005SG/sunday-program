"use client";

import { useState, useEffect, useRef } from "react";
import { Language, I18N } from "@/lib/i18n";
import { useGsapAnimations } from "@/hooks/useGsapAnimations";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DetailsBanner from "@/components/sections/DetailsBanner";
import TempleImagesSection from "@/components/sections/TempleImagesSection";
import ModulesSection from "@/components/sections/ModulesSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import MentorsSection from "@/components/sections/MentorsSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import ContactSection from "@/components/sections/ContactSection";

export default function LandingPage() {
  const [lang, setLang] = useState<Language>("en");
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGsapAnimations(mainRef);

  const t = I18N[lang];

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-strong)]">
      <main ref={mainRef}>
        <Navbar lang={lang} setLang={setLang} scrolled={scrolled} />
        <HeroSection t={t} />
        <AboutSection t={t} />
        <DetailsBanner t={t} />
        <TempleImagesSection />
        <ModulesSection t={t} />
        <HighlightsSection t={t} />
        <MentorsSection t={t} />
        <VisionMissionSection t={t} />
        <ContactSection t={t} />
      </main>
      <Footer />
    </div>
  );
}
