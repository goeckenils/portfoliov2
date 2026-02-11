export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  image?: string;
  description: string;
  tech: string[];
  services?: string[];
}

export const projects: Project[] = [
  {
    id: 'taskflow',
    title: 'TaskFlow',
    category: 'Productivity • IoT',
    year: '2025',
    color: '#3B82F6', // Blue
    description: 'A gamified productivity platform with real-time hardware integration.',
    tech: ['Next.js 16', 'Supabase', 'IoT'],
    services: ['Web Development', 'Hardware Integration', 'UX/UI Design']
  },
  {
    id: 'bounceback-audio',
    title: 'Bounceback Audio',
    category: 'Audio • WebGL',
    year: '2025',
    color: '#EC4899', // Pink
    description: 'WebGL-powered audio visualization for live electronic music performances.',
    tech: ['Three.js', 'React 19', 'Web Audio API'],
    services: ['Creative Coding', 'Audio Engineering', 'Performance Tools']
  },
  {
    id: 'zenith-store',
    title: 'Zenith Store',
    category: 'E-commerce • Headless',
    year: '2024',
    color: '#10B981', // Green
    description: 'Headless e-commerce template focusing on micro-interactions and speed.',
    tech: ['Shopify', 'Tailwind v4', 'GSAP'],
    services: ['E-commerce Development', 'Performance Optimization', 'Interaction Design']
  }
];
