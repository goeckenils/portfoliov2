'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-config';
import Footer from '@/components/Footer/Footer';
import { projects } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo('.info-item', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo('.skill-tag', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  // Create quickSetters for performance
  const xSet = useRef<any>(null);
  const ySet = useRef<any>(null);

  useEffect(() => {
    // Initialize quickSetters
    if (overlayRef.current) {
      xSet.current = gsap.quickSetter(overlayRef.current, "x", "px");
      ySet.current = gsap.quickSetter(overlayRef.current, "y", "px");
    }

    const moveTooltip = (e: MouseEvent) => {
      if (!hoveredSkill || !overlayRef.current) return;
      
      // Position tooltip relative to cursor
      // Adding offset to prevent overlap and ensure visibility
      if (xSet.current) xSet.current(e.clientX + 15);
      if (ySet.current) ySet.current(e.clientY + 15);
    };

    window.addEventListener('mousemove', moveTooltip);
    return () => window.removeEventListener('mousemove', moveTooltip);
  }, [hoveredSkill]);

  // Animate tooltip visibility and content stagger
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (hoveredSkill) {
      // Enter animation
      const tl = gsap.timeline();
      
      tl.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      .fromTo(el.querySelectorAll('.tooltip-item'),
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        '-=0.1'
      );
      
    } else {
      // Exit animation
      const tl = gsap.timeline();
      
      // Quick fade out of content first (reverse stagger feel)
      tl.to(el.querySelectorAll('.tooltip-item'), {
        y: -5,
        opacity: 0,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power2.in'
      })
      .to(el, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
             // Reset content for next enter
             gsap.set(el.querySelectorAll('.tooltip-item'), { clearProps: 'all' });
        }
      }, '-=0.1');
    }
  }, [hoveredSkill]);

  const skills = [
    { category: 'Design', items: ['Visual Identity', 'Brand Strategy', 'UI/UX', 'Layout System', 'Typography'] },
    { category: 'Motion', items: ['After Effects', 'Lottie', 'Webflow Motion', 'GSAP', 'Frammer'] },
    { category: '3D', items: ['Blender', 'Cinema 4D', 'Spline', 'Three.js', 'Lighting & Texturing'] },
    { category: 'Engineering', items: ['React / Next.js', 'Typescript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'] },
  ];

  const getProjectsBySkill = (skill: string) => {
    return projects.filter(p => p.services?.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))).slice(0, 3);
  };

  const matchedProjects = hoveredSkill ? getProjectsBySkill(hoveredSkill) : [];

  return (
    <main ref={containerRef} className="min-h-screen pt-48 md:pt-64 lg:pt-80 px-4 md:px-6 lg:px-8 pb-0 overflow-x-hidden relative">
      
      {/* Skill Tooltip - Follows Cursor */}
      <div 
        ref={overlayRef}
        className="fixed top-0 left-0 z-[9999] bg-white text-black p-4 rounded-xl shadow-2xl opacity-0 pointer-events-none w-80 transform-gpu border border-gray-100"
      >
        <div className="tooltip-item mb-3 border-b border-black/10 pb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 block mb-1">Skill</span>
            <h3 className="text-lg font-bold tracking-tight">{hoveredSkill}</h3>
        </div>
        
        {matchedProjects.length > 0 ? (
          <div className="tooltip-item space-y-3">
             <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 block">Featured Projects</span>
             {matchedProjects.map(project => (
               <div key={project.id} className="tooltip-item flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {/* Tiny thumbnail placeholder */}
                    <div className="w-full h-full bg-gray-200" />
                  </div>
                  <div className="leading-none">
                    <span className="block text-xs font-bold">{project.title}</span>
                    <span className="block text-[9px] text-gray-400 mt-1 truncate max-w-[150px]">{project.category}</span>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="tooltip-item text-xs text-gray-400 font-medium italic">
            No specific projects tagged.
          </div>
        )}
      </div>

      <div className="md:ml-[var(--column)] md:pl-8">
        
        {/* Intro Section */}
        <section id="intro" className="mb-32 md:mb-48 scroll-mt-32">
          <span className="info-item text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-4 block">
            The Designer / Engineer
          </span>
          <h1 className="info-item text-5xl md:text-[10vw] font-bold tracking-[-0.04em] leading-[0.85] mb-12">
            NILS <br /> GOECKE
          </h1>
          <div className="info-item max-w-3xl space-y-8">
            <p className="text-xl md:text-3xl font-medium tracking-tight leading-snug">
              Specializing in the intersection of <span className="text-gray-400">visual logic</span> and <span className="text-gray-400">technical execution</span>. 
              I build digital environments that are as performant as they are beautiful.
            </p>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
              Based in Germany and working worldwide, I help studios and companies navigate the complex landscape 
               of modern web experiences. My approach is rooted in Swiss design principles combined with 
               cutting-edge frontend architecture.
            </p>
          </div>
        </section>

        {/* Skills Grid */}
        <section id="skills" className="mb-32 md:mb-48 scroll-mt-32">
          <h2 className="info-item text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-12">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="info-item flex flex-col space-y-6">
                <h3 className="text-xl font-bold tracking-tight border-b border-black/5 pb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="skill-tag bg-[#f5f5f5] text-black px-4 py-2 rounded-lg text-xs font-bold tracking-wide cursor-pointer hover:bg-black hover:text-white transition-colors"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-48 scroll-mt-32">
          <h2 className="info-item text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-12">
            Professional Trajectory
          </h2>
          <div className="space-y-8 max-w-4xl">
            {[
              { year: '2024 - PRES', role: 'Independent Design Engineer', company: 'Global / Remote' },
              { year: '2022 - 2024', role: 'Senior Product Designer', company: 'Berlin Creative Studio' },
              { year: '2020 - 2022', role: 'Fullstack Developer', company: 'Tech Innovation Hub' },
            ].map((job, idx) => (
              <div key={idx} className="info-item group flex justify-between items-center border-b border-black/5 pb-8">
                <div className="flex flex-col">
                  <span className="text-xs font-bold opacity-30 tabular-nums uppercase tracking-widest mb-1">{job.year}</span>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight">{job.role}</h3>
                  <span className="text-sm text-gray-400 font-medium">{job.company}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold">↗</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
