export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    color: string;
    image?: string; // Optional for now, can add placeholder logic
    description?: string;
    services?: string[];
}

export const projects: Project[] = [
    {
        id: 'sessions',
        title: 'Sessions',
        category: 'Visual Identity, Motion, Website',
        year: '2025',
        color: '#FF6B35',
        description: 'A growth platform for food brands on a mission to bring original food to every part of the UK. We developed a distinctive identity centered around an \'S\' symbol that evokes the logic of trademarks.',
        services: ['Visual Identity', 'Motion Design', 'Website Development', 'Packaging'],
    },
    {
        id: 'breathpod',
        title: 'Breathpod',
        category: 'Strategy, Visual Identity, Motion',
        year: '2025',
        color: '#4ECDC4',
        description: 'A breathwork and music platform designed to spark deeper awareness and personal transformation. The design system takes inspiration from the breath itself, expanding and contracting.',
        services: ['Brand Strategy', 'Visual Identity', 'Motion Graphics', 'App Design'],
    },
    {
        id: 'renaissance',
        title: 'Renaissance',
        category: 'Branding, Packaging',
        year: '2024',
        color: '#95E1D3',
        description: 'A modern take on classic wine branding, Renaissance combines traditional craftsmanship with contemporary design principles.',
        services: ['Brand Identity', 'Packaging Design', 'Art Direction'],
    },
    {
        id: 'estrid',
        title: 'Estrid',
        category: 'Naming, Visual Identity, Campaign',
        year: '2024',
        color: '#F38181',
        description: 'Body care brand built on a mission of body confidence for all. Created a summer activation inspired by Ibiza\'s legendary nightlife culture.',
        services: ['Naming', 'Visual Identity', 'Campaign Strategy', 'Brand Activation'],
    },
    {
        id: 'devils-fruit',
        title: 'Devils Fruit',
        category: 'Branding, Packaging, Website',
        year: '2024',
        color: '#AA96DA',
        description: 'A coffee brand inspired by the story of coffee itself. Deep scrolling experience that takes you through the depths of hell to discover the perfect blend.',
        services: ['Branding', 'Packaging', 'Web Development', 'UX/UI Design'],
    },
    {
        id: 'kiln',
        title: 'Kiln',
        category: 'Visual Identity, Strategy',
        year: '2023',
        color: '#FCBAD3',
        description: 'A ceramic studio combining traditional techniques with modern aesthetics. Identity reflects the transformation process of clay through fire.',
        services: ['Visual Identity', 'Brand Strategy', 'Print Design'],
    },
];
