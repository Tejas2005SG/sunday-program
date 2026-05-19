"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Language, I18N } from "@/lib/i18n";

export default function OurInspirationPage() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Language | null;
    if (stored && I18N[stored]) {
      setLang(stored);
    }
  }, []);

  const t = I18N[lang];
  const content = t.inspirationPage || I18N["en"].inspirationPage;

  return (
    <div className="min-h-screen bg-[#F7F4EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#9B3A30] hover:text-[#7A2A22] mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {content.backToHome}
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#D5CDBD]">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full">
            <Image 
              src="/shrila-prabhupad2.jpg" 
              alt="A.C. Bhaktivedanta Swami Prabhupada" 
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          
          <div className="p-8 md:p-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#9B3A30]/10 border border-[#9B3A30]/20 mb-6">
              <span className="text-[#9B3A30] font-semibold text-sm tracking-widest uppercase">{content.label}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#122E43] font-serif mb-6 leading-tight">
              {content.title}
            </h1>
            
            <div className="prose prose-lg text-gray-700 max-w-none space-y-6 font-medium">
              <p>{content.p1}</p>
              <p>{content.p2}</p>
              <p>{content.p3}</p>
              <p>{content.p4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
