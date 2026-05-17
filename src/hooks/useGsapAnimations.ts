import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(mainRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".hero-quote", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hero-quote",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".section-title-anim", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section-title-anim",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".about-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-cards-container",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".temple-img", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".temple-images-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".module-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".modules-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".mentor-card", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mentors-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".stat-item", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".feature-item", {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-list",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".contact-cta", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".nav-logo", {
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: 99999,
          onUpdate: (self) => {
            const nav = document.querySelector("nav");
            if (nav) {
              gsap.to(nav, {
                backgroundColor: self.progress > 0.05 ? "rgba(255,255,255,0.9)" : "transparent",
                duration: 0.3
              });
            }
          }
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, [mainRef]);
}
