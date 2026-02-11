"use client";

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if this is the first visit in this session
      const isFirstVisit = !sessionStorage.getItem('visited');
      if (isFirstVisit) {
        sessionStorage.setItem('visited', 'true');
      }

      const initialDelay = isFirstVisit ? 3.2 : 0.2;

      // 1. Initial Intro Reveal
      const introTl = gsap.timeline({ 
        delay: initialDelay,
        onComplete: () => {
          // Initialize Sequenced Scroll-Linked Exit
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          });

          scrollTl
            .to('.hero-name-nils', {
              y: -150,
              opacity: 0,
              ease: 'none',
            }, 0)
            .to('.hero-name-goecke', {
              y: -130,
              opacity: 0,
              ease: 'none',
            }, 0.1)
            .to('.hero-content-reveal p', {
              y: -100,
              opacity: 0,
              ease: 'none',
            }, 0.3) 
            .to('.hero-bottom-info', {
              y: -80,
              opacity: 0,
              ease: 'none',
            }, 0.5);
        }
      });
      
      introTl.fromTo('.hero-block', 
        { scaleY: 1 },
        {
          scaleY: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.inOut',
          transformOrigin: 'top center',
        }
      )
      .fromTo('.hero-name-nils', 
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-name-goecke', 
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo('.hero-content-reveal p', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.hero-bottom-info',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // 3. Floating Scroll Dot Animation
      gsap.to('.scroll-indicator-dot', {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full text-black px-4 md:px-6 lg:px-8 pt-32 md:pt-40 lg:pt-48 flex flex-col justify-end box-border overflow-hidden bg-white" 
      style={{ height: '100vh' }}
    >
      <div className="relative w-full h-full mt-6 overflow-hidden z-10 flex flex-col">
         {/* Reveal Blocks Overlay */}
         <div className="absolute inset-0 z-20 flex">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="hero-block h-full flex-1 bg-black" />
            ))}
         </div>
         
         {/* Content to be revealed */}
         <div className="hero-content-reveal relative z-10 w-full flex-1 flex flex-col items-start justify-center text-left lg:pl-[260px]">
            <h1 className="text-[16vw] font-bold tracking-[-0.06em] leading-[0.85] mb-6">
               <span className="hero-name-nils block">NILS</span>
               <span className="hero-name-goecke block">GOECKE</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium tracking-wide text-gray-400 max-w-3xl">
               Blending UI/UX, 3D Design, and Fullstack Engineering into seamless digital experiences.
            </p>
         </div>

         {/* Bottom Info Bar */}
         <div className="hero-bottom-info relative z-10 w-full flex justify-between items-end pb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-0">
            {/* Left: Date */}
            <div className="flex flex-col w-1/3">
              <span className="opacity-30 mb-2 font-medium">Current Status</span>
              <span className="text-black">{currentDate}</span>
            </div>

            {/* Middle: Scroll Indicator */}
            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="w-[18px] h-[30px] border-[1.5px] border-black/20 rounded-full relative flex justify-center mb-2">
                <div className="scroll-indicator-dot w-[2px] h-[5px] bg-black rounded-full mt-2" />
              </div>
              <span className="text-[9px] tracking-[0.3em] font-bold opacity-30">Scroll</span>
            </div>

            {/* Right: Location */}
            <div className="flex flex-col text-right w-1/3">
              <span className="opacity-30 mb-2 font-medium">Location</span>
              <span className="text-black">Germany / Remote</span>
            </div>
         </div>
      </div>
    </section>
  );
}
