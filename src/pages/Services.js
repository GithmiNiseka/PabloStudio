// src/pages/Services.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const root = useRef();
    const serviceCardsRef = useRef([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Stagger service cards animation
            gsap.from('.service-category-card', {
                scrollTrigger: {
                    trigger: '.services-hero',
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate individual service items
            serviceCardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
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
                image: "/api/placeholder/400/300",
                features: ["Custom designs", "Various styles", "Durable finishes"]
            },
            {
                title: "Wall Illustrations",
                description: "Detailed illustrations for thematic spaces",
                image: "/api/placeholder/400/300",
                features: ["Story-based themes", "Educational content", "Interactive elements"]
            },
            {
                title: "Pediatric Ward Designs",
                description: "Healing environments for healthcare facilities",
                image: "/api/placeholder/400/300",
                features: ["Therapeutic colors", "Child-friendly themes", "Easy maintenance"]
            },
            {
                title: "Office Branding Art",
                description: "Corporate identity through interior art",
                image: "/api/placeholder/400/300",
                features: ["Brand integration", "Motivational themes", "Team collaboration"]
            }
        ],
        custom: [
            {
                title: "Custom Illustration",
                description: "Personalized artwork for any requirement",
                image: "/api/placeholder/400/300",
                features: ["Personal consultation", "Multiple concepts", "Digital previews"]
            },
            {
                title: "Brand-based Artwork",
                description: "Art that communicates brand values",
                image: "/api/placeholder/400/300",
                features: ["Brand analysis", "Custom color schemes", "Scalable designs"]
            },
            {
                title: "Large-scale Installations",
                description: "Architectural-scale art projects",
                image: "/api/placeholder/400/300",
                features: ["Structural planning", "Site preparation", "Professional installation"]
            }
        ],
        eco: [
            {
                title: "Zero-Plastic Décor",
                description: "Handcrafted items from sustainable materials",
                image: "/api/placeholder/400/300",
                features: ["Natural materials", "Handmade quality", "Eco-friendly packaging"]
            },
            {
                title: "Artisan Collections",
                description: "Limited edition crafted pieces",
                image: "/api/placeholder/400/300",
                features: ["Limited runs", "Artist-signed", "Collector's items"]
            }
        ],
        institutional: [
            {
                title: "School Environments",
                description: "Educational and inspirational spaces",
                image: "/api/placeholder/400/300",
                features: ["Educational themes", "Interactive elements", "Child-safe materials"]
            },
            {
                title: "Public Space Art",
                description: "Community-focused installations",
                image: "/api/placeholder/400/300",
                features: ["Community input", "Durability focus", "Accessibility considered"]
            }
        ]
    };

    return (
        <div ref={root} className="services-page">
            <Nav />
            
            {/* HERO */}
            <section className="services-hero">
                <div className="content-wrapper">
                    <h1 className="page-title">Our Services</h1>
                    <p className="hero-description">
                        Comprehensive interior art solutions for every space, 
                        combining artistic excellence with sustainable practices.
                    </p>
                </div>
            </section>

            {/* SERVICE CATEGORIES */}
            <section className="service-categories">
                <div className="content-wrapper">
                    <div className="categories-grid">
                        <Link to="#interior" className="service-category-card">
                            <div className="category-icon">🎨</div>
                            <h3>Interior Wall & Space Decoration</h3>
                            <p>Transform walls into works of art</p>
                        </Link>
                        <Link to="#custom" className="service-category-card">
                            <div className="category-icon">✏️</div>
                            <h3>Custom Art & Design Work</h3>
                            <p>Personalized artistic solutions</p>
                        </Link>
                        <Link to="#eco" className="service-category-card">
                            <div className="category-icon">🌿</div>
                            <h3>Eco-Friendly Handcrafted Products</h3>
                            <p>Sustainable decor and gifts</p>
                        </Link>
                        <Link to="#institutional" className="service-category-card">
                            <div className="category-icon">🏛️</div>
                            <h3>Institutional Creative Solutions</h3>
                            <p>Specialized space transformation</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTERIOR DECORATION */}
            <section id="interior" className="service-section">
                <div className="content-wrapper">
                    <h2 className="section-heading-rz">Interior Wall & Space Decoration</h2>
                    <div className="services-grid">
                        {servicesData.interior.map((service, index) => (
                            <div 
                                key={index}
                                ref={el => serviceCardsRef.current[index] = el}
                                className="service-card-detailed"
                            >
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="quote-btn">Request a Quote</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CUSTOM ART */}
            <section id="custom" className="service-section">
                <div className="content-wrapper">
                    <h2 className="section-heading-rz">Custom Art & Design Work</h2>
                    <div className="services-grid">
                        {servicesData.custom.map((service, index) => (
                            <div key={index} className="service-card-detailed">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="quote-btn">Request a Quote</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ECO-FRIENDLY */}
            <section id="eco" className="service-section">
                <div className="content-wrapper">
                    <h2 className="section-heading-rz">Eco-Friendly Handcrafted Products</h2>
                    <div className="services-grid">
                        {servicesData.eco.map((service, index) => (
                            <div key={index} className="service-card-detailed">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Link to="/shop" className="shop-btn">View in Shop</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSTITUTIONAL */}
            <section id="institutional" className="service-section">
                <div className="content-wrapper">
                    <h2 className="section-heading-rz">Institutional Creative Solutions</h2>
                    <div className="services-grid">
                        {servicesData.institutional.map((service, index) => (
                            <div key={index} className="service-card-detailed">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="quote-btn">Request Consultation</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="our-process">
                <div className="content-wrapper">
                    <h2 className="section-heading-rz">Our Process</h2>
                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <h3>Consultation</h3>
                            <p>Understanding your vision and requirements</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">02</div>
                            <h3>Concept Design</h3>
                            <p>Creating initial sketches and concepts</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">03</div>
                            <h3>Material Selection</h3>
                            <p>Choosing sustainable, appropriate materials</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">04</div>
                            <h3>Execution</h3>
                            <p>Professional implementation and installation</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">05</div>
                            <h3>Follow-up</h3>
                            <p>Ensuring satisfaction and maintenance guidance</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;