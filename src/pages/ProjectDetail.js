// src/pages/ProjectDetail.jsx
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
    const { slug } = useParams();
    const root = useRef();
    const imageRefs = useRef([]);

    // Mock project data - in real app, fetch from API
    const project = {
        id: 1,
        slug: 'pediatric-ward',
        title: 'Colombo Children\'s Hospital Pediatric Ward',
        category: 'Healthcare',
        year: '2023',
        location: 'Colombo, Sri Lanka',
        duration: '4 weeks',
        client: 'Colombo Children\'s Hospital',
        description: 'A therapeutic environment designed to reduce anxiety and promote healing through art therapy principles.',
        fullDescription: `
            This project transformed the pediatric ward into a healing environment through carefully 
            designed murals and interactive elements. The design incorporates nature themes, 
            educational elements, and calming colors to create a space that reduces patient anxiety 
            and promotes recovery.
            
            Key features include:
            • Interactive wall elements that children can engage with
            • Nature-inspired themes to bring the outdoors inside
            • Educational content disguised as play
            • Calming color palette based on color psychology research
            • Durable, easy-to-clean materials suitable for healthcare environments
        `,
        challenges: 'Limited installation time, strict hygiene requirements, need for child-safe materials',
        solution: 'Modular panel system with hospital-grade finishes, installed during off-hours',
        results: '30% reduction in reported patient anxiety, positive feedback from staff and families',
        images: [
            { url: '/api/placeholder/1200/800', caption: 'Main ward mural' },
            { url: '/api/placeholder/1200/800', caption: 'Interactive wall detail' },
            { url: '/api/placeholder/1200/800', caption: 'Waiting area transformation' },
            { url: '/api/placeholder/1200/800', caption: 'Corridor with educational elements' }
        ],
        tags: ['Healthcare', 'Pediatric', 'Mural', 'Therapeutic Design', 'Hospital Art'],
        materials: ['Hospital-grade paint', 'VOC-free coatings', 'Washable surfaces', 'Modular panels'],
        team: ['Lead Artist: Pablo Fernando', 'Design Director: Anjali Perera', 'Project Manager: Rajiv Silva'],
        testimonials: [
            {
                quote: 'The transformation has made a significant difference in our young patients\' experience.',
                author: 'Dr. Samantha Perera',
                role: 'Head Pediatrician',
                hospital: 'Colombo Children\'s Hospital'
            }
        ],
        similarProjects: [
            { slug: 'kandy-hospital', title: 'Kandy General Hospital', category: 'Healthcare' },
            { slug: 'private-clinic', title: 'Colombo Private Clinic', category: 'Healthcare' },
            { slug: 'corporate-lobby', title: 'Tech Hub Lobby Art', category: 'Corporate' }
        ]
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax effect for hero image
            gsap.to('.project-hero-image', {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.project-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Stagger image reveals
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.from(ref, {
                        scrollTrigger: {
                            trigger: ref,
                            start: 'top 85%',
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        delay: index * 0.2,
                        ease: 'power2.out'
                    });
                }
            });

            // Animate project info sections
            gsap.from('.project-info-section', {
                scrollTrigger: {
                    trigger: '.project-details',
                    start: 'top 70%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out'
            });

        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={root} className="project-detail-page">
            <Nav />
            
            {/* HERO */}
            <section className="project-hero">
                <div className="project-hero-image">
                    <img src={project.images[0].url} alt={project.title} />
                </div>
                <div className="project-hero-content">
                    <div className="content-wrapper">
                        <div className="project-meta-top">
                            <span className="project-category">{project.category}</span>
                            <span className="project-year">{project.year}</span>
                        </div>
                        <h1 className="project-title">{project.title}</h1>
                        <p className="project-location">{project.location}</p>
                    </div>
                </div>
            </section>

            {/* QUICK INFO */}
            <section className="project-quick-info">
                <div className="content-wrapper">
                    <div className="info-grid">
                        <div className="info-item">
                            <h4>Client</h4>
                            <p>{project.client}</p>
                        </div>
                        <div className="info-item">
                            <h4>Duration</h4>
                            <p>{project.duration}</p>
                        </div>
                        <div className="info-item">
                            <h4>Scope</h4>
                            <p>Full ward transformation</p>
                        </div>
                        <div className="info-item">
                            <h4>Services</h4>
                            <p>Murals, Interactive Walls, Environmental Graphics</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT DESCRIPTION */}
            <section className="project-description-section">
                <div className="content-wrapper">
                    <div className="description-grid">
                        <div className="description-main">
                            <h2>Project Overview</h2>
                            <p>{project.fullDescription}</p>
                        </div>
                        <div className="description-side">
                            <div className="tags-container">
                                <h4>Tags</h4>
                                <div className="tags-list">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="materials-container">
                                <h4>Materials Used</h4>
                                <ul className="materials-list">
                                    {project.materials.map((material, index) => (
                                        <li key={index}>{material}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT IMAGES */}
            <section className="project-gallery">
                <div className="content-wrapper">
                    {project.images.slice(1).map((image, index) => (
                        <div 
                            key={index}
                            ref={el => imageRefs.current[index] = el}
                            className="project-image-container"
                        >
                            <img src={image.url} alt={image.caption} />
                            {image.caption && <p className="image-caption">{image.caption}</p>}
                        </div>
                    ))}
                </div>
            </section>

            {/* PROJECT DETAILS */}
            <section className="project-details">
                <div className="content-wrapper">
                    <div className="details-grid">
                        <div className="project-info-section">
                            <h3>Challenge</h3>
                            <p>{project.challenges}</p>
                        </div>
                        <div className="project-info-section">
                            <h3>Solution</h3>
                            <p>{project.solution}</p>
                        </div>
                        <div className="project-info-section">
                            <h3>Results</h3>
                            <p>{project.results}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="project-testimonial">
                <div className="content-wrapper">
                    <blockquote className="testimonial-quote">
                        "{project.testimonials[0].quote}"
                    </blockquote>
                    <div className="testimonial-author">
                        <strong>{project.testimonials[0].author}</strong>
                        <p>{project.testimonials[0].role}, {project.testimonials[0].hospital}</p>
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="project-team">
                <div className="content-wrapper">
                    <h3>Project Team</h3>
                    <div className="team-list">
                        {project.team.map((member, index) => (
                            <div key={index} className="team-member">
                                {member}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIMILAR PROJECTS */}
            <section className="similar-projects">
                <div className="content-wrapper">
                    <h2>Similar Projects</h2>
                    <div className="similar-grid">
                        {project.similarProjects.map((similar, index) => (
                            <Link key={index} to={`/projects/${similar.slug}`} className="similar-project">
                                <div className="similar-image">
                                    <img src="/api/placeholder/400/300" alt={similar.title} />
                                </div>
                                <h4>{similar.title}</h4>
                                <span className="similar-category">{similar.category}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECT NAVIGATION */}
            <section className="project-navigation">
                <div className="content-wrapper">
                    <div className="nav-buttons">
                        <Link to="/portfolio" className="nav-btn back">
                            ← Back to Portfolio
                        </Link>
                        <Link to="/contact" className="nav-btn next">
                            Start Your Project →
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetail;