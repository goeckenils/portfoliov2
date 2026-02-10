'use client';

import TransitionLink from '@/components/common/TransitionLink';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export default function Navigation() {
  const pathname = usePathname();
  const [logoPosition, setLogoPosition] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // 1. Initial Mount Animation (ONLY ONCE)
  useEffect(() => {
    gsap.from('.nav-bar', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Occasional rotation animation for logo
    gsap.to('.logo-circle', {
      rotation: 360,
      duration: 2,
      repeat: -1,
      repeatDelay: 5,
      ease: 'elastic.out(1, 0.3)',
      transformOrigin: '50% 50%',
    });
  }, []); // Run only once

  // 2. Route Change & Scroll Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
        let isVisible = true;
        
        // Reset visibility and refresh on path change
        gsap.to('.nav-item', { y: 0, opacity: 1, duration: 0, overwrite: true });
        
        // Calculate initial expanded width based on sidebar (18rem) and nav padding
        // md: 18rem - 1.5rem (px-6) = 16.5rem
        // lg: 18rem - 2.0rem (px-8) = 16.0rem
        const getExpandedWidth = () => {
            if (window.innerWidth >= 1024) return '16rem';
            if (window.innerWidth >= 768) return '16.5rem';
            return '2.5rem'; // Small on mobile as requested
        };

        gsap.to('.logo-container', { 
            width: getExpandedWidth(), 
            duration: 0, 
            overwrite: true 
        });
        
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                const isScrollingDown = self.direction === 1;
                const isScrollingUp = self.direction === -1;

                if (isScrollingDown && isVisible) {
                    isVisible = false;
                    // Hide Navigation Pills
                    gsap.to('.nav-item', {
                        y: '-150%', // Move further out
                        duration: 0.3,
                        stagger: 0.02,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });

                    // Shrink Logo Container & Scale Logo
                    gsap.to('.logo-container', {
                        width: window.innerWidth < 768 ? '2.5rem' : '10rem',
                        borderRadius: '8px',
                        duration: 0.3,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });
                    gsap.to('.logo-circle', {
                        scale: 0.8,
                        duration: 0.3,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });
                } 
                
                else if (isScrollingUp && !isVisible) {
                    isVisible = true;
                    // Show Navigation Pills
                    gsap.to('.nav-item', {
                        y: 0,
                        duration: 0.3,
                        stagger: 0.02,
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });

                    // Expand Logo Container & Reset Scale
                    gsap.to('.logo-container', {
                        width: getExpandedWidth(), 
                        borderRadius: '999px',
                        duration: 0.3,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });
                    gsap.to('.logo-circle', {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power3.inOut',
                        overwrite: 'auto'
                    });
                }
            }
        });
    }, navRef); // Scope to navRef

    return () => ctx.revert();
  }, [pathname]); // Re-run effect on pathname change

  const navItems = [
    { href: '/', label: 'News', id: 'news' },
    { href: '/work', label: 'Work', id: 'work' },
    { href: '/about', label: 'Info', id: 'info' },
    { href: '/news', label: 'Shop', id: 'shop' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header ref={navRef} className="nav-bar fixed top-0 left-0 z-[100] w-full pointer-events-none">
      <div className="w-full px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
        <nav className="flex h-10 w-full items-stretch justify-between gap-2 md:h-24 md:gap-4 lg:h-28 lg:gap-6 xl:h-32 xl:gap-8 2xl:h-40">
          
          {/* Animated Logo Circle */}
          <div className="md:w-auto">
            <TransitionLink href="/">
              <div className="logo-container pointer-events-auto flex cursor-pointer items-center justify-start rounded-full transition duration-[300ms] bg-black overflow-hidden" 
                   style={{ height: '100%', width: 'var(--logo-w, 16.5rem)' }}>
                <div className="logo-circle select-none rounded-full flex items-center justify-center h-full p-2 lg:p-3" 
                     style={{ aspectRatio: '1 / 1' }}>
                  <svg width="85%" height="85%" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.1369 23.5714L28.3222 29.4755C27.8903 29.9141 27.1898 29.9141 26.7579 29.4755L26.7556 29.4732C26.3237 29.0346 26.3237 28.3234 26.7556 27.8848L30.7902 23.7882C31.2221 23.3497 31.2221 22.6384 30.7902 22.1999L24.0219 15.3274L24.023 15.3263L22.4587 13.7379L22.4633 13.7332V1.12529C22.4633 0.124702 21.272 -0.376294 20.5752 0.331228L0.326154 20.8938C-0.37065 21.6013 0.122987 22.811 1.10842 22.811H13.0651C13.3586 22.811 13.6398 22.6927 13.8471 22.4822L19.724 16.5149C20.1559 16.0763 20.8564 16.0763 21.2883 16.5149C21.7202 16.9534 21.7202 17.6647 21.2883 18.1032L17.2526 22.201C16.8207 22.6396 16.8207 23.3508 17.2526 23.7894L25.5875 32.2525L25.5864 32.2537L25.5873 44.8747C25.5873 45.8753 26.7787 46.3763 27.4755 45.6688L47.6738 25.1598C48.3706 24.4522 47.8772 23.2425 46.8918 23.2425H34.9192C34.6257 23.2425 34.3445 23.3609 34.1371 23.5714H34.1369Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </TransitionLink>
          </div>

          {/* Navigation Pills */}
          <div className="pointer-events-none flex flex-1 items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <TransitionLink
                  key={item.id}
                  href={item.href}
                  onMouseEnter={(e) => {
                    if (active) return;
                    const bg = e.currentTarget.querySelector('.nav-hover-bg');
                    gsap.to(bg, { width: '100%', duration: 0.4, ease: 'power3.out' });
                  }}
                  onMouseLeave={(e) => {
                    if (active) return;
                    const bg = e.currentTarget.querySelector('.nav-hover-bg');
                    gsap.to(bg, { width: '0%', duration: 0.3, ease: 'power3.in' });
                  }}
                  className={`nav-item relative overflow-hidden pointer-events-auto flex h-full flex-1 items-center justify-center rounded-lg md:rounded-3xl transition-all duration-200 ease-in-out ${
                    active 
                      ? 'bg-black text-white!' 
                      : 'bg-[#eaeaea] text-black'
                  }`}
                >
                  <div className="nav-hover-bg absolute top-0 left-0 h-full w-0 bg-[#c9c9c9] z-0" />
                  <span className="relative z-10 select-none text-[1.3rem] font-bold leading-[1em] md:translate-y-[-0.05em] md:text-[2.2rem] lg:text-[2.8rem] lg:leading-[1em] xl:text-[3.5rem] xl:leading-[1em] 2xl:text-[6rem] 2xl:leading-[1em]">
                    {item.label}
                  </span>
                </TransitionLink>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
