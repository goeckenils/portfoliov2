"use client";

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(obj.value));
        },
        onComplete: () => {
          // Finish animation: Slide up total preloader
          const tl = gsap.timeline();
          
          tl.to(numberRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          })
          .to(preloaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            display: "none"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black text-white"
    >
      <div ref={numberRef} className="relative overflow-hidden">
        <span className="text-[15vw] md:text-[10vw] font-bold tabular-nums tracking-tighter transition-all duration-75">
          {count.toString().padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
