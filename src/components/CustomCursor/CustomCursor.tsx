'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleLinkHover = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects to links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9999] hidden md:block"
      >
        <div className="w-8 h-8 border border-black rounded-full" />
      </div>
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[10000] hidden md:block"
      >
        <div className="w-1 h-1 bg-black rounded-full" />
      </div>
    </>
  );
}
