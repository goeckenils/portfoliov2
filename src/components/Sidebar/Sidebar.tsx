'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilter = searchParams.get('filter');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);

  const isAboutPage = pathname === '/about';
  const isShopPage = pathname === '/news';

  // 1. Initial/Scroll Visibility Toggle
  useEffect(() => {
    const el = sidebarRef.current;
    const btn = mobileButtonRef.current;
    if (!el) return;

    // Initial state: hidden
    gsap.set([el, btn], { opacity: 0, pointerEvents: 'none' });

    const isHome = pathname === '/';
    
    // Create ScrollTrigger to sync both desktop sidebar and mobile button
    const st = ScrollTrigger.create({
      trigger: isHome ? "#selected-work" : "body",
      start: isHome ? "top 80%" : "top -10px", 
      onEnter: () => {
        gsap.to([el, btn], { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power2.out' });
        // Stagger items for desktop
        if (window.innerWidth >= 768) {
          gsap.fromTo(el.querySelectorAll('.sidebar-item'), 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'transform' }
          );
        }
      },
      onLeaveBack: () => {
         if (window.innerWidth >= 768) {
           gsap.to(el.querySelectorAll('.sidebar-item'), { 
             y: 20, 
             opacity: 0, 
             duration: 0.3, 
             stagger: 0.05, 
             ease: 'power2.in' 
           });
         }
         gsap.to([el, btn], { opacity: 0, pointerEvents: 'none', duration: 0.3, ease: 'power2.in', delay: 0.1 });
      },
    });

    return () => {
      st.kill();
    };
  }, [pathname]);

  const handleFilter = (filter: string) => {
    if (currentFilter === filter) {
      router.push('/work');
    } else {
      router.push(`/work?filter=${encodeURIComponent(filter)}`);
    }
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeYear, setActiveYear] = useState<string | null>(null);

  // 2. Mobile Menu Animation
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const el = sidebarRef.current;
    if (!el) return;

    if (isMobileOpen) {
      const tl = gsap.timeline();
      tl.set(el, { display: 'flex', pointerEvents: 'auto' });
      tl.fromTo(el, 
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power4.out' }
      )
      .fromTo(el.querySelectorAll('.sidebar-item'), 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      );
    } else {
      gsap.to(el, { 
        y: 20, 
        opacity: 0, 
        scale: 0.98, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => { gsap.set(el, { display: 'none', pointerEvents: 'none' }); } 
      });
    }
  }, [isMobileOpen]);

  // 3. Scroll Spy for Year
  useEffect(() => {
    const handleScroll = () => {
        const projects = document.querySelectorAll('[data-year]');
        let currentYear = null;

        projects.forEach((project) => {
            const rect = project.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentYear = project.getAttribute('data-year');
            }
        });

        if (currentYear) {
            setActiveYear(currentYear);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const seasons = [
    { name: 'autumn', year: '2025' },
    { name: 'summer', year: '2025' },
    { name: 'spring', year: '2025' },
    { name: 'winter', year: '2025' },
    { name: 'autumn', year: '2024' },
    { name: 'summer', year: '2024' },
    { name: 'spring', year: '2024' },
    { name: 'winter', year: '2023' },
  ];

  const tags = [
    'Strategy', 'Visual Identity', 'Motion', 'Website', 'Packaging', 'Branding', 'Campaign'
  ];

  return (
    <>
      {/* Mobile Interaction Button */}
      <div ref={mobileButtonRef} className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-[#eaeaea] text-black px-8 py-3 rounded-lg font-bold text-sm tracking-widest uppercase shadow-xl transition-transform active:scale-95"
          style={{ pointerEvents: 'auto' }}
        >
          {isMobileOpen ? 'Close' : (isShopPage ? 'Cart' : 'Filter')}
        </button>
      </div>

      <div 
        ref={sidebarRef} 
        className={`fixed left-0 z-40 flex flex-col
          ${isMobileOpen 
            ? 'bottom-24 left-4 right-4 h-auto bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl' 
            : 'h-screen w-screen md:w-column md:min-w-[var(--column)] flex h-screen flex-col overflow-hidden max-md:hidden opacity-0 pointer-events-none md:pointer-events-auto'
          }
          md:top-40 lg:top-48 xl:top-56 pl-4 md:pl-6 lg:pl-8
        `}
        style={!isMobileOpen ? { height: 'calc(var(--vh, 1vh) * 100 - 7rem)', paddingTop: '0px' } : {}}
      >
        
        <div className={`w-full overflow-y-auto no-scrollbar ${isMobileOpen ? 'max-h-[60vh]' : 'md:relative'}`}>
          
          <div className="flex flex-col space-y-6 md:space-y-4 lg:space-y-6">
            
            {isShopPage ? (
              /* Shopping Cart Placeholder */
              <div className="sidebar-item flex flex-col space-y-4 p-4 bg-[#eaeaea] rounded-xl lg:rounded-2xl min-h-[150px]">
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-40">Your Cart</h3>
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-black/10 rounded-lg">
                  <span className="text-xs font-medium opacity-30 italic">Cart is empty</span>
                </div>
                <button className="w-full py-3 bg-black text-white rounded-lg text-xs font-bold tracking-widest uppercase disabled:opacity-30" disabled>
                  Checkout
                </button>
              </div>
            ) : isAboutPage ? (
              /* About Page Anchor Navigation */
              <div className="sidebar-item flex flex-col space-y-1">
                 {['Intro', 'Skills', 'Experience', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        const sectionId = item.toLowerCase(); // Ensure IDs on page match this
                        const element = document.getElementById(sectionId);
                        if (element) {
                            // Close mobile menu if open
                            setIsMobileOpen(false);
                            // Smooth scroll
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-left py-2 px-4 rounded-lg hover:bg-[#eaeaea] transition-colors text-sm font-bold tracking-wide text-gray-500 hover:text-black"
                    >
                      {item}
                    </button>
                 ))}
              </div>
            ) : (
              <>
                {/* Seasons List - Work Page */}
                <div className="sidebar-item group relative h-32 md:h-28 lg:h-36 w-full overflow-hidden rounded-xl bg-[#eaeaea] lg:rounded-xl xl:rounded-2xl">
                    <div className="relative block h-full w-full px-4 py-2 lg:px-4 fade-mask">
                      <ul className="relative h-full w-full overflow-scroll py-2 no-scrollbar">
                        {seasons.map((season, i) => (
                          <li 
                            key={i} 
                            onClick={() => handleFilter(season.year)}
                            className={`text-nav text-lg md:text-xl relative flex justify-between !leading-[1.4em] transition-all duration-300 cursor-pointer hover:opacity-100 mb-1 ${
                              (currentFilter === season.year || activeYear === season.year)
                                ? 'opacity-100 font-bold text-black' 
                                : 'opacity-40 font-medium text-gray-500'
                            }`}
                          >
                            <span className="block capitalize">{season.name}</span>
                            <span className="tabular-nums transition duration-300">{season.year}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <h3 className="w-full text-[10px] font-bold tracking-widest uppercase opacity-30 mb-1 ml-1 lg:hidden">Filter By</h3>
                  {tags.map((tag) => (
                    <button 
                      key={tag}
                      type="button" 
                      onClick={() => handleFilter(tag)}
                      className={`sidebar-item tag h-10 whitespace-nowrap rounded-lg px-4 font-bold transition-all duration-200 lg:rounded-xl text-[0.9rem] hover:bg-black hover:text-white ${
                        currentFilter === tag 
                          ? 'bg-black text-white' 
                          : 'bg-[#eaeaea] text-black'
                      }`}
                    >
                      <span className="pointer-events-none">{tag}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
