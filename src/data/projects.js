// src/data/projects.js
const projects = [
    {
        id: 1,
        business: 'suvinor',
        title: 'Nature & Tourism Souvenir Collection',
        description: 'Handcrafted Gifts · Wooden Art · Cultural Crafts',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>This souvenir project celebrates Sri Lanka's natural heritage and wildlife, featuring handcrafted gift items inspired by elephants, sea turtles, tropical forests, and island life. The collection is designed for tourists, gift shops, hotels, and cultural exhibitions.</p>
            <p>Each product reflects traditional craftsmanship combined with modern minimalist design, making it ideal for both local and international markets.</p>
        `,
        date: '2024',
        year: '2024',
        category: 'Handcrafted Souvenirs',
        image: 'souv1.jpeg',
        additionalImages: ['souv1.1.jpeg', 'souv1.2.jpeg', 'souv1.3.jpeg'],
        gallery: [],
        technologies: ['Sustainably sourced wood', 'Hand-carving & laser engraving', 'Natural oil finishes', 'Eco-friendly paints & stains', 'Handmade rope & fiber elements'],
        features: [
            'Elephant & turtle-themed souvenir designs',
            'Handcrafted wooden wall hangers',
            'Nature-inspired decorative crafts',
            'Lightweight, travel-friendly gift items',
            'Cultural storytelling through design',
            'Eco-conscious and plastic-free production'
        ],
        timeline: [
            { date: 'Research', content: 'Studying Sri Lankan wildlife symbolism, tourism trends, and cultural motifs' },
            { date: 'Concept Design', content: 'Sketching animal forms, nature patterns, and wall hanger layouts' },
            { date: 'Craft Production', content: 'Wood carving, engraving, sanding, and finishing' },
            { date: 'Assembly & Detailing', content: 'Hand assembly, rope fitting, and quality checks' },
            { date: 'Packaging Design', content: 'Eco-friendly packaging with cultural storytelling cards' }
        ],
        duration: '3',
        teamSize: '5',
        teamRoles: 'Craft Designer · Wood Artisan · Illustrator · Finishing Specialist · QA Coordinator',
        liveUrl: '#'
    },
    {
        id: 2,
        business: 'suvinor',
        title: 'Handcrafted Souvenir & Gift Collection',
        description: 'Artisan Products · Custom Gifts',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>MadLives Crafts is a creative souvenir collection focused on handmade, meaningful, and culturally inspired gift items. Each product blends craftsmanship with storytelling, making it ideal for personal gifting, events, and corporate souvenirs.</p>
            <p>The project involved designing and producing custom gift items, packaging concepts, and display-ready products that reflect authenticity, sustainability, and artistic value.</p>
        `,
        date: '2024',
        year: '2024',
        category: 'Artisan Crafts',
        image: 'souv2.jpeg',
        additionalImages: ['souv2.1.jpeg', 'souv2.2.jpeg', 'souv2.3.jpeg'],
        gallery: ['souv2.4.jpeg'],
        technologies: ['Natural wood & clay', 'Hand-painted finishes', 'Recycled paper & fabric', 'Laser engraving tools', 'Eco-safe adhesives & coatings'],
        features: [
            'Handcrafted souvenir products',
            'Custom gift personalization',
            'Eco-friendly materials & packaging',
            'Event & corporate gift collections',
            'Small-batch artisan production',
            'Premium finishing & detailing'
        ],
        timeline: [
            { date: 'Research', content: 'Exploring cultural motifs, gift trends, and material sustainability' },
            { date: 'Concept Design', content: 'Sketching product ideas, gift themes, and packaging styles' },
            { date: 'Production', content: 'Handcrafting products, finishing, and quality control' },
            { date: 'Packaging & Styling', content: 'Designing gift boxes, labels, and presentation layouts' }
        ],
        duration: '3',
        teamSize: '5',
        teamRoles: 'Product Designer · Artisan · Illustrator · Packaging Designer · QA Specialist',
        liveUrl: '#'
    },
    {
        id: 3,
        business: 'thotilla',
        title: 'Kids Bedroom Design Project',
        description: 'A thoughtfully designed kids bedroom that blends play, comfort, and safety',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>A complete kids bedroom transformation including custom furniture, wall art, and spatial planning, designed to suit the child's age, personality, and daily activities while maintaining safety and durability.</p>
            
            <h3>Design Elements</h3>
            <p>• Eco-friendly wood materials<br/>
            • Non-toxic paints & finishes<br/>
            • Soft pastel and neutral tones<br/>
            • Modular furniture concepts<br/>
            • Handcrafted decorative elements</p>
        `,
        date: '2024',
        year: '2024',
        category: 'Interior Design',
        image: 'thot1.jpeg',
        additionalImages: ['thot1.1.jpeg'],
        gallery: ['thot1.2.jpeg'],
        technologies: ['Wood (MDF / Plywood)', 'Water-based paints', 'Hand-drawn illustrations', 'Sustainable fabrics', 'Custom carpentry tools'],
        features: [
            'Custom-designed kids bed & study desk',
            'Child-safe furniture with rounded edges',
            'Playful wall art & themed illustrations',
            'Space optimization for play and storage',
            'Soft color palette for a calm environment',
            'Age-appropriate lighting & accessories'
        ],
        timeline: [
            { date: 'Concept & Planning', content: 'Theme selection, layout planning, and material choices' },
            { date: 'Design & Production', content: 'Furniture fabrication, wall art creation, and detailing' },
            { date: 'Installation & Styling', content: 'Final setup, décor placement, and quality inspection' }
        ],
        duration: '6',
        teamSize: '4',
        teamRoles: 'Interior Designer · Carpenter · Illustrator · Safety Specialist',
        liveUrl: '#'
    },
    {
        id: 4,
        business: 'epablo',
        title: 'Institutional Wall Art & Environmental Graphics',
        description: 'Public Space Design · Illustration · Murals',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>This project involved creating large-scale wall art installations for the University of Wayamba, transforming academic spaces into visually engaging environments that inspire learning, culture, and innovation.</p>
            <p>The artwork was designed to reflect education, heritage, sustainability, and future growth, enhancing student experience and institutional identity.</p>
        `,
        date: '2024',
        year: '2024',
        category: 'Wall Art & Murals',
        image: 'pablo1.jpeg',
        additionalImages: ['pablo1.1.jpeg'],
        gallery: ['pablo1.2.jpeg'],
        technologies: ['Wall-grade acrylic paints', 'Weather-resistant coatings', 'Digital illustration tools', 'Hand-painting equipment', 'Surface preparation materials'],
        features: [
            'Large-scale wall murals',
            'Custom illustrations for academic spaces',
            'University-branded visual themes',
            'Durable, long-lasting finishes',
            'Indoor & semi-outdoor wall art',
            'Minimal maintenance materials'
        ],
        timeline: [
            { date: 'Research', content: 'Understanding university values, faculties, and student culture' },
            { date: 'Concept Design', content: 'Theme development, illustration planning, and wall mapping' },
            { date: 'Production', content: 'Artwork creation and color testing' },
            { date: 'Installation', content: 'On-site wall preparation, painting, and finishing' },
            { date: 'Quality Review', content: 'Final inspection for durability and visual consistency' }
        ],
        duration: '2.5',
        teamSize: '6',
        teamRoles: 'Creative Director · Illustrator · Mural Artist · Surface Specialist · Installer · QA Lead',
        liveUrl: '#'
    },
    {
        id: 5,
        business: 'suvinor',
        title: 'Premium Vehicle Rental Platform',
        description: 'Luxury Fleet Management · Digital Booking',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>A sophisticated digital platform for premium vehicle rentals, offering seamless booking experiences for luxury cars, SUVs, and chauffeur services. Designed for discerning travelers and corporate clients.</p>
            <p>The platform features advanced filtering, real-time availability, and personalized service options to match the premium nature of the vehicles.</p>
        `,
        date: '2024 Q2',
        year: '2024',
        category: 'Digital Platform',
        image: 'souv3.jpeg',
        additionalImages: [],
        gallery: [],
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API', 'Stripe Payment'],
        features: [
            'Digital key access system',
            'Real-time vehicle availability',
            'Premium vehicle filtering',
            'Chauffeur service integration',
            'Corporate account management',
            'Multi-language support'
        ],
        timeline: [
            { date: 'Market Research', content: 'Analyzing premium rental market and customer preferences' },
            { date: 'Platform Design', content: 'UI/UX design for luxury user experience' },
            { date: 'Development', content: 'App development with premium features' },
            { date: 'Testing', content: 'Quality assurance with high-end user testing' }
        ],
        duration: '6',
        teamSize: '5',
        teamRoles: 'Product Manager · UI/UX Designer · Developer · QA Engineer · Support Specialist',
        liveUrl: '#'
    },
    {
        id: 6,
        business: 'thotilla',
        title: 'Transport Logistics Management System',
        description: 'Enterprise Logistics · Fleet Optimization',
        fullDescription: `
            <h3>Project Overview</h3>
            <p>A comprehensive logistics platform for managing transportation operations with advanced routing, real-time tracking, and inventory management for enterprise-level clients.</p>
            <p>The system optimizes fleet utilization, reduces operational costs, and provides actionable insights through detailed analytics and reporting.</p>
        `,
        date: '2024 Q1',
        year: '2024',
        category: 'Enterprise Software',
        image: 'thot2.jpeg',
        additionalImages: [],
        gallery: [],
        technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'WebSockets'],
        features: [
            'Advanced route optimization',
            'Real-time fleet tracking',
            'Inventory management system',
            'Automated dispatch',
            'Driver performance analytics',
            'Fuel consumption monitoring'
        ],
        timeline: [
            { date: 'Requirement Analysis', content: 'Gathering client needs and system specifications' },
            { date: 'System Architecture', content: 'Designing scalable architecture for enterprise use' },
            { date: 'Development', content: 'Building core platform with integration capabilities' },
            { date: 'Deployment', content: 'Cloud deployment with monitoring and support' }
        ],
        duration: '5',
        teamSize: '7',
        teamRoles: 'System Architect · Backend Developer · Frontend Developer · DevOps Engineer · QA Lead · Product Owner',
        liveUrl: '#'
    }
];

export default projects;