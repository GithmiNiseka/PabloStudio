// src/pages/Home.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Home.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const root = useRef();
    const heroRef = useRef();
    const heroTitleRef = useRef();
    const servicesRef = useRef([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);
    const [keywordPositions, setKeywordPositions] = useState([]);
    const [hoveredKeywordIndex, setHoveredKeywordIndex] = useState(null);
    const navigate = useNavigate();

    // Main services data
    const mainServices = [
        {
            id: 1,
            title: "Large Scale Wall Decor",
            description: "Custom murals and oversized installations for transformative spaces",
            color: "#a80000"
        },
        {
            id: 2,
            title: "Interior Décor",
            description: "Complete space transformation and styling solutions",
            color: "#1a1a1a"
        },
        {
            id: 3,
            title: "Customized Furniture",
            description: "Bespoke furniture solutions tailored to your needs",
            color: "#a80000"
        },
        {
            id: 4,
            title: "Eco-Friendly Products",
            description: "Sustainable materials and green design practices",
            color: "#1a1a1a"
        }
    ];

    // Hero title with keywords
    const heroTitle = "Creative Interior Solutions for Residential and Commercial Spaces. Art & Décor with a Unique Souvenir Collection.";

    // Keywords for highlighting
    const keywords = ['Creative', 'Interior', 'Solutions', 'Residential', 'Commercial', 'Art', 'Décor', 'Unique', 'Souvenir'];
    const largeKeywords = ['Creative', 'Interior', 'Solutions', 'Commercial', 'Unique', 'Souvenir'];

    // Calculate keyword positions
    const calculateKeywordPositions = useCallback(() => {
        if (!heroTitleRef.current) return;
        
        const titleElement = heroTitleRef.current;
        const words = heroTitle.split(' ');
        let positions = [];
        let currentPosition = 0;
        
        words.forEach((word, index) => {
            const cleanWord = word.replace(/[.,]/g, '');
            if (keywords.includes(cleanWord)) {
                // Find the span element for this keyword
                const keywordSpans = titleElement.querySelectorAll('.keyword');
                const keywordIndex = Array.from(keywordSpans).findIndex(span => 
                    span.textContent.replace(/\s+/g, ' ').trim() === word
                );
                
                if (keywordIndex !== -1) {
                    const span = keywordSpans[keywordIndex];
                    const rect = span.getBoundingClientRect();
                    const titleRect = titleElement.getBoundingClientRect();
                    
                    positions.push({
                        left: rect.left - titleRect.left,
                        top: rect.top - titleRect.top,
                        width: rect.width,
                        height: rect.height,
                        index: positions.length,
                        word: cleanWord
                    });
                }
            }
        });
        
        setKeywordPositions(positions);
    }, [heroTitle, keywords]);

    useEffect(() => {
        calculateKeywordPositions();
        
        // Recalculate on resize
        window.addEventListener('resize', calculateKeywordPositions);
        
        const ctx = gsap.context(() => {
            // Title reveal animation
            const titleSpans = document.querySelectorAll('.title-part');
            gsap.from(titleSpans, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                delay: 0.3
            });

            // Animate gray shapes for keywords
            const grayShapes = document.querySelectorAll('.keyword-base-shape');
            gsap.from(grayShapes, {
                scaleX: 0,
                duration: 0.8,
                delay: 0.5,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Button hover effects setup
            const buttons = document.querySelectorAll('.hero-btn');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn.querySelector('.btn-text'), {
                        y: -3,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn.querySelector('.btn-text'), {
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Services section reveal animation
            gsap.from('.services-showcase', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.services-showcase',
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                    markers: false
                }
            });

            // Featured section animation
            gsap.from('.featured-card', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.featured-section',
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                    markers: false
                }
            });

            // CTA section animation
            gsap.from('.cta-title', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1,
                    markers: false
                }
            });

        }, root);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', calculateKeywordPositions);
        };
    }, [calculateKeywordPositions]);

    const handleKeywordHover = (index, isEntering) => {
        const hoverShape = document.querySelector('.keyword-hover-shape');
        
        if (isEntering && keywordPositions[index]) {
            setHoveredKeywordIndex(index);
            
            const position = keywordPositions[index];
            if (hoverShape) {
                gsap.to(hoverShape, {
                    left: position.left,
                    top: position.top,
                    width: position.width,
                    height: position.height,
                    opacity: 0.25,
                    scaleX: 0.95,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        } else {
            setHoveredKeywordIndex(null);
            if (hoverShape) {
                gsap.to(hoverShape, {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }
    };

    const handleButtonClick = (e, link, type) => {
        e.preventDefault();
        if (isAnimating) return;
        
        setIsAnimating(true);
        const button = e.currentTarget;
        
        // Button press animation
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });

        // Create particles
        const color = type === 'quote' ? '#a80000' : '#1a1a1a';
        for(let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'button-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                opacity: 0.8;
            `;
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: gsap.utils.random(-20, 20),
                y: gsap.utils.random(-20, 20),
                opacity: 0,
                scale: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }

        // Navigate after animation
        setTimeout(() => {
            navigate(link);
            setIsAnimating(false);
        }, 500);
    };

    const handleServiceHover = (service, index, isHovering) => {
        const serviceElement = servicesRef.current[index];
        if (!serviceElement) return;

        if (isHovering) {
            setHoveredService(service);
            
            // Get text wrapper
            const textWrapper = serviceElement.querySelector('.service-text-wrapper');
            if (textWrapper) {
                // Remove any existing highlights
                const existingHighlight = textWrapper.querySelector('.text-highlight-oval');
                if (existingHighlight) existingHighlight.remove();
                
                // Get text dimensions
                const textRect = textWrapper.getBoundingClientRect();
                const textWidth = textRect.width;
                const textHeight = textRect.height;
                
                // Create oval highlight with animated entry
                const highlight = document.createElement('div');
                highlight.className = 'text-highlight-oval';
                highlight.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(0deg);
                    width: ${textWidth + 60}px;
                    height: ${textHeight + 40}px;
                    background: ${service.color === '#a80000' ? 'rgba(168, 0, 0, 0.05)' : 'rgba(26, 26, 26, 0.03)'};
                    border: 1.5px solid ${service.color === '#a80000' ? 'rgba(168, 0, 0, 0.15)' : 'rgba(26, 26, 26, 0.1)'};
                    border-radius: 100px;
                    pointer-events: none;
                    z-index: -1;
                    opacity: 0;
                    transform-origin: center;
                `;
                textWrapper.appendChild(highlight);
                
                // Animate oval in with rotation and scaling
                gsap.fromTo(highlight, 
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotate: -10
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 0.4,
                        ease: "back.out(1.2)",
                        onComplete: () => {
                            // Continuous subtle animation
                            gsap.to(highlight, {
                                rotate: 2,
                                duration: 2,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut"
                            });
                            
                            // Pulse animation for border
                            gsap.to(highlight, {
                                borderWidth: '2.5px',
                                borderColor: service.color === '#a80000' ? 'rgba(168, 0, 0, 0.25)' : 'rgba(26, 26, 26, 0.15)',
                                duration: 1.5,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut"
                            });
                        }
                    }
                );
            }
        } else {
            setHoveredService(null);
            
            const serviceElement = servicesRef.current[index];
            if (serviceElement) {
                const textWrapper = serviceElement.querySelector('.service-text-wrapper');
                if (textWrapper) {
                    // Animate oval out
                    const highlight = textWrapper.querySelector('.text-highlight-oval');
                    if (highlight) {
                        gsap.to(highlight, {
                            opacity: 0,
                            scale: 0.9,
                            rotate: 5,
                            duration: 0.3,
                            ease: "power2.out",
                            onComplete: () => highlight.remove()
                        });
                    }
                }
            }
        }
    };

    const handleServiceClick = (service, e) => {
        e.preventDefault();
        
        // Navigate to services page
        setTimeout(() => {
            navigate('/services');
        }, 100);
    };

    // Function to render title with keyword highlights
    const renderTitle = () => {
        const words = heroTitle.split(' ');
        let keywordIndex = 0;
        
        return words.map((word, index) => {
            const cleanWord = word.replace(/[.,]/g, '');
            const isKeyword = keywords.includes(cleanWord);
            const isLarge = largeKeywords.includes(cleanWord);
            
            if (isKeyword) {
                const currentIndex = keywordIndex;
                keywordIndex++;
                
                return (
                    <span 
                        key={index} 
                        className={`keyword ${isLarge ? 'keyword-large' : 'keyword-small'}`}
                        onMouseEnter={() => handleKeywordHover(currentIndex, true)}
                        onMouseLeave={() => handleKeywordHover(currentIndex, false)}
                    >
                        {word}{' '}
                    </span>
                );
            }
            return <span key={index} className="title-part">{word} </span>;
        });
    };

    return (
        <div ref={root} className="pablo-minimal">
            {/* Simple background with minimal elements */}
            <div className="hero-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <Nav />
            
            {/* HERO SECTION - Only Title and Buttons */}
            <section className="hero-section" ref={heroRef}>
                <div className="container">
                    <div className="hero-content">
                        {/* Hero Title with Keyword Highlights */}
                        <h1 className="hero-title" ref={heroTitleRef}>
                            {renderTitle()}
                            
                            {/* Keyword shapes container */}
                            <div className="keyword-shapes-container">
                                {/* Gray shapes for all keywords */}
                                {keywordPositions.map((pos, index) => (
                                    <div 
                                        key={`gray-${index}`}
                                        className="keyword-base-shape"
                                        style={{
                                            left: `${pos.left}px`,
                                            top: `${pos.top}px`,
                                            width: `${pos.width}px`,
                                            height: `${pos.height}px`
                                        }}
                                    />
                                ))}
                                
                                {/* Single red hover shape */}
                                <div className="keyword-hover-shape" />
                            </div>
                        </h1>
                        
                        {/* Call-to-action Buttons */}
                        <div className="hero-actions">
                            <div className="button-group">
                                <Link 
                                    to="/services" 
                                    className="hero-btn view-services-btn"
                                    onClick={(e) => handleButtonClick(e, '/services', 'services')}
                                >
                                    <span className="btn-text">View Services</span>
                                    <div className="btn-line"></div>
                                </Link>
                                
                                <div className="button-separator">|</div>
                                
                                <Link 
                                    to="/quote" 
                                    className="hero-btn get-quote-btn"
                                    onClick={(e) => handleButtonClick(e, '/quote', 'quote')}
                                >
                                    <span className="btn-text">Get a Quote</span>
                                    <div className="btn-line red-line"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SHOWCASE SECTION - SEPARATE SECTION */}
            <section className="services-showcase">
                <div className="container">
                    <div className="services-content">
                        {/* Left side: Explanation */}
                        <div className="services-explanation">
                            <div className="explanation-header">
                                <h2 className="explanation-title">
                                    Our Creative <span className="highlight-red">Services</span>
                                </h2>
                                <div className="explanation-underline"></div>
                            </div>
                            
                            <div className="explanation-body">
                                <p className="explanation-text">
                                    We offer comprehensive interior design and decor solutions that transform 
                                    spaces into personalized expressions of style and functionality. 
                                    From concept to completion, our team ensures every detail reflects 
                                    your vision and exceeds expectations.
                                </p>
                                
                                <div className="explanation-features">
                                    <div className="feature-item">
                                        <div className="feature-icon">✓</div>
                                        <span>Custom Design Solutions</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon">✓</div>
                                        <span>Premium Quality Materials</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon">✓</div>
                                        <span>Expert Craftsmanship</span>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon">✓</div>
                                        <span>Sustainable Practices</span>
                                    </div>
                                </div>
                                
                                <div className="explanation-cta">
                                    <Link 
                                        to="/services" 
                                        className="explanation-btn"
                                        onClick={(e) => handleButtonClick(e, '/services', 'services')}
                                    >
                                        <span>Explore All Services</span>
                                        <div className="explanation-arrow">→</div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Services List */}
                        <div className="services-list-vertical">
                            <div className="services-list-container">
                                {mainServices.map((service, index) => (
                                    <div
                                        key={service.id}
                                        ref={el => servicesRef.current[index] = el}
                                        className="service-item-vertical"
                                        onMouseEnter={() => handleServiceHover(service, index, true)}
                                        onMouseLeave={() => handleServiceHover(service, index, false)}
                                        onClick={(e) => handleServiceClick(service, e)}
                                    >
                                        <div className="service-text-wrapper">
                                            <h4 
                                                className="service-title-vertical"
                                                style={{ color: service.color }}
                                            >
                                                {service.title}
                                            </h4>
                                            <p className="service-description-vertical">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED WORK SECTION */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="title-accent">//</span> Featured Projects
                        </h2>
                        <p className="section-subtitle">
                            Explore our recent interior design and decor projects
                        </p>
                    </div>
                    
                    <div className="featured-grid">
                        <div className="featured-card">
                            <div className="card-image"></div>
                            <div className="card-content">
                                <h3>Residential Mural Design</h3>
                                <p>Custom wall art for modern living space</p>
                                <div className="card-line"></div>
                            </div>
                        </div>
                        
                        <div className="featured-card">
                            <div className="card-image"></div>
                            <div className="card-content">
                                <h3>Office Interior</h3>
                                <p>Commercial workspace transformation</p>
                                <div className="card-line red"></div>
                            </div>
                        </div>
                        
                        <div className="featured-card">
                            <div className="card-image"></div>
                            <div className="card-content">
                                <h3>Custom Furniture</h3>
                                <p>Bespoke pieces for luxury residence</p>
                                <div className="card-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PABLO BUSINESSES SECTION */}
            <section className="business-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="title-accent">//</span> Pablo Businesses
                        </h2>
                        <p className="section-subtitle">
                            Explore our different business ventures under the Pablo umbrella
                        </p>
                    </div>
                    
                    <div className="business-container">
                        <div className="business-row">
                            <div className="business-card expanded-default" style={{ borderColor: '#a80000', color: '#a80000' }}>
                                <div className="business-expanded-content">
                                    <div className="business-header">
                                        <h3 className="business-title-horizontal">PABLO STUDIO</h3>
                                        <p className="business-subtitle">Creative Design & Decor Studio</p>
                                        <div className="business-divider" style={{ background: '#a80000' }}></div>
                                    </div>
                                    <div className="business-body">
                                        <div className="business-description">
                                            <p>
                                                Pablo Studio specializes in bespoke interior design solutions, 
                                                transforming spaces with custom furniture, wall decor, and 
                                                complete interior transformations.
                                            </p>
                                        </div>
                                        <div className="business-features">
                                            <h4>Specialties</h4>
                                            <ul>
                                                <li><span className="business-feature-icon">●</span> Custom Furniture Design</li>
                                                <li><span className="business-feature-icon">●</span> Wall Murals & Decor</li>
                                                <li><span className="business-feature-icon">●</span> Complete Interior Makeovers</li>
                                                <li><span className="business-feature-icon">●</span> Sustainable Materials</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="business-cta">
                                        <button className="business-button" style={{ borderColor: '#a80000', color: '#a80000' }}>
                                            Explore Studio
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="business-card" style={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}>
                                <div className="business-vertical-text">PABLO<br />RETAIL</div>
                            </div>
                            
                            <div className="business-card" style={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}>
                                <div className="business-vertical-text">PABLO<br />COMMERCIAL</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">
                            Ready to transform your space?
                        </h2>
                        <p className="cta-description">
                            Contact us for a personalized consultation and quote
                        </p>
                        
                        <div className="cta-actions">
                            <Link 
                                to="/contact" 
                                className="cta-btn"
                                onClick={(e) => handleButtonClick(e, '/contact', 'contact')}
                            >
                                <span>Contact Us</span>
                                <div className="cta-line"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Home;