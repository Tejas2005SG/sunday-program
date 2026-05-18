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
          <span className="section-title-anim section-kicker block mb-3 text-[#9B3A30] font-bold tracking-wider uppercase text-sm">
            {t.modules.title}
          </span>
          <h2 className="section-title-anim text-3xl md:text-5xl font-bold text-[#122E43] font-serif">
            4 Powerful Modules
          </h2>
        </div>

        <div className="modules-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {[t.modules.m1, t.modules.m2, t.modules.m3, t.modules.m4].map((mod, idx) => {
            const titleParts = mod.title.split(":");
            const cleanTitle =
              titleParts.length > 1 ? titleParts.slice(1).join(":").trim() : mod.title;

            return (
              <div
                key={idx}
                className="module-card relative transition-transform duration-300 hover:-translate-y-2 group w-full aspect-[4/3] sm:aspect-[1.45/1] lg:aspect-[1.5/1]"
              >
                {/* Background Image */}
                <img
                  src="/modulebg.png"
                  alt="Vintage background"
                  className="absolute inset-0 w-full h-full object-fill z-0 drop-shadow-xl"
                  style={{ borderRadius: "1.5rem" }}
                />

                <div className="absolute inset-0 z-10">

                  {/*
                    NUMBER — centered on the golden circle in module-bg.png.
                    The circle center is approx at left: 13%, top: 21%.
                    Tweak these two values if your bg image differs slightly.
                  */}
                  <div
                    className="absolute flex items-center justify-center left-[20%] top-[19%] sm:left-[16%] sm:top-[19%] lg:left-[14%] lg:top-[18%]"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <span
                      className="font-bold text-[#7D7061] font-serif leading-none select-none"
                      style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)" }}
                    >
                      {idx + 1}
                    </span>
                  </div>

                  {/*
                    TITLE — header band above the gold divider line (~38% down).
                    Starts at 26% left (just past the circle) to avoid overlap.
                  */}
                  <div
                    className="absolute flex items-center left-[32%] right-[10%] top-[4%] h-[30%] sm:left-[28%] sm:right-[8%] sm:top-[3%] sm:h-[30%] lg:left-[26%] lg:right-[7%] lg:top-[2%] lg:h-[30%]"
                  >
                    <h3
                      className="font-bold text-[#7D7061] font-serif leading-snug line-clamp-2"
                      style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.8rem)" }}
                    >
                      {cleanTitle}
                    </h3>
                  </div>

                  {/*
                    LIST — below the gold divider line (~40% down).
                    Items are evenly distributed using justify-around.
                  */}
                  <div
                    className="absolute overflow-hidden left-[15%] right-[7%] top-[32%] bottom-[8%] sm:left-[13%] sm:right-[7%] sm:top-[34%] sm:bottom-[8%] lg:left-[12%] lg:right-[7%] lg:top-[36%] lg:bottom-[8%]"
                  >
                    <ul className="h-full flex flex-col justify-around">
                      {mod.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2
                            className="shrink-0 text-[#9B3A30] bg-[#F7F4EB]/50 rounded-full mr-3"
                            style={{
                              width: "clamp(14px, 1.8vw, 20px)",
                              height: "clamp(14px, 1.8vw, 20px)",
                            }}
                          />
                          <span
                            className="text-[#3A352A] font-semibold leading-snug drop-shadow-sm"
                            style={{ fontSize: "clamp(13px, 1.5vw, 17px)" }}
                          >
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
