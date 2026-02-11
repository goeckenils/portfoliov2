'use client';

import { useEffect, useRef } from 'react';
import TransitionLink from '@/components/common/TransitionLink';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

import { projects } from '@/data/projects';

export default function ProjectGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const projectCards = gridRef.current.querySelectorAll('.project-card');

    // Clear existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(st => {
      // Check if trigger exists and is a DOM node (Element) before using contains
      const trigger = st.vars.trigger;
      if (trigger && (trigger as any) instanceof Element && gridRef.current?.contains(trigger as Element)) {
        st.kill();
      }
    });

    projectCards.forEach((project) => {
      const image = project.querySelector('.project-image');
      const title = project.querySelector('.project-title');

      if (image) {
        gsap.fromTo(image,
          { opacity: 0, scale: 1.1 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6, // Was 1.2
            ease: 'power2.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 85%', // slightly earlier start
              end: 'top 30%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4, // Was 0.8
            ease: 'power2.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="">
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {projects.map((project) => (
          <TransitionLink
            key={project.id}
            href={`/work/${project.id}`}
            className="project-card group block"
            data-year={project.year}
            onMouseEnter={() => {
              // Add cursor interaction logic here if CustomCursor context is available
              // For now, relying on CSS or simple state if needed
              document.body.classList.add('hover-project');
            }}
            onMouseLeave={() => {
              document.body.classList.remove('hover-project');
            }}
          >
            <div className="project-image relative aspect-[4/3] overflow-hidden mb-6">
              <div 
                className="relative w-full h-full bg-gray-200 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundColor: project.color }}
              >
                 {/* Optional: Add actual image here */}
              </div>
              
              {/* Tooltip-like overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                 <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project
                 </span>
              </div>
            </div>
            <div className="project-title mt-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech?.map((t) => (
                  <span key={t} className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                {project.description}
              </p>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
