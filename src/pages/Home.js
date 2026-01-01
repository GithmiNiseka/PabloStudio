// src/pages/Home.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Home.css';
import OwnerSignature from '../components/OwnerSignature.jsx';

// Import all images
import wel1 from './assets/wel1.jpeg';
import wel2 from './assets/wel2.jpeg';
import wel3 from './assets/wel3.jpeg';
import wel4 from './assets/wel4.jpeg';
import wel5 from './assets/wel5.jpeg';
import wel6 from './assets/wel6.jpeg';
import wel7 from './assets/wel7.jpeg';
import wel8 from './assets/wel8.jpeg';
import wel9 from './assets/wel9.jpeg';
import wel10 from './assets/wel10.jpeg';
import wel11 from './assets/wel11.jpeg';
import wel12 from './assets/wel12.jpeg';
import wel13 from './assets/wel13.jpeg';
import wel14 from './assets/wel14.jpeg';
import wel15 from './assets/wel15.jpeg';

const Home = () => {
    const servicesRef = useRef([]);
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    const gridContainerRef = useRef(null);
    const contentContainerRef = useRef(null);
    const pageContentRef = useRef(null);

    const mainServices = [
        {
            id: 1,
            title: "Large Scale Wall Decor",
            description: "Custom murals and oversized installations for transformative spaces",
            color: "#ff4d4d"
        },
        {
            id: 2,
            title: "Interior Décor",
            description: "Complete space transformation and styling solutions",
            color: "#ffffff"
        },
        {
            id: 3,
            title: "Customized Furniture",
            description: "Bespoke furniture solutions tailored to your needs",
            color: "#ff4d4d"
        },
        {
            id: 4,
            title: "Eco-Friendly Products",
            description: "Sustainable materials and green design practices",
            color: "#ffffff"
        }
    ];

    const heroDescription = `We transform spaces with bespoke interior design solutions. Custom furniture, wall decor, and complete makeovers for residential and commercial projects. Sustainable materials and expert craftsmanship. Your vision, our creation.`;

    // All images in an array
    const allImages = [wel1, wel2, wel3, wel4, wel5, wel6, wel7, wel8, wel9, wel10, wel11, wel12, wel13, wel14, wel15];

    useEffect(() => {
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';
        
        // Set initial state
        if (pageContentRef.current) {
            gsap.set(pageContentRef.current, { opacity: 0, y: 50 });
        }
        if (contentContainerRef.current) {
            gsap.set(contentContainerRef.current, { opacity: 0 });
        }
        
        // Set initial state for hero elements
        gsap.set(".pablo-letter", { y: 40, opacity: 0 });
        gsap.set(".hero-studio", { y: 20, opacity: 0 });
        gsap.set(".hero-description", { y: 40, opacity: 0 });
        gsap.set(".get-quote-left", { y: 30, opacity: 0 });
        gsap.set(".view-services-right", { y: 30, opacity: 0 });
        
        // Create grid images immediately
        const gridContainer = gridContainerRef.current;
        if (!gridContainer) return;

        // Clear container
        gridContainer.innerHTML = '';

        // Create all 15 image elements
        allImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'grid-image';
            img.alt = `Craft ${index + 1}`;
            img.style.opacity = '0';
            gridContainer.appendChild(img);
        });

        // Start animation after a short delay
        setTimeout(() => {
            animateGridImages();
        }, 300);
    }, []);

    const animateGridImages = () => {
        const images = document.querySelectorAll('.grid-image');
        if (images.length === 0) return;

        // Grid configuration
        const cols = 5;
        const rows = 3;
        const imgWidth = 130;
        const imgHeight = 170;
        const gap = 15;

        // Get hero section dimensions
        const heroSection = document.querySelector('.hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        
        // Position grid higher up (30% from top)
        const heroCenterY = heroRect.height * 0.25;
        
        // Total grid dimensions
        const totalWidth = (cols * imgWidth) + ((cols - 1) * gap);
        const totalHeight = (rows * imgHeight) + ((rows - 1) * gap);
        
        // Center position within hero section
        const startX = (heroRect.width - totalWidth) / 2;
        const startY = heroCenterY - (totalHeight / 2);

        // Create main timeline
        const tl = gsap.timeline();

        // STEP 1: Images fly in from edges and form grid
        images.forEach((img, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            
            // Calculate final grid position
            const finalX = startX + (col * (imgWidth + gap)) + (imgWidth / 2);
            const finalY = startY + (row * (imgHeight + gap)) + (imgHeight / 2);
            
            // Start from different edges of screen
            let startXPos, startYPos, rotation;
            const direction = index % 4;
            
            switch(direction) {
                case 0: // Left
                    startXPos = -200;
                    startYPos = finalY + (Math.random() * 100 - 50);
                    rotation = -20;
                    break;
                case 1: // Right
                    startXPos = window.innerWidth + 200;
                    startYPos = finalY + (Math.random() * 100 - 50);
                    rotation = 20;
                    break;
                case 2: // Top
                    startXPos = finalX + (Math.random() * 100 - 50);
                    startYPos = -200;
                    rotation = -10;
                    break;
                case 3: // Bottom
                    startXPos = finalX + (Math.random() * 100 - 50);
                    startYPos = heroRect.height + 200;
                    rotation = 10;
                    break;
            }

            // Set initial position
            gsap.set(img, {
                x: startXPos,
                y: startYPos,
                rotation: rotation,
                scale: 1.3,
                opacity: 0,
                zIndex: 10
            });

            // Animate to grid position
            tl.to(img, {
                x: finalX,
                y: finalY,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "back.out(1.7)",
                delay: index * 0.04
            }, 0);
        });

        // Pause after grid formation
        tl.to({}, { duration: 0.8 });

        // STEP 2: Start fading in hero container (starts WHILE images are still in grid)
        tl.to(contentContainerRef.current, {
            opacity: 1,
            duration: 0.8,
            onStart: () => {
                setShowContent(true);
            }
        }, "-=0.5"); // Start 0.5s before images start disappearing

        // STEP 3: Images scatter to background positions (1.2s duration)
        images.forEach((img, index) => {
            // Random positions for background
            const bgX = Math.random() * heroRect.width;
            const bgY = Math.random() * (heroRect.height * 0.8);
            const scale = 0.15 + (Math.random() * 0.1);
            const rotation = -20 + (Math.random() * 40);
            
            // Animate to background position with reduced opacity
            tl.to(img, {
                x: bgX,
                y: bgY,
                scale: scale,
                rotation: rotation,
                opacity: 0.08, // Low opacity
                duration: 1.2, // Good speed - not too fast, not too slow
                ease: "power2.out",
                onStart: () => {
                    img.style.zIndex = '1';
                }
            }, "scatter-start");
        });

        // STEP 4: Start animating content WHILE images are disappearing
        
        // First: Animate PABLO letters (starts 0.3s after images start disappearing)
        tl.fromTo(".pablo-letter", 
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15, // Each letter appears with slight delay
                ease: "power3.out"
            }, "scatter-start+=0.3");

        // Second: Animate "studio" text (starts after PABLO letters start)
        tl.to(".hero-studio", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "scatter-start+=0.6");

        // Third: Animate description (starts after studio appears)
        tl.to(".hero-description", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "scatter-start+=0.9");

        // Fourth: Animate buttons (starts after description appears)
        tl.to([".get-quote-left", ".view-services-right"], {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
                // After all hero content is shown, show page content
                setTimeout(() => {
                    setAnimationComplete(true);
                    showPageContent();
                }, 500);
            }
        }, "scatter-start+=1.2");
    };

    const showPageContent = () => {
        // Enable scrolling after animation
        document.body.style.overflow = 'auto';
        
        // Fade in page content with slide up
        if (pageContentRef.current) {
            gsap.to(pageContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    };

    const handleButtonClick = (e, link) => {
        e.preventDefault();
        navigate(link);
    };

    return (
        <div className="pablo-dark-theme">
            {/* Hero Section with Grid Animation */}
            <section className="hero-section">
                {/* Grid Container - Images will animate here */}
                <div className="grid-container" ref={gridContainerRef}></div>
                
                {/* Hero Content Container */}
                <div className={`content-container ${showContent ? 'visible' : ''}`} ref={contentContainerRef}>
                    <Nav />
                    <OwnerSignature />
                    
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-title-row">
                                <div className="hero-pablo-container">
                                    <h1 className="hero-title">
                                        <span className="hero-pablo">
                                            <span className="pablo-letter red-p">P</span>
                                            <span className="pablo-letter">A</span>
                                            <span className="pablo-letter">B</span>
                                            <span className="pablo-letter">L</span>
                                            <span className="pablo-letter">O</span>
                                        </span>
                                        <span className="hero-studio">studio</span>
                                    </h1>
                                    
                                    <div className="get-quote-left">
                                        <Link 
                                            to="/quote" 
                                            className="hero-btn get-quote-btn"
                                            onClick={(e) => handleButtonClick(e, '/quote')}
                                        >
                                            <span className="btn-text">Get a Quote</span>
                                            <div className="btn-line red-line"></div>
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className="hero-description-container">
                                    <p className="hero-description">
                                        {heroDescription}
                                    </p>
                                    
                                    <div className="view-services-right">
                                        <Link 
                                            to="/services" 
                                            className="hero-btn view-services-btn"
                                            onClick={(e) => handleButtonClick(e, '/services')}
                                        >
                                            <span className="btn-text">View Services</span>
                                            <div className="btn-line"></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Page Content - Initially hidden */}
            {animationComplete && (
                <div className="page-content-wrapper" ref={pageContentRef}>
                    {/* Services Section */}
                    <section className="services-showcase">
                        <div className="container">
                            <div className="services-content">
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
                                                onClick={(e) => handleButtonClick(e, '/services')}
                                            >
                                                <span>Explore All Services</span>
                                                <div className="explanation-arrow">→</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="services-list-vertical">
                                    <div className="services-list-container">
                                        {mainServices.map((service, index) => (
                                            <div
                                                key={service.id}
                                                ref={el => servicesRef.current[index] = el}
                                                className="service-item-vertical"
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                    e.currentTarget.style.transform = 'translateX(10px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '';
                                                    e.currentTarget.style.transform = '';
                                                }}
                                                onClick={() => navigate('/services')}
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

                    {/* Footer */}
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Home;