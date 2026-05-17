import { CheckCircle2 } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface ModulesSectionProps {
  t: typeof I18N["en"];
}

export default function ModulesSection({ t }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-24 relative bg-[#F0EBE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 relative z-10">
          <span className="section-title-anim section-kicker block mb-3 text-[#9B3A30] font-bold tracking-wider uppercase text-sm">{t.modules.title}</span>
          <h2 className="section-title-anim text-3xl md:text-5xl font-bold text-[#122E43] font-serif">4 Powerful Modules</h2>
        </div>

        <div className="modules-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {[t.modules.m1, t.modules.m2, t.modules.m3, t.modules.m4].map((mod, idx) => {
            // Safely strip the "Module 1:" prefix from the translation string since the image already says "Module:"
            const titleParts = mod.title.split(':');
            const cleanTitle = titleParts.length > 1 ? titleParts.slice(1).join(':').trim() : mod.title;

            return (
              <div 
                key={idx} 
                className="module-card relative flex flex-col transition-transform duration-300 hover:-translate-y-2 group w-full aspect-[4/3] sm:aspect-[1.4/1]"
              >
                {/* Background Image - using object-fill to perfectly fit the container bounds without clipping */}
                <img 
                  src="/module-bg.png" 
                  alt="Vintage background" 
                  className="absolute inset-0 w-full h-full object-fill z-0 drop-shadow-xl"
                  style={{ borderRadius: "1.5rem" }}
                />
                
                <div className="relative z-10 w-full h-full flex flex-col">
                  
                  {/* Header Area - tightly bounded to the area above the horizontal line in the bg image */}
                  <div className="relative w-full h-[30%] flex items-center px-4 sm:px-6 mt-[2%] sm:mt-[3%]">
                    
                    {/* Circle Number overlay - Centered precisely on the golden circle's coordinates */}
                    <div className="absolute left-[15%] top-[17%] w-[14%] sm:w-[12%] aspect-square flex items-center justify-center">
                      <span className="text-[28px] sm:text-[36px] font-bold text-[#7D7061] font-serif">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Clean Title - Pushed securely down from the top border and away from the circle */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#7D7061] font-serif ml-[28%] sm:ml-[28%] pr-6 sm:pr-8 leading-snug line-clamp-2">
                      {cleanTitle}
                    </h3>
                  </div>
                  
                  {/* List Content Area - starts exactly below the image's horizontal divider line */}
                  <div className="flex-grow pt-[5%] pl-[12%] pr-[8%] sm:pl-[14%] sm:pr-[10%] pb-8">
                    <ul className="space-y-4 sm:space-y-5">
                      {mod.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#9B3A30] shrink-0 mr-3 sm:mr-4 mt-0.5 bg-[#F7F4EB]/50 rounded-full" />
                          <span className="text-[#3A352A] font-semibold text-[15px] sm:text-[18px] leading-tight sm:leading-snug drop-shadow-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
