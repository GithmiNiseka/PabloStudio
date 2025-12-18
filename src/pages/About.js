// src/pages/About.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const root = useRef();
    const [activeService, setActiveService] = useState('interior');
    const [activeBrand, setActiveBrand] = useState('pablo');
    const [activePrinciple, setActivePrinciple] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial page load animations
            const heroTimeline = gsap.timeline();
            
            // Hero animation
            const heroLines = gsap.utils.toArray('.about-hero-line');
            heroLines.forEach((line, i) => {
                heroTimeline.from(line, {
                    y: 80,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }, i * 0.3);
            });

            heroTimeline.from('.about-hero-description', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, 0.9);

            // Brand logos animation
            const brandLogos = gsap.utils.toArray('.brand-logo-container');
            brandLogos.forEach((logo, i) => {
                heroTimeline.from(logo, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, 1.2 + (i * 0.1));
            });

            // Floating animations
            const floatingBrands = gsap.utils.toArray('.floating-brand');
            floatingBrands.forEach((brand, i) => {
                gsap.to(brand, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5
                });
            });

            // SCROLL-TRIGGERED ANIMATIONS

            // Story section
            gsap.from('.story-text', {
                x: -50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".story-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from('.story-stats', {
                x: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".story-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Principles animation
            const principleCards = gsap.utils.toArray('.principle-card');
            principleCards.forEach((card, i) => {
                gsap.from(card, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Brands animation
            gsap.from('.brands-tabs', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".brands-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from('.brand-details', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: ".brands-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            // Timeline animation
            const timelineItems = gsap.utils.toArray('.timeline-item');
            timelineItems.forEach((item, i) => {
                gsap.from(item, {
                    x: i % 2 === 0 ? -30 : 30,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Services animation
            const serviceCards = gsap.utils.toArray('.service-card');
            serviceCards.forEach((card, i) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // PROCESS STEPS ANIMATION
            const processSteps = gsap.utils.toArray('.process-step');
            const stepArrows = gsap.utils.toArray('.step-arrow');

            // Set initial state - only first step visible
            gsap.set(processSteps[0], { opacity: 1, y: 0 });
            gsap.set(processSteps.slice(1), { opacity: 0.2, y: 10 });
            gsap.set(stepArrows, { opacity: 0.2 });

            // Create ScrollTrigger for each step
            processSteps.forEach((step, i) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 90%",
                    onEnter: () => {
                        // Mark step as active
                        step.classList.add('active');
                        
                        // Animate current step to full opacity
                        gsap.to(step, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            onComplete: () => {
                                // Set previous steps to medium opacity
                                if (i > 0) {
                                    gsap.to(processSteps.slice(0, i), {
                                        opacity: 0.6,
                                        duration: 0.5,
                                        ease: "power2.out"
                                    });
                                }
                                
                                // Animate the arrow before this step
                                if (i > 0 && stepArrows[i - 1]) {
                                    const arrow = stepArrows[i - 1];
                                    const arrowLine = arrow.querySelector('.arrow-line');
                                    const arrowHead = arrow.querySelector('.arrow-head');
                                    
                                    gsap.to(arrow, {
                                        opacity: 0.8,
                                        duration: 0.6,
                                        ease: "power2.out"
                                    });
                                    
                                    if (arrowLine) {
                                        gsap.fromTo(arrowLine,
                                            { strokeDashoffset: 100 },
                                            {
                                                strokeDashoffset: 0,
                                                duration: 1.2,
                                                ease: "power2.out",
                                                delay: 0.3
                                            }
                                        );
                                    }
                                    
                                    if (arrowHead) {
                                        gsap.to(arrowHead, {
                                            opacity: 1,
                                            duration: 0.5,
                                            delay: 1,
                                            ease: "power2.out"
                                        });
                                    }
                                }
                            }
                        });
                    },
                    once: true
                });
            });

            // CTA animation
            gsap.from('.cta-content', {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".about-cta-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

        }, root);

        return () => ctx.revert();
    }, []);

    const servicesData = {
        interior: [
            {
                title: "Hand-painted Murals",
                description: "Custom wall art for residential and commercial spaces",
                features: ["Custom designs", "Various styles", "Durable finishes"]
            },
            {
                title: "Wall Illustrations",
                description: "Detailed illustrations for thematic spaces",
                features: ["Story-based themes", "Educational content", "Interactive elements"]
            },
            {
                title: "Pediatric Ward Designs",
                description: "Healing environments for healthcare facilities",
                features: ["Therapeutic colors", "Child-friendly themes", "Easy maintenance"]
            },
            {
                title: "Office Branding Art",
                description: "Corporate identity through interior art",
                features: ["Brand integration", "Motivational themes", "Team collaboration"]
            }
        ],
        custom: [
            {
                title: "Custom Illustration",
                description: "Personalized artwork for any requirement",
                features: ["Personal consultation", "Multiple concepts", "Digital previews"]
            },
            {
                title: "Brand-based Artwork",
                description: "Art that communicates brand values",
                features: ["Brand analysis", "Custom color schemes", "Scalable designs"]
            },
            {
                title: "Large-scale Installations",
                description: "Architectural-scale art projects",
                features: ["Structural planning", "Site preparation", "Professional installation"]
            }
        ],
        eco: [
            {
                title: "Zero-Plastic Décor",
                description: "Handcrafted items from sustainable materials",
                features: ["Natural materials", "Handmade quality", "Eco-friendly packaging"]
            },
            {
                title: "Artisan Collections",
                description: "Limited edition crafted pieces",
                features: ["Limited runs", "Artist-signed", "Collector's items"]
            }
        ],
        institutional: [
            {
                title: "School Environments",
                description: "Educational and inspirational spaces",
                features: ["Educational themes", "Interactive elements", "Child-safe materials"]
            },
            {
                title: "Public Space Art",
                description: "Community-focused installations",
                features: ["Community input", "Durability focus", "Accessibility considered"]
            }
        ]
    };

    const principlesData = [
        {
            id: 'craftsmanship',
            title: 'Artistic Craftsmanship',
            description: 'Every piece is a unique creation with meticulous attention to detail, handcrafted by skilled artisans who blend traditional techniques with contemporary design.'
        },
        {
            id: 'sustainability',
            title: 'Sustainable Innovation',
            description: 'We pioneer eco-friendly practices, using zero-plastic materials and sustainable resources to create art that respects both people and the planet.'
        },
        {
            id: 'healing',
            title: 'Healing Environments',
            description: 'Designing spaces that positively impact wellbeing, especially in healthcare and educational settings, using art as a therapeutic tool.'
        },
        {
            id: 'collaboration',
            title: 'Client Collaboration',
            description: 'Working closely with clients at every stage to transform their vision into reality, ensuring transparent communication and shared ownership.'
        },
        {
            id: 'community',
            title: 'Community Impact',
            description: 'Creating art that serves and enriches communities, focusing on accessibility and positive social impact through creative expression.'
        },
        {
            id: 'minimalism',
            title: 'Intentional Minimalism',
            description: 'Believing in the power of simplicity, we create designs that are both functional and beautiful through thoughtful reduction.'
        }
    ];

    const brandsData = [
        {
            id: 'pablo',
            name: 'Pablo Studio',
            description: 'Creative Interior Art & Wall Murals',
            details: 'The flagship brand specializing in hand-painted murals, interior art installations, and eco-friendly décor for residential, commercial, and institutional spaces. Our core expertise lies in transforming ordinary spaces into extraordinary experiences through artistic excellence.',
            features: [
                'Hand-painted wall murals',
                'Interior art installations',
                'Healthcare environment design',
                'Corporate office branding',
                'Sustainable material focus'
            ]
        },
        {
            id: 'thotilla',
            name: 'Thotilla.lk',
            description: 'Baby & Kids Room Specialists',
            details: 'A dedicated sub-brand creating joyful, safe, and creative spaces for children. We design and produce custom baby furniture, kids room décor, study spaces, and educational wall art that stimulate imagination while prioritizing child safety.',
            features: [
                'Custom baby room design',
                'Child-safe furniture',
                'Educational wall art',
                'Themed bedroom décor',
                'Eco-friendly kids products'
            ]
        },
        {
            id: 'souvenir',
            name: 'Pablo Souvenir',
            description: 'Artistic Gifts & Keepsakes',
            details: 'Our souvenir division produces handcrafted, eco-friendly gift items and keepsakes. We specialize in personalized gifts, corporate souvenirs, and cultural mementos that embody our commitment to sustainable craftsmanship.',
            features: [
                'Handcrafted souvenirs',
                'Custom corporate gifts',
                'Personalized keepsakes',
                'Cultural mementos',
                'Zero-plastic packaging'
            ]
        }
    ];

    const processSteps = [
        {
            number: "01",
            title: "Consultation",
            description: "Understanding your vision and requirements"
        },
        {
            number: "02",
            title: "Concept Design",
            description: "Creating initial sketches and concepts"
        },
        {
            number: "03",
            title: "Material Selection",
            description: "Choosing sustainable, appropriate materials"
        },
        {
            number: "04",
            title: "Execution",
            description: "Professional implementation and installation"
        },
        {
            number: "05",
            title: "Follow-up",
            description: "Ensuring satisfaction and maintenance guidance"
        }
    ];

    return (
        <div ref={root} className="about-services-page">
            <Nav />
            
            {/* HERO SECTION */}
            <section className="about-hero-section">
                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <h1 className="about-hero-title">
                            <div className="about-hero-line">Pablo Studio</div>
                            <div className="about-hero-line">Creative Interior Art</div>
                            <div className="about-hero-line">& Sustainable Design</div>
                        </h1>
                        <p className="about-hero-description">
                           
                        </p>
                       
                    </div>
                    
                    <div className="scroll-indicator">
                        <div className="scroll-line"></div>
                        <span>Explore Our Story</span>
                    </div>
                </div>
            </section>
            
            {/* OUR STORY SECTION */}
            <section className="story-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Philosophy</h2>
                        <p className="section-subtitle">Established 2015 • Moratuwa, Sri Lanka</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="story-content-grid">
                            <div className="story-text">
                                <p>
                                    Founded in 2015, Pablo began as a vision to merge artistic expression 
                                    with environmental responsibility. What started as a small creative 
                                    studio in Moratuwa has evolved into a collective of specialized brands, 
                                    each dedicated to transforming spaces and objects through intentional design.
                                </p>
                                <p>
                                    We operate on the principle that good design should not only be beautiful 
                                    but also purposeful, sustainable, and meaningful. From healthcare spaces 
                                    that heal to children's rooms that inspire, every project carries our 
                                    signature commitment to artistic excellence and ecological mindfulness.
                                </p>
                                 <div className="brand-logos">
                            <div className="brand-logo-container floating-brand">
                                <div className="brand-logo">PABLO</div>
                                <span className="brand-tag">Studio</span>
                            </div>
                            <div className="brand-logo-container floating-brand">
                                <div className="brand-logo">THOTILLA</div>
                                <span className="brand-tag">.lk</span>
                            </div>
                            <div className="brand-logo-container floating-brand">
                                <div className="brand-logo">SOUVENIR</div>
                                <span className="brand-tag">Collection</span>
                            </div>
                        </div>
                            </div>
                            <div className="story-stats">
                                <div className="stat-item">
                                    <div className="stat-number">300+</div>
                                    <div className="stat-label">Projects Completed</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">3</div>
                                    <div className="stat-label">Specialized Brands</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">100%</div>
                                    <div className="stat-label">Zero-Plastic Promise</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">60+</div>
                                    <div className="stat-label">Artisan Partners</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRINCIPLES SECTION */}
            <section className="principles-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Core Values</h2>
                        <p className="section-subtitle">Foundations of our creative approach</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="principles-grid">
                            {principlesData.map((principle) => (
                                <div 
                                    key={principle.id}
                                    className={`principle-card ${activePrinciple === principle.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActivePrinciple(principle.id)}
                                    onMouseLeave={() => setActivePrinciple(null)}
                                    onClick={() => setActivePrinciple(activePrinciple === principle.id ? null : principle.id)}
                                >
                                    <h3 className="principle-title">{principle.title}</h3>
                                    <div className="principle-border"></div>
                                    <div className="principle-description">
                                        <p>{principle.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* BRANDS SECTION */}
            <section className="brands-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Brands</h2>
                        <p className="section-subtitle">Specialized solutions, unified vision</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="brands-tabs">
                            {brandsData.map((brand) => (
                                <button
                                    key={brand.id}
                                    className={`brand-tab ${activeBrand === brand.id ? 'active' : ''}`}
                                    onClick={() => setActiveBrand(brand.id)}
                                >
                                    {brand.name}
                                </button>
                            ))}
                        </div>
                        
                        <div className="brand-details">
                            <div className="brand-detail-item">
                                <h3 className="brand-detail-name">{brandsData.find(b => b.id === activeBrand)?.name}</h3>
                                <p className="brand-detail-description">{brandsData.find(b => b.id === activeBrand)?.description}</p>
                                <div className="brand-detail-content">
                                    <p>{brandsData.find(b => b.id === activeBrand)?.details}</p>
                                    <div className="brand-features">
                                        {brandsData.find(b => b.id === activeBrand)?.features.map((feature, index) => (
                                            <div key={index} className="brand-feature-item">
                                                <span className="feature-bullet">•</span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           

            {/* SERVICES SECTION */}
            <section className="services-section">
                <div className="section-container">
                    <div className="services-header">
                        <div className="section-header">
                            <h2 className="section-title">Our Services</h2>
                            <p className="section-subtitle">Comprehensive creative solutions</p>
                        </div>
                        
                        <div className="services-tabs">
                            <button 
                                className={`service-tab ${activeService === 'interior' ? 'active' : ''}`}
                                onClick={() => setActiveService('interior')}
                            >
                                Interior Art
                            </button>
                            <button 
                                className={`service-tab ${activeService === 'custom' ? 'active' : ''}`}
                                onClick={() => setActiveService('custom')}
                            >
                                Custom Design
                            </button>
                            <button 
                                className={`service-tab ${activeService === 'eco' ? 'active' : ''}`}
                                onClick={() => setActiveService('eco')}
                            >
                                Eco Products
                            </button>
                            <button 
                                className={`service-tab ${activeService === 'institutional' ? 'active' : ''}`}
                                onClick={() => setActiveService('institutional')}
                            >
                                Institutional
                            </button>
                        </div>
                    </div>
                    
                    <div className="section-content">
                        <div className="services-grid">
                            {servicesData[activeService].map((service, index) => (
                                <div key={index} className="service-card">
                                    <div className="service-number">0{index + 1}</div>
                                    <div className="service-content">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                        <div className="service-features">
                                            {service.features.map((feature, i) => (
                                                <span key={i} className="feature-tag">{feature}</span>
                                            ))}
                                        </div>
                                        <Link to="/contact" className="service-link">
                                            Discuss project →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="process-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Methodology</h2>
                        <p className="section-subtitle">Structured creative process</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="process-flow">
                            <div className="process-steps-container">
                                {processSteps.map((step, index) => (
                                    <React.Fragment key={index}>
                                        <div 
                                            className="process-step" 
                                            data-step={index + 1}
                                        >
                                            <div className="step-content-wrapper">
                                                <span className="step-number">{step.number}</span>
                                                <div className="step-content">
                                                    <h3>{step.title}</h3>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Arrow between steps (except last one) */}
                                        {index < processSteps.length - 1 && (
                                            <div className="step-arrow">
                                                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                                                    <path 
                                                        className="arrow-line"
                                                        d="M0,12 L50,12" 
                                                        stroke="var(--text-color)" 
                                                        strokeWidth="2"
                                                        strokeDasharray="60"
                                                        strokeDashoffset="60"
                                                    />
                                                    <path 
                                                        className="arrow-head"
                                                        d="M50,9 L60,12 L50,15 Z" 
                                                        fill="var(--text-color)"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="about-cta-section">
                <div className="section-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Begin Your Project</h2>
                        <p className="cta-subtitle">
                            Whether you need interior art, children's space design, or meaningful gifts, 
                            our collective has the expertise to bring your vision to reality.
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="cta-link primary">
                                Start Collaboration
                            </Link>
                            <Link to="/portfolio" className="cta-link secondary">
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;