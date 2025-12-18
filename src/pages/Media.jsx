// src/pages/Media.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BusinessBoxes from '../components/BusinessBoxes'; // Import the component
import './Media.css';

gsap.registerPlugin(ScrollTrigger);

const Media = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeBusiness, setActiveBusiness] = useState('all');
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

    // Combine business and type filters
    const combinedFilter = activeFilter === 'all' && activeBusiness === 'all';

    // Filter media items
    const filteredMedia = mediaData.filter(item => {
        const typeMatch = activeFilter === 'all' || item.type === activeFilter;
        const businessMatch = activeBusiness === 'all' || item.business === activeBusiness;
        return typeMatch && businessMatch;
    });

    // Handle business change
    const handleBusinessChange = (businessId) => {
        setActiveBusiness(businessId);
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

    // Initialize animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.to('.media-hero', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out'
            });

            // Title line animation
            gsap.to('.title-line', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                delay: 0.3,
                ease: 'power2.out'
            });

            // Description animation
            gsap.to('.media-description', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.8,
                ease: 'power2.out'
            });

            // Filter tabs animation
            gsap.to('.media-filter', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1,
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

    // Get type label - minimalist vertical text
    const getTypeLabel = (type) => {
        switch(type) {
            case 'blog': return 'BLOG';
            case 'tv': return 'TV';
            case 'youtube': return 'VIDEO';
            default: return type.toUpperCase();
        }
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
        <div ref={containerRef} className="media-page">
            <Nav />
            
            {/* Business Boxes Component */}
            <BusinessBoxes 
                activeBusiness={activeBusiness}
                onBusinessChange={handleBusinessChange}
                showAll={true}
            />
            
            <div className="media-layout">
                {/* Hero Section */}
                <section className="media-hero">
                    <h1 className="media-title">
                        <span className="title-line">Media &</span>
                        <span className="title-line">Publications</span>
                    </h1>
                    <p className="media-description">
                        Featured appearances, insightful blogs, and engaging video content 
                        showcasing our journey and expertise.
                    </p>
                </section>

                {/* Filter Tabs */}
                <section className="media-filter">
                    <div className="filter-tabs">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                data-filter={filter.id}
                                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => handleFilterChange(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Bento Media Grid */}
                <section className="media-content">
                    <div className="media-grid-bento">
                        {filteredMedia.map((item, index) => (
                            <div 
                                key={item.id}
                                ref={el => cardRefs.current[index] = el}
                                className={`media-card-bento ${item.size || 'small'}`}
                                onClick={(e) => handleMediaClick(item, e)}
                            >
                                {/* Media Thumbnail/Video */}
                                <img 
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="media-thumbnail-bento"
                                />
                                
                                {/* Vertical Type Label - MINIMALIST */}
                                <div className="media-type-label">
                                    {getTypeLabel(item.type)}
                                    <div className="type-line"></div>
                                </div>
                                
                                {/* Minimalist duration for videos */}
                                {(item.type === 'youtube' || item.type === 'tv') && item.duration && (
                                    <div className="media-duration">
                                        {item.duration}
                                    </div>
                                )}
                                
                                {/* Content Area - ALWAYS VISIBLE */}
                                <div className="media-content-area">
                                    <div className="media-info">
                                        <span className="media-date-bento">
                                            {formatDate(item.date)}
                                        </span>
                                        
                                        <h3 className="media-title-bento">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="media-excerpt-bento">
                                            {item.excerpt}
                                        </p>
                                    </div>

                                    {/* Footer - ALWAYS VISIBLE */}
                                    <div className="media-footer-bento">
                                        <span className="media-source-bento">
                                            {item.source}
                                        </span>
                                        <button 
                                            className="media-link-bento"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMediaClick(item, e);
                                            }}
                                        >
                                            VIEW
                                            <svg width="14" height="14" viewBox="0 0 16 16">
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
                        <div className="media-empty">
                            <div className="media-empty-icon">—</div>
                            <p>No media content found for this category.</p>
                            <button 
                                className="filter-tab"
                                onClick={() => {
                                    setActiveFilter('all');
                                    setActiveBusiness('all');
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