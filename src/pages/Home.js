// src/pages/Home.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import projects from '../data/projects';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const root = useRef();
    const heroRef = useRef();
    const [loadedProjects, setLoadedProjects] = useState([]);

    useEffect(() => {
        // Load projects
        try {
            setLoadedProjects(projects.slice(0, 4));
        } catch (error) {
            console.error('Error loading projects:', error);
            setLoadedProjects([]);
        }
    }, []);

    useEffect(() => {
        // GSAP Animations
        const ctx = gsap.context(() => {
            // Hero text line-by-line animation on load
            const heroLines = gsap.utils.toArray('.hero-line');
            
            heroLines.forEach((line, i) => {
                gsap.from(line, {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    delay: i * 0.3,
                    ease: "power3.out"
                });
            });

            // Hero links animation
            const heroLinks = gsap.utils.toArray('.hero-inline-link');
            heroLinks.forEach((link, i) => {
                gsap.from(link, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    delay: 1.2 + (i * 0.1),
                    ease: "power3.out"
                });
            });

            // Hero section scroll animation
            const heroSection = document.querySelector('.hero-section');
            const skillsSection = document.querySelector('.skills-section');
            const skillsHeader = document.querySelector('.skills-section .section-header');
            const skillsContent = document.querySelector('.skills-section .section-content');

            if (heroSection && skillsSection && skillsHeader && skillsContent) {
                // Hero fade out animation
                gsap.to('.hero-content', {
                    y: -100,
                    opacity: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".hero-section",
                        start: "top top",
                        end: "+=500",
                        scrub: 1,
                        pin: false,
                        markers: false
                    }
                });

                // Skills header animation - appears as hero disappears
                gsap.fromTo(skillsHeader,
                    {
                        y: 200,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                        duration: 1,
                        scrollTrigger: {
                            trigger: ".skills-section",
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1,
                            markers: false
                        }
                    }
                );

                // Skills content animation
                const skillItems = gsap.utils.toArray('.skill-item');
                skillItems.forEach((item, i) => {
                    gsap.from(item, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            end: "top 70%",
                            toggleActions: "play none none none",
                            markers: false
                        }
                    });
                });

                // Make skills header sticky
                ScrollTrigger.create({
                    trigger: ".skills-section",
                    start: "top 30%",
                    end: "bottom 30%",
                    pin: skillsHeader,
                    pinSpacing: false,
                    scrub: 1,
                    markers: false
                });
            }

            // Projects section animation
            const projectCards = gsap.utils.toArray('.project-card');
            projectCards.forEach((card, index) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        markers: false
                    }
                });
            });

            // Projects header sticky
            const projectsHeader = document.querySelector('.projects-section .section-header');
            if (projectsHeader) {
                ScrollTrigger.create({
                    trigger: ".projects-section",
                    start: "top 30%",
                    end: "bottom 30%",
                    pin: projectsHeader,
                    pinSpacing: false,
                    scrub: 1,
                    markers: false
                });
            }

            // CTA section animation
            gsap.from('.cta-content', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                    markers: false
                }
            });

            // Floating animation for scroll indicator
            gsap.to('.scroll-line', {
                y: 10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="homepage-minimal">
            <Nav />
            
            {/* HERO SECTION */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text-container">
                            <h1 className="hero-title">
                                <div className="hero-line">Creative Interior Art</div>
                                <div className="hero-line">& Eco-Friendly Designs</div>
                                <div className="hero-line">
                                    for Homes and Businesses.
                                    <div className="hero-inline-links">
                                        <Link to="/services" className="hero-inline-link">View Services</Link>
                                        <Link to="/contact" className="hero-inline-link">Get a Quote</Link>
                                    </div>
                                </div>
                            </h1>
                        </div>
                    </div>
                    
                    <div className="scroll-indicator">
                        <div className="scroll-line"></div>
                        <span>Scroll</span>
                    </div>
                </div>
            </section>
            
            {/* SKILLS SECTION - STICKY TITLE */}
            <section className="sticky-section skills-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Expertise</h2>
                        <p className="section-subtitle">Specialized services tailored to your space</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="skills-grid-minimal">
                            <div className="skill-item">
                                <div className="skill-number">01</div>
                                <div className="skill-content">
                                    <h3>Hand-painted Murals</h3>
                                    <p>Custom wall art with artistic precision</p>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-number">02</div>
                                <div className="skill-content">
                                    <h3>Healthcare Spaces</h3>
                                    <p>Therapeutic designs for healing environments</p>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-number">03</div>
                                <div className="skill-content">
                                    <h3>Eco-friendly Materials</h3>
                                    <p>Sustainable, non-toxic solutions</p>
                                </div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-number">04</div>
                                <div className="skill-content">
                                    <h3>Custom Illustrations</h3>
                                    <p>Personalized artwork for any space</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION - STICKY TITLE */}
            <section className="sticky-section projects-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Selected Works</h2>
                        <p className="section-subtitle">Transforming spaces through art</p>
                    </div>
                    
                    <div className="section-content">
                        <div className="projects-grid-minimal">
                            {loadedProjects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <Link to={`/projects/${project.slug}`} className="project-link">
                                        <div className="project-image-container">
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                className="project-image"
                                            />
                                            <div className="project-overlay">
                                                <span className="view-project">View Project →</span>
                                            </div>
                                        </div>
                                        <div className="project-info">
                                            <div className="project-meta">
                                                <span className="project-category">{project.category}</span>
                                                <span className="project-year">{project.year}</span>
                                            </div>
                                            <h3 className="project-title">{project.title}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        
                        <div className="view-all-container">
                            <Link to="/portfolio" className="view-all-link">
                                <span>View All Projects</span>
                                <span className="arrow">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="content-wrapper">
                    <div className="cta-content">
                        <h2 className="cta-title">
                            Ready to transform your space?
                        </h2>
                        <p className="cta-subtitle">
                            Let's create something extraordinary together
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="cta-link primary">
                                Start a Project
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

export default Home;