// src/pages/Media.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import OwnerSignature from '../components/OwnerSignature';
import './Media.css';

gsap.registerPlugin(ScrollTrigger);

const Media = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeBusiness, setActiveBusiness] = useState(null);
    const [hoveredBusiness, setHoveredBusiness] = useState(null);
    const containerRef = useRef();
    const cardRefs = useRef([]);

    // Enhanced media data
    const mediaData = [
        // Large featured items
        {
            id: 1,
            type: 'youtube',
            title: 'ePablo.lk Creative Studio Documentary',
            excerpt: '30-minute documentary featuring our creative process, team, and studio culture.',
            date: '2024-01-20',
            thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            source: 'YouTube',
            link: 'https://youtube.com/watch?v=epablo-doc',
            business: 'epablo',
            size: 'large',
            duration: '30:45'
        },
        {
            id: 2,
            type: 'tv',
            title: 'Thotilla.lk Transport Revolution',
            excerpt: 'Prime time feature on how Thotilla is changing transportation across Sri Lanka.',
            date: '2024-01-15',
            thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            source: 'News First',
            link: 'https://newsfirst.lk/thotilla-feature',
            business: 'thotilla',
            size: 'wide',
            duration: '22:30'
        },
        // Tall items
        {
            id: 3,
            type: 'blog',
            title: 'Digital Art Revolution in South Asia',
            excerpt: 'Comprehensive analysis of digital art trends in the regional creative scene.',
            date: '2024-01-10',
            thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: 'Design Matters',
            link: 'https://designmatters.com/digital-art-south-asia',
            business: 'epablo',
            size: 'tall'
        },
        {
            id: 4,
            type: 'youtube',
            title: 'Suvinor Workshop Behind the Scenes',
            excerpt: 'Exclusive look at our vehicle workshop and maintenance processes.',
            date: '2024-01-05',
            thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: 'YouTube',
            link: 'https://youtube.com/watch?v=suvinor-workshop',
            business: 'suvinor',
            size: 'tall',
            duration: '18:20'
        },
        // Small items
        {
            id: 5,
            type: 'tv',
            title: 'Business Insight Interview',
            excerpt: 'CEO interview discussing business strategies and future expansion plans.',
            date: '2023-12-28',
            thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: 'Business Today',
            link: 'https://businesstoday.lk/ceo-interview',
            business: 'epablo',
            size: 'small',
            duration: '15:10'
        },
        {
            id: 6,
            type: 'blog',
            title: 'Sustainable Urban Mobility',
            excerpt: 'How Thotilla contributes to greener cities through smart transportation.',
            date: '2023-12-20',
            thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: 'Urban Futures',
            link: 'https://urbanfutures.com/sustainable-mobility',
            business: 'thotilla',
            size: 'small'
        },
        {
            id: 7,
            type: 'youtube',
            title: 'Client Success Stories - Suvinor',
            excerpt: 'Real stories from satisfied Suvinor customers about their experiences.',
            date: '2023-12-15',
            thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: 'YouTube',
            link: 'https://youtube.com/watch?v=client-stories',
            business: 'suvinor',
            size: 'small',
            duration: '12:45'
        },
        {
            id: 8,
            type: 'blog',
            title: '3D Design Trends 2024',
            excerpt: 'Predictions and insights for the coming year in 3D design and animation.',
            date: '2023-12-10',
            thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            source: '3D World',
            link: 'https://3dworld.com/trends-2024',
            business: 'epablo',
            size: 'small'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Media' },
        { id: 'blog', label: 'Blogs' },
        { id: 'tv', label: 'TV Programs' },
        { id: 'youtube', label: 'YouTube' }
    ];

    const businesses = [
        { 
            id: 'thotilla',
            name: 'Thotilla', 
            color: '#dc2626'
        },
        { 
            id: 'suvinor',
            name: 'Suvinor', 
            color: '#dc2626'
        },
        { 
            id: 'epablo',
            name: 'Pablo', 
            color: '#dc2626'
        }
    ];

    // Filter media items
    const filteredMedia = mediaData.filter(item => {
        const typeMatch = activeFilter === 'all' || item.type === activeFilter;
        const businessMatch = activeBusiness === null || item.business === activeBusiness;
        return typeMatch && businessMatch;
    });

    // Handle business change
    const handleBusinessChange = (businessId) => {
        if (activeBusiness === businessId) {
            setActiveBusiness(null);
        } else {
            setActiveBusiness(businessId);
        }
        // Also animate cards
        animateCards();
    };

    // Handle filter change
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
        // Animate cards
        animateCards();
    };

    // Animate cards function
    const animateCards = () => {
        gsap.to('.media-card-bento', {
            opacity: 0,
            y: 50,
            duration: 0.4,
            stagger: 0.05,
            onComplete: () => {
                setTimeout(() => {
                    gsap.fromTo('.media-card-bento',
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: 'power2.out'
                        }
                    );
                }, 100);
            }
        });
    };

    // Helper functions for business box hover effects
    const updateBusinessBoxHover = (businessId) => {
        // Remove hover effect from all business boxes
        document.querySelectorAll('.business-box').forEach(box => {
            box.classList.remove('hover-effect');
        });
        
        // Add hover effect to the specific business box
        if (businessId) {
            const businessBox = document.querySelector(`.business-box[data-business="${businessId}"]`);
            if (businessBox && !businessBox.classList.contains('active')) {
                businessBox.classList.add('hover-effect');
            }
        }
    };

    const removeBusinessBoxHover = () => {
        document.querySelectorAll('.business-box').forEach(box => {
            if (!box.classList.contains('active')) {
                box.classList.remove('hover-effect');
            }
        });
    };

    // Handle project hover with business box effect
    const handleProjectHover = (item, index) => {
        const businessId = item.business;
        
        // Add visual feedback to business box
        updateBusinessBoxHover(businessId);
        
        const cardElement = document.querySelector(`.media-card-bento[data-index="${index}"]`);
        if (cardElement) {
            gsap.to(cardElement, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
                zIndex: 10
            });
        }
    };

    const handleProjectLeave = (index) => {
        // Remove visual feedback from business boxes
        removeBusinessBoxHover();
        
        const cardElement = document.querySelector(`.media-card-bento[data-index="${index}"]`);
        if (cardElement) {
            gsap.to(cardElement, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 1
            });
        }
    };

    // Initialize animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.to('.media-title', {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: 'power2.out'
            });

            // Description animation
            gsap.to('.media-description', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.6,
                ease: 'power2.out'
            });

            // Filter tabs animation
            gsap.to('.media-filter', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.9,
                ease: 'power2.out'
            });

            // Cards animation on load
            gsap.fromTo('.media-card-bento',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    delay: 1.2,
                    ease: 'power2.out'
                }
            );

            // ScrollTrigger for cards
            cardRefs.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(card,
                        { opacity: 0, y: 100 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Handle media click with animation
    const handleMediaClick = (item, e) => {
        e.preventDefault();
        
        const card = e.currentTarget;
        gsap.to(card, {
            scale: 0.95,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                window.open(item.link, '_blank', 'noopener,noreferrer');
            }
        });
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div ref={containerRef} className="media-page vertical-portfolio">
            <Nav />
            
            {/* Left Side Business Boxes - WITHOUT "All" tab */}
            <div className="business-boxes-sidebar">
                {businesses.map((business) => (
                    <button
                        key={business.id}
                        className={`business-box ${activeBusiness === business.id ? 'active' : ''}`}
                        data-business={business.id}
                        onClick={() => handleBusinessChange(business.id)}
                        onMouseEnter={() => {
                            setHoveredBusiness(business.id);
                            updateBusinessBoxHover(business.id);
                        }}
                        onMouseLeave={() => {
                            setHoveredBusiness(null);
                            removeBusinessBoxHover();
                        }}
                        style={{
                            backgroundColor: (activeBusiness === business.id) ? business.color : 'transparent',
                            color: (activeBusiness === business.id) ? '#000000' : '#ffffff',
                            borderColor: (activeBusiness === business.id) ? business.color : '#ffffff',
                            borderWidth: '1px',
                            borderStyle: 'solid'
                        }}
                    >
                        <span className="business-name">
                            {business.name}
                        </span>
                    </button>
                ))}
            </div>
            
            {/* Right Side Owner Signature */}
            <OwnerSignature />

            <div className="media-layout vertical-content">
                {/* Hero Section */}
                <section className="media-hero vertical-hero">
                    <h1 className="media-title vertical-page-title">
                        Media & Publications
                    </h1>
                    <p className="media-description vertical-page-description">
                        Featured appearances, insightful blogs, and engaging video content 
                        showcasing our journey and expertise.
                    </p>
                </section>

                {/* Filter Tabs - CLEAN TEXT-ONLY STYLE */}
                <section className="media-filter">
                    <div className="filter-tabs">
                        {filters.map((filter, index) => (
                            <React.Fragment key={filter.id}>
                                <button
                                    data-filter={filter.id}
                                    className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(filter.id)}
                                >
                                    {filter.label}
                                </button>
                                {index < filters.length - 1 && (
                                    <span className="filter-separator">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* Bento Media Grid */}
                <section className="media-content">
                    <div className="media-grid-bento bento-projects-grid">
                        {filteredMedia.map((item, index) => (
                            <div 
                                key={item.id}
                                ref={el => cardRefs.current[index] = el}
                                className={`media-card-bento bento-project-item ${item.size || 'small'}`}
                                data-index={index}
                                onMouseEnter={() => handleProjectHover(item, index)}
                                onMouseLeave={() => handleProjectLeave(index)}
                                onClick={(e) => handleMediaClick(item, e)}
                            >
                                {/* Media Thumbnail/Video */}
                                <div className="project-image-container-bento">
                                    <img 
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="project-image-bento media-thumbnail-bento"
                                    />
                                    <div className="image-overlay-bento"></div>
                                </div>
                                
                                {/* Content Area */}
                                <div className="media-content-area project-content-bento">
                                    <div className="media-info">
                                        <div className="project-header-bento">
                                            <span className="media-date-bento project-date-bento">
                                                {formatDate(item.date)}
                                            </span>
                                        </div>

                                        <h3 className="media-title-bento project-title-bento">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="media-excerpt-bento project-description-bento">
                                            {item.excerpt}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="media-footer-bento project-footer-bento">
                                        <span className="media-source-bento project-category-bento">
                                            {item.source}
                                        </span>
                                        <button 
                                            className="media-link-bento view-button-bento"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMediaClick(item, e);
                                            }}
                                        >
                                            VIEW
                                            <svg className="arrow-bento" width="14" height="14" viewBox="0 0 16 16">
                                                <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredMedia.length === 0 && (
                        <div className="media-empty empty-state-vertical">
                            <div className="media-empty-icon empty-icon-vertical">—</div>
                            <p>No media content found for this category.</p>
                            <button 
                                className="reset-filters-btn"
                                onClick={() => {
                                    setActiveFilter('all');
                                    setActiveBusiness(null);
                                }}
                            >
                                Show All Media
                            </button>
                        </div>
                    )}
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Media;