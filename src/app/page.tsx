import Hero from '@/components/Hero/Hero';
import ProjectGrid from '@/components/ProjectGrid/ProjectGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <div className="pt-24 md:pt-32 lg:pt-40 px-3 lg:px-4 xl:px-6">
        <div className="md:ml-[var(--column)] md:pl-4">
          <section id="selected-work" className="py-12 md:py-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">
              Selected Work
            </h2>
            <ProjectGrid />
          </section>
        </div>
      </div>
    </main>
  );
}
