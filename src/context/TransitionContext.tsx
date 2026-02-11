'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap-config';

interface TransitionContextType {
  navigate: (href: string) => void;
  isTransitioning: boolean;
  mainContentRef: React.RefObject<HTMLDivElement>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // Enter animation on mount/route change
  useEffect(() => {
    const content = mainContentRef.current;
    if (!content) return;

    // Reset state for enter animation
    gsap.set(content, { 
      opacity: 0, 
      y: 40,
      filter: 'blur(10px)'
    });

    // Play enter animation
    gsap.to(content, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2, // Slow, "premium" feel
      ease: 'power3.out',
      delay: 0.2, // Small delay to ensure render is ready
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

  }, [pathname]);

  const navigate = (href: string) => {
    if (isTransitioning || pathname === href) return;
    
    setIsTransitioning(true);
    const content = mainContentRef.current;

    if (content) {
      // Play exit animation
      gsap.to(content, {
        opacity: 0,
        y: -40,
        filter: 'blur(10px)',
        duration: 0.8, // Slow exit
        ease: 'power3.in',
        onComplete: () => {
          router.push(href);
        }
      });
    } else {
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning, mainContentRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { mainContentRef } = useTransition();
  
  return (
    <div 
      ref={mainContentRef} 
      className="w-full min-h-screen"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </div>
  );
}
