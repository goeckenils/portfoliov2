'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { gsap } from '@/lib/gsap-config';
import TransitionLink from '@/components/common/TransitionLink';

import { projects } from '@/data/projects';

export default function ProjectDetailPage() {
  const params = useParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const slug = params.slug as string;
  const project = projects.find(p => p.id === slug);

  useEffect(() => {
    if (!project || !heroRef.current) return;

    // Clear any existing props and set initial state
    gsap.set([heroRef.current, '.project-info'], { clearProps: 'all' });

    // Animate hero
    gsap.fromTo(heroRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Animate project info sections
    gsap.fromTo('.project-info',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
      }
    );
  }, [project, slug]);

  if (!project) {
    return (
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <TransitionLink
            href="/work"
            className="text-sm hover:opacity-60 transition-opacity"
          >
            ← Back to Work
          </TransitionLink>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 md:pt-32 lg:pt-40 px-3 lg:px-4 xl:px-6 pb-24">
      <div className="md:ml-[var(--column)] md:pl-4">
        <div className="w-full">
          {/* Back button */}
        <TransitionLink
          href="/work"
          className="text-sm mb-12 mt-8 hover:opacity-60 transition-opacity inline-flex items-center gap-2"
        >
          ← Back to Work
        </TransitionLink>

        {/* Hero */}
        <div
          ref={heroRef}
          className="aspect-[16/9] w-full rounded-lg mb-12"
          style={{ backgroundColor: project.color }}
        />

        {/* Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="project-info lg:col-span-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="project-info lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-500">Year</h3>
              <p className="text-lg">{project.year}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-500">Category</h3>
              <p className="text-lg">{project.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-500">Services</h3>
              <ul className="space-y-1">
                {project.services?.map((service) => (
                  <li key={service} className="text-lg">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional content sections */}
        <div className="space-y-24 project-info">
          <div className="aspect-[4/3] rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Image Placeholder 1</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Image 2</span>
            </div>
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Image 3</span>
            </div>
          </div>

          <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Video Placeholder</span>
          </div>
        </div>

        {/* Navigation to next project */}
        <div className="mt-32 pt-12 border-t border-gray-200">
          <TransitionLink
            href="/work"
            className="text-lg mt-4 hover:opacity-60 transition-opacity inline-block"
          >
            View All Projects →
          </TransitionLink>
        </div>
        </div>
      </div>
    </main>
  );
}
