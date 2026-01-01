// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import projects from '../data/projects';
import './Portfolio.css';

const Portfolio = () => {
    // Change default to null (showing all) instead of specific business
    const [activeBusiness, setActiveBusiness] = useState(null);
    const [hoveredBusiness, setHoveredBusiness] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
    // Gallery lightbox state
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [galleryImages, setGalleryImages] = useState([]);
    
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Define businesses (NO 'all' button)
    const businesses = [
        { 
            id: 'thotilla',
            name: 'Thotilla', 
            description: 'Transportation Services',
            count: projects.filter(p => p.business === 'thotilla').length,
            color: '#dc2626'
        },
        { 
            id: 'suvinor',
            name: 'Suvinor', 
            description: 'Vehicle Solutions',
            count: projects.filter(p => p.business === 'suvinor').length,
            color: '#dc2626'
        },
        { 
            id: 'epablo',
            name: 'Pablo', 
            description: 'Creative Studio',
            count: projects.filter(p => p.business === 'epablo').length,
            color: '#dc2626'
        }
    ];

    // Filter projects - if activeBusiness is null, show ALL
    const filteredProjects = activeBusiness === null 
        ? projects 
        : projects.filter(p => p.business === activeBusiness);

    // Get active business data for hero section
    const getActiveBusinessData = () => {
        if (activeBusiness === null) {
            return {
                name: '',
                description: '',
                count: projects.length
            };
        }
        return businesses.find(b => b.id === activeBusiness) || businesses[0];
    };

    const activeBusinessData = getActiveBusinessData();

    // Get business color
    const getBusinessColor = (businessId) => {
        const business = businesses.find(b => b.id === businessId);
        return business ? business.color : '#dc2626';
    };

    // Function to get correct image path based on business
    const getImagePath = (project) => {
        if (!project.image) return '/placeholder-image.jpg';
        
        // If image already has a full path or URL, return as is
        if (project.image.startsWith('http') || project.image.startsWith('/')) {
            return project.image;
        }
        
        // Get business folder name
        let businessFolder = '';
        switch(project.business) {
            case 'thotilla':
                businessFolder = 'thot';
                break;
            case 'suvinor':
                businessFolder = 'souv';
                break;
            case 'epablo':
                businessFolder = 'pablo';
                break;
            default:
                businessFolder = project.business;
        }
        
        // Construct path to asset folder
        return `/assets/${businessFolder}/${project.image}`;
    };

    // Function to get gallery images with correct paths
    const getGalleryImages = (project) => {
        const images = [];
        
        // Add main image first
        images.push(getImagePath(project));
        
        // Add additional images if they exist
        if (project.additionalImages && project.additionalImages.length > 0) {
            project.additionalImages.forEach(img => {
                if (img.startsWith('http') || img.startsWith('/')) {
                    images.push(img);
                } else {
                    let businessFolder = '';
                    switch(project.business) {
                        case 'thotilla':
                            businessFolder = 'thot';
                            break;
                        case 'suvinor':
                            businessFolder = 'souv';
                            break;
                        case 'epablo':
                            businessFolder = 'pablo';
                            break;
                        default:
                            businessFolder = project.business;
                    }
                    images.push(`/assets/${businessFolder}/${img}`);
                }
            });
        }
        
        // Add gallery images if they exist
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach(img => {
                if (img.startsWith('http') || img.startsWith('/')) {
                    images.push(img);
                } else {
                    let businessFolder = '';
                    switch(project.business) {
                        case 'thotilla':
                            businessFolder = 'thot';
                            break;
                        case 'suvinor':
                            businessFolder = 'souv';
                            break;
                        case 'epablo':
                            businessFolder = 'pablo';
                            break;
                        default:
                            businessFolder = project.business;
                    }
                    images.push(`/assets/${businessFolder}/${img}`);
                }
            });
        }
        
        return images;
    };

    // IMPROVED Bento layout patterns
    const getBentoLayout = (index, totalItems) => {
        const patterns = [
            'normal', 'normal', 'tall',
            'wide', 'normal',
            'normal', 'large',
            'normal', 'wide',
            'tall', 'normal', 'normal'
        ];
        
        if (totalItems <= 4) {
            return 'normal';
        }
        
        const patternIndex = index % patterns.length;
        return patterns[patternIndex];
    };

    const getBentoClass = (index) => {
        const bentoType = getBentoLayout(index, filteredProjects.length);
        return `bento-project-item ${bentoType}`;
    };

    // Get all project images including gallery
    const getAllProjectImages = (project) => {
        return getGalleryImages(project);
    };

    // Handle business change
    const handleBusinessChange = (businessId) => {
        if (activeBusiness === businessId) {
            setActiveBusiness(null);
        } else {
            setActiveBusiness(businessId);
        }
        
        gsap.to('.bento-project-item', {
            opacity: 0,
            y: 30,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                gsap.fromTo('.bento-project-item',
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out'
                    }
                );
            }
        });
    };

    // Handle project hover - highlight corresponding business box
    const handleProjectHover = (project) => {
        const businessId = project.business;
        setHoveredBusiness(businessId);
    };

    const handleProjectLeave = () => {
        setHoveredBusiness(null);
    };

    // Handle project click - OPEN POPUP
    const handleProjectClick = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        setSelectedProject(project);
        const allImages = getAllProjectImages(project);
        setGalleryImages(allImages.slice(1));
        
        setIsPopupOpen(true);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            gsap.fromTo('.project-details-container',
                { 
                    y: '100%',
                    opacity: 0
                },
                { 
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    delay: 0.1
                }
            );
            
            gsap.fromTo('.project-details-overlay',
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
            );
        }, 10);
    };

    // Close popup
    const closePopup = () => {
        gsap.to('.project-details-container', {
            y: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to('.project-details-overlay', {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        setIsPopupOpen(false);
                        setSelectedProject(null);
                        setActiveImageIndex(0);
                        setGalleryImages([]);
                        document.body.style.overflow = 'auto';
                    }
                });
            }
        });
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('project-details-overlay')) {
            closePopup();
        }
    };

    // Handle thumbnail click
    const handleThumbnailClick = (index) => {
        setActiveImageIndex(index);
    };

    // Open gallery lightbox
    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Close gallery lightbox
    const closeLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
    };

    // Navigate lightbox images
    const navigateLightbox = (direction) => {
        const allImages = getAllProjectImages(selectedProject);
        let newIndex = lightboxIndex + direction;
        
        if (newIndex < 0) newIndex = allImages.length - 1;
        if (newIndex >= allImages.length) newIndex = 0;
        
        setLightboxIndex(newIndex);
    };

    // Handle external link click
    const handleExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Helper function for short description
    const getShortDescription = (description) => {
        if (!description) return 'Project description';
        const words = description.split(' ');
        return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
    };

    // Get default timeline data
    const getTimelineData = (project) => {
        if (project.timeline && project.timeline.length > 0) {
            return project.timeline;
        }
        
        return [
            { date: 'Research', content: 'Initial research and planning phase' },
            { date: 'Design', content: 'UI/UX design and prototyping' },
            { date: 'Development', content: 'Frontend and backend development' },
            { date: 'Testing', content: 'Quality assurance and testing' },
            { date: 'Launch', content: 'Deployment and launch' }
        ];
    };

    // Get default tech stack
    const getTechStack = (project) => {
        if (project.technologies && project.technologies.length > 0) {
            return project.technologies;
        }
        
        return ['React', 'Node.js', 'MongoDB', 'Express', 'Figma', 'AWS'];
    };

    // Initialize animations
    useEffect(() => {
        setIsInitialLoad(false);
        
        if (!isInitialLoad && filteredProjects.length > 0) {
            const items = document.querySelectorAll('.bento-project-item');
            
            if (items.length > 0) {
                gsap.set(items, { clearProps: 'all' });
                
                gsap.fromTo(items,
                    {
                        y: 30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.1
                    }
                );
            }
        } else {
            gsap.set('.bento-project-item', {
                opacity: 1,
                y: 0
            });
        }

        // Handle ESC key
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                if (isLightboxOpen) {
                    closeLightbox();
                } else if (isPopupOpen) {
                    closePopup();
                }
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [activeBusiness, isPopupOpen, isLightboxOpen]);

    // Handle body class for blur effect
    useEffect(() => {
        if (isPopupOpen) {
            document.body.classList.add('popup-open');
        } else {
            document.body.classList.remove('popup-open');
        }
        
        if (isLightboxOpen) {
            document.body.classList.add('lightbox-open');
        } else {
            document.body.classList.remove('lightbox-open');
        }
        
        return () => {
            document.body.classList.remove('popup-open', 'lightbox-open');
        };
    }, [isPopupOpen, isLightboxOpen]);

    return (
        <div className="portfolio-page vertical-portfolio">
            <Nav />
            
            {/* Vertical Business Boxes */}
            <div className="business-boxes-sidebar">
                {businesses.map((business) => (
                    <button
                        key={business.id}
                        className={`business-box ${activeBusiness === business.id ? 'active' : ''}`}
                        onClick={() => handleBusinessChange(business.id)}
                        onMouseEnter={() => setHoveredBusiness(business.id)}
                        onMouseLeave={() => setHoveredBusiness(null)}
                        style={{
                            backgroundColor: (activeBusiness === business.id) ? business.color : 'transparent',
                            color: (activeBusiness === business.id) ? '#000000' : '#ffffff',
                            borderColor: (activeBusiness === business.id || hoveredBusiness === business.id) ? business.color : '#ffffff',
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

            {/* Main Content */}
            <main className="vertical-content">
                {/* Hero */}
                <section className="portfolio-hero vertical-hero">
                    <div className="content-wrapper">
                        <h1 className="vertical-page-title">
                            {activeBusinessData.name}
                        </h1>
                        <p className="vertical-page-description">
                            {activeBusinessData.description}
                        </p>
                    </div>
                </section>

                {/* Bento Style Projects Grid */}
                <section className="projects-section">
                    <div className="content-wrapper">
                        <div className="bento-projects-grid">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    data-id={project.id}
                                    data-business={project.business}
                                    className={getBentoClass(index)}
                                    onMouseEnter={() => handleProjectHover(project)}
                                    onMouseLeave={handleProjectLeave}
                                    onClick={() => handleProjectClick(project.id)}
                                >
                                    {/* Project Image */}
                                    <div className="project-image-container-bento">
                                        <img 
                                            src={getImagePath(project)} 
                                            alt={project.title}
                                            className="project-image-bento"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                        <div className="image-overlay-bento"></div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="project-content-bento">
                                        <div className="project-header-bento">
                                            <div className="project-date-bento">
                                                {project.date || project.year || '2023'}
                                            </div>
                                        </div>

                                        <h3 className="project-title-bento">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="project-description-bento">
                                            {getShortDescription(project.description)}
                                        </p>

                                        <div className="project-footer-bento">
                                            <span className="project-category-bento" style={{ color: getBusinessColor(project.business) }}>
                                                {project.category || 'Project'}
                                            </span>
                                            <button 
                                                className="view-button-bento"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProjectClick(project.id);
                                                }}
                                                style={{ color: getBusinessColor(project.business) }}
                                            >
                                                View
                                                <svg className="arrow-bento" width="16" height="16" viewBox="0 0 16 16">
                                                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProjects.length === 0 && (
                            <div className="empty-state-vertical">
                                <div className="empty-icon-vertical">—</div>
                                <p>No projects available.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Project Details Popup */}
            {selectedProject && (
                <div 
                    className={`project-details-overlay ${isPopupOpen ? 'active' : ''}`} 
                    onClick={handleOverlayClick}
                >
                    <button className="close-project-btn" onClick={closePopup}>
                        ×
                    </button>
                    
                    <div className="project-details-container" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-handle"></div>
                        
                        <div className="project-details-content">
                            {/* Project Images */}
                            <div className="project-details-images">
                                <img 
                                    src={getAllProjectImages(selectedProject)[activeImageIndex]} 
                                    alt={selectedProject.title}
                                    className="main-project-image"
                                />
                                
                                {getAllProjectImages(selectedProject).length > 1 && (
                                    <div className="project-thumbnails">
                                        {getAllProjectImages(selectedProject).map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${selectedProject.title} - ${index + 1}`}
                                                className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                                                onClick={() => handleThumbnailClick(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Project Info */}
                            <div className="project-details-info">
                                {/* Header */}
                                <div className="project-details-header">
                                    <div className="project-breadcrumb">
                                        <span className="project-breadcrumb-item" style={{ color: getBusinessColor(selectedProject.business) }}>
                                            {businesses.find(b => b.id === selectedProject.business)?.name}
                                        </span>
                                        <span className="project-breadcrumb-separator">/</span>
                                        <span className="project-breadcrumb-item active">
                                            {selectedProject.title}
                                        </span>
                                    </div>
                                    <h1 className="project-details-title">
                                        {selectedProject.title}
                                    </h1>
                                    <div className="project-details-meta">
                                        <span className="project-details-category" style={{ color: getBusinessColor(selectedProject.business) }}>
                                            {selectedProject.category || 'Project'}
                                        </span>
                                        <span className="project-details-year">
                                            {selectedProject.year || '2023'}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="project-details-description">
                                    {selectedProject.fullDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription }} />
                                    ) : (
                                        <p>{selectedProject.description}</p>
                                    )}
                                </div>

                                {/* Features */}
                                {selectedProject.features && selectedProject.features.length > 0 && (
                                    <div className="project-features">
                                        <h4>Key Features</h4>
                                        <ul className="features-list">
                                            {selectedProject.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div className="tech-stack-section">
                                    <h3>Tech Stack</h3>
                                    <div className="tech-stack-grid">
                                        {getTechStack(selectedProject).map((tech, index) => (
                                            <span key={index} className="tech-item">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Timeline */}
                                <div className="project-timeline">
                                    <h3>Project Timeline</h3>
                                    {getTimelineData(selectedProject).map((item, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-date">{item.date}</div>
                                            <div className="timeline-content">{item.content}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Gallery Section */}
                                {galleryImages.length > 0 && (
                                    <div className="project-gallery-section">
                                        <h3>Project Gallery</h3>
                                        <div className="gallery-grid">
                                            {galleryImages.map((img, index) => (
                                                <div 
                                                    key={index} 
                                                    className="gallery-item"
                                                    onClick={() => openLightbox(index + 1)}
                                                >
                                                    <img 
                                                        src={img} 
                                                        alt={`${selectedProject.title} gallery ${index + 1}`}
                                                        className="gallery-image"
                                                    />
                                                    <div className="gallery-overlay">
                                                        <span className="zoom-icon">🔍</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="project-stats">
                                    <div className="stat-item">
                                        <div className="stat-value">
                                            {selectedProject.duration || '3'} mo
                                        </div>
                                        <div className="stat-label">Duration</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">
                                            {selectedProject.teamSize || '5'}
                                        </div>
                                        <div className="stat-label">Team Size</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">
                                            {getTechStack(selectedProject).length}
                                        </div>
                                        <div className="stat-label">Technologies</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="project-actions">
                                    <button 
                                        className="primary-btn"
                                        onClick={() => selectedProject.liveUrl && handleExternalLink(selectedProject.liveUrl)}
                                        disabled={!selectedProject.liveUrl}
                                        style={{ backgroundColor: getBusinessColor(selectedProject.business), borderColor: getBusinessColor(selectedProject.business) }}
                                    >
                                        {selectedProject.liveUrl ? 'Visit Live Site' : 'Coming Soon'}
                                    </button>
                                    <button 
                                        className="secondary-btn"
                                        onClick={() => selectedProject.githubUrl && handleExternalLink(selectedProject.githubUrl)}
                                        disabled={!selectedProject.githubUrl}
                                        style={{ borderColor: getBusinessColor(selectedProject.business), color: getBusinessColor(selectedProject.business) }}
                                    >
                                        View Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Lightbox */}
            {selectedProject && (
                <div className={`gallery-lightbox ${isLightboxOpen ? 'active' : ''}`}>
                    <button className="close-lightbox" onClick={closeLightbox}>
                        ×
                    </button>
                    
                    <div className="lightbox-content">
                        <img 
                            src={getAllProjectImages(selectedProject)[lightboxIndex]} 
                            alt={`${selectedProject.title} - ${lightboxIndex + 1}`}
                            className="lightbox-image"
                        />
                        
                        <div className="lightbox-nav">
                            <button className="lightbox-btn" onClick={() => navigateLightbox(-1)}>
                                ←
                            </button>
                            <button className="lightbox-btn" onClick={() => navigateLightbox(1)}>
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Portfolio;