import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TempleImagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !trackRef.current) return;
    
    const ctx = gsap.context(() => {
      // Use matchMedia to only apply horizontal scroll on desktop (min-width: 768px)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Horizontal Scroll Animation
        const track = trackRef.current;
        if (!track) return;

        const scrollTween = gsap.to(track, {
          xPercent: -50, // Move track by 50% of its width (since it's 200vw wide, it moves 100vw)
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            // Reduce scroll distance to remove massive white gap (makes the slide faster)
            end: "+=800",
          }
        });

        // Parallax/Reveal on the text of the second slide using containerAnimation
        gsap.from(".slide-2-text", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".slide-2",
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        });
      });

      // On mobile, just do a simple fade-up (horizontal pinning can be bad UX on phones)
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray(".slide-panel").forEach((panel: any) => {
          gsap.from(panel, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="bg-[#F0EBE0] relative border-y border-[#D5CDBD]" 
      ref={containerRef}
    >
      <div className="md:h-screen overflow-hidden">
        <div 
          className="flex flex-col md:flex-row md:h-full md:w-[200vw] scroll-track" 
          ref={trackRef}
        >
        
        {/* Slide 1: Introduction & Vision */}
        <div className="slide-panel slide-1 w-full md:w-screen md:h-full flex flex-col-reverse md:flex-row items-center p-6 md:p-12 lg:p-20 gap-8 md:gap-12">
          <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
            <span className="section-kicker block text-[#9B3A30] font-bold tracking-wider uppercase text-sm">Our Vision</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#122E43] font-serif leading-tight">
              A Foundation <br className="hidden lg:block"/> For Life
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              In today&apos;s fast-paced world, youth face unprecedented challenges. We focus on building strong character, unshakable confidence, and deep cultural roots.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3A4D39]" />
                <span className="font-medium text-gray-800">Character Development</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3A4D39]" />
                <span className="font-medium text-gray-800">Spiritual Wisdom</span>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-2/3 h-[40vh] md:h-[80vh] relative rounded-2xl overflow-hidden shadow-2xl border border-[#D5CDBD] bg-white p-2">
            <Image 
              src="/ISKCON Temple/1.png" 
              alt="Program Vision and Overview" 
              fill
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Slide 2: Curriculum & Mentors */}
        <div className="slide-panel slide-2 w-full md:w-screen md:h-full flex flex-col-reverse md:flex-row items-center p-6 md:p-12 lg:p-20 gap-8 md:gap-12 bg-[#F7F4EB]">
          <div className="slide-2-text w-full md:w-1/3 flex flex-col justify-center space-y-6">
            <span className="section-kicker block text-[#9B3A30] font-bold tracking-wider uppercase text-sm">Curriculum</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#122E43] font-serif leading-tight">
              Comprehensive <br className="hidden lg:block"/> Modules
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              Our 1-year program is meticulously structured into 4 powerful modules, guided by experienced mentors from diverse professional backgrounds.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-[#D5CDBD] shadow-sm">
                <p className="text-2xl font-bold text-[#122E43]">1 Year</p>
                <p className="text-xs text-[#9B3A30] uppercase font-semibold tracking-wider mt-1">Duration</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#D5CDBD] shadow-sm">
                <p className="text-2xl font-bold text-[#122E43]">4</p>
                <p className="text-xs text-[#9B3A30] uppercase font-semibold tracking-wider mt-1">Modules</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 h-[40vh] md:h-[80vh] relative rounded-2xl overflow-hidden shadow-2xl border border-[#D5CDBD] bg-white p-2">
            <Image 
              src="/ISKCON Temple/2.png" 
              alt="Program Modules and Mentors" 
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
