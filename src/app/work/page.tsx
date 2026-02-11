'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TransitionLink from '@/components/common/TransitionLink';
import { gsap, ScrollTrigger, Flip } from '@/lib/gsap-config';

import { projects, Project } from '@/data/projects';

function WorkContent() {
  const gridRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  const [isAnimating, setIsAnimating] = useState(false);

  // Compute the target projects based on filter
  const targetProjects = projects.filter(project => {
    if (!filter) return true;
    if (filter === 'All') return true;
    return project.category.toLowerCase().includes(filter.toLowerCase()) || 
           project.year === filter;
  });

  useEffect(() => {
    if (isAnimating) return;

    const animateTransition = () => {
        setIsAnimating(true);
        const cards = document.querySelectorAll('.project-card-work');
        
        // 1. Get current state for Flip
        const state = Flip.getState(cards);

        // 2. Hide items that are leaving
        const itemsToLeave = Array.from(cards).filter(card => {
            const id = card.getAttribute('data-id');
            return !targetProjects.find((p: Project) => p.id === id);
        });

        gsap.to(itemsToLeave, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                // 3. Update state (React render)
                setDisplayedProjects(targetProjects);
                
                // 4. Wait for next tick to let React render new grid
                requestAnimationFrame(() => {
                    const newCards = document.querySelectorAll('.project-card-work');
                    const enteringItems = Array.from(newCards).filter(card => {
                        const id = card.getAttribute('data-id');
                        return !displayedProjects.find((p: Project) => p.id === id);
                    });

                    // Set initial state for new items
                    gsap.set(enteringItems, { opacity: 0, scale: 0.9 });

                    // 5. Play flip animation for staying items
                    Flip.from(state, {
                        duration: 0.6,
                        ease: 'power3.inOut',
                        stagger: 0.02,
                        absolute: true, // Keep positions during flip
                        onComplete: () => {
                            // 6. Fade in new items
                            gsap.to(enteringItems, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                stagger: 0.05,
                                ease: 'power2.out',
                                clearProps: 'all'
                            });
                            ScrollTrigger.refresh();
                            setIsAnimating(false);
                        }
                    });
                });
            }
        });
    };

    if (displayedProjects.length !== targetProjects.length || 
        displayedProjects[0]?.id !== targetProjects[0]?.id) {
        animateTransition();
    }

  }, [filter, targetProjects, isAnimating, displayedProjects]);

  // Initial enter animation
  useEffect(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.work-header-item', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
      .fromTo('.project-card-work', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power4.out', clearProps: 'all' },
        '-=0.5'
      );
  }, []);

  return (
    <main className="w-full pb-48 pt-64 md:pt-80 lg:pt-[30vh] px-4 md:px-6 lg:px-8 bg-white">
      <div className="md:ml-[var(--column)] md:pl-12">
        {/* Header Section */}
        <div className="mb-24 md:mb-40 flex flex-col items-start overflow-hidden">
          <div className="work-header-item flex flex-col items-start">
             <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase opacity-20 mb-6 ml-1">
              {filter ? `Filtered / ${filter}` : 'Full Portfolio / 2023 — 2025'}
            </span>
            <div className="relative">
              <h1 className="text-6xl md:text-9xl lg:text-[12vw] font-bold tracking-[-0.06em] leading-[0.8] mb-12">
                {filter ? filter : 'Archive'}
              </h1>
            </div>
            <p className="text-lg md:text-3xl text-gray-400 max-w-4xl font-medium tracking-tight leading-snug">
              A curated selection of works across brand identity, motion direction, and digital architectural engineering. 
              {filter && ` Showing only ${filter} related explorations.`}
            </p>
          </div>
        </div>

        {/* Project Gallery - 2 columns for premium feel */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-x-20 md:gap-y-40 min-h-[50vh]">
          {displayedProjects.map((project: Project, index: number) => (
            <TransitionLink
              key={project.id}
              href={`/work/${project.id}`}
              className="group block w-full project-card-work"
              data-year={project.year}
              data-id={project.id}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8 bg-[#f9f9f9]">
                <div 
                  className="absolute inset-0 transition-transform duration-[1.5s] ease-out-expo group-hover:scale-110"
                  style={{ backgroundColor: project.color }}
                />
                
                 {/* Premium Hover Reveal */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 bg-black/5 backdrop-blur-[4px]">
                    <div className="bg-white text-black w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest uppercase shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-700">
                      Open
                    </div>
                 </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-none mb-3">
                      {project.title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-30">{project.category}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold opacity-20 tabular-nums">/ {project.year}</span>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function WorkPage() {
  return (
    <Suspense>
      <WorkContent />
    </Suspense>
  );
}
