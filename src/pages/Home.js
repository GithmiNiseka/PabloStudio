// src/pages/Home.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Home.css';
import OwnerSignature from '../components/OwnerSignature.jsx';

// Import image
import bg1 from './assets/bg1.jpeg';

const Home = () => {
    const servicesRef = useRef([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);
    const navigate = useNavigate();

    // Refs for animation
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const imageRef = useRef(null);

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

    // Hero description as paragraph - 4 lines
    const heroDescription = `We transform spaces with bespoke interior design solutions. Custom furniture, wall decor, and complete makeovers for residential and commercial projects. Sustainable materials and expert craftsmanship. Your vision, our creation.`;

    useEffect(() => {
        // Slide up animation on page load
        const elements = [
            titleRef.current,
            descriptionRef.current,
            buttonsRef.current,
            imageRef.current
        ];

        // Set initial position (hidden below)
        gsap.set(elements, {
            y: 50,
            opacity: 0
        });

        // Animate each element with delay
        gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.3
        });
    }, []);

    const handleButtonClick = (e, link, type) => {
        e.preventDefault();
        if (isAnimating) return;
        
        setIsAnimating(true);

        // Navigate after short delay
        setTimeout(() => {
            navigate(link);
            setIsAnimating(false);
        }, 100);
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
                
                // Create oval highlight
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
                    opacity: 1;
                    transform-origin: center;
                `;
                textWrapper.appendChild(highlight);
            }
        } else {
            setHoveredService(null);
            
            const serviceElement = servicesRef.current[index];
            if (serviceElement) {
                const textWrapper = serviceElement.querySelector('.service-text-wrapper');
                if (textWrapper) {
                    // Remove highlight
                    const highlight = textWrapper.querySelector('.text-highlight-oval');
                    if (highlight) {
                        highlight.remove();
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

    return (
        <div className="pablo-minimal">
            {/* Simple background with minimal elements */}
            <div className="hero-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <Nav />
            <OwnerSignature />

  {/* UPDATED HERO SECTION - CORRECT LAYOUT */}
<section className="hero-section">
    <div className="container">
        <div className="hero-content">
            {/* Title and Description Row */}
            <div className="hero-title-row">
                {/* Left: PABLO studio and Get Quote button */}
                <div className="hero-pablo-container">
                    <h1 className="hero-title" ref={titleRef}>
                        <span className="hero-pablo">
                            <span className="pablo-letter">P</span>
                            <span className="pablo-letter">A</span>
                            <span className="pablo-letter">B</span>
                            <span className="pablo-letter">L</span>
                            <span className="pablo-letter">O</span>
                        </span>
                        <span className="hero-studio">studio</span>
                    </h1>
                    
                    {/* Get Quote Button - Below PABLO, aligned with P */}
                    <div className="get-quote-left">
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
                
                {/* Right: Description and View Services button */}
                <div className="hero-description-container">
                    <p className="hero-description" ref={descriptionRef}>
                        {heroDescription}
                    </p>
                    
                    {/* View Services Button - Below description, right aligned */}
                    <div className="view-services-right">
                        <Link 
                            to="/services" 
                            className="hero-btn view-services-btn"
                            onClick={(e) => handleButtonClick(e, '/services', 'services')}
                        >
                            <span className="btn-text">View Services</span>
                            <div className="btn-line"></div>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Image Section - Below everything */}
            <div className="hero-image-section">
                <div className="hero-image-container" ref={imageRef}>
                    <img 
                        src={bg1} 
                        alt="Pablo Studio Interior Design" 
                        className="hero-image"
                    />
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