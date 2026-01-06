// src/pages/Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import OwnerSignature from '../components/OwnerSignature'; // Import OwnerSignature
import projects from '../data/projects';
import './Portfolio.css';

// Import the image helper
import { getImportedImage } from './imageImports';

const Portfolio = () => {
    const [activeBusiness, setActiveBusiness] = useState(null);
    const [hoveredBusiness, setHoveredBusiness] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [galleryImages, setGalleryImages] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const gridRef = useRef(null);

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

    const filteredProjects = activeBusiness === null 
        ? projects 
        : projects.filter(p => p.business === activeBusiness);

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

    const getBusinessColor = (businessId) => {
        const business = businesses.find(b => b.id === businessId);
        return business ? business.color : '#dc2626';
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

    // Get image using imports
    const getImagePath = (project) => {
        if (!project.image) {
            return getImportedImage('souv1.jpeg');
        }
        
        const importedImage = getImportedImage(project.image);
        if (importedImage) {
            return importedImage;
        }
        
        // Fallback
        return getImportedImage('souv1.jpeg');
    };

    // Get ALL images for a project
    const getAllProjectImages = (project) => {
        const images = [];
        
        // Add main image
        const mainImage = getImagePath(project);
        if (mainImage) images.push(mainImage);
        
        // Add additional images if they exist
        if (project.additionalImages && project.additionalImages.length > 0) {
            project.additionalImages.forEach(img => {
                const importedImg = getImportedImage(img);
                if (importedImg) {
                    images.push(importedImg);
                }
            });
        }
        
        // Also check gallery array
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach(img => {
                const importedImg = getImportedImage(img);
                if (importedImg) {
                    images.push(importedImg);
                }
            });
        }
        
        return images;
    };

    // Get only gallery images
    const getGalleryImages = (project) => {
        const allImages = getAllProjectImages(project);
        return allImages.slice(1);
    };

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

    const handleBusinessChange = (businessId) => {
        if (activeBusiness === businessId) {
            setActiveBusiness(null);
        } else {
            setActiveBusiness(businessId);
        }
        
        gsap.to('.bento-project-item', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                gsap.fromTo('.bento-project-item',
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out'
                    }
                );
            }
        });
    };

    const handleProjectHover = (project, index) => {
        const businessId = project.business;
        setHoveredBusiness(businessId);
        
        // Add visual feedback to business box
        updateBusinessBoxHover(businessId);
        
        const item = document.querySelector(`.bento-project-item[data-index="${index}"]`);
        if (item) {
            gsap.to(item, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
                zIndex: 10
            });
        }
    };

    const handleProjectLeave = (index) => {
        setHoveredBusiness(null);
        
        // Remove visual feedback from business boxes
        removeBusinessBoxHover();
        
        const item = document.querySelector(`.bento-project-item[data-index="${index}"]`);
        if (item) {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 1
            });
        }
    };

    const handleProjectClick = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        setSelectedProject(project);
        const galleryImgs = getGalleryImages(project);
        setGalleryImages(galleryImgs);
        setActiveImageIndex(0);
        
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

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('project-details-overlay')) {
            closePopup();
        }
    };

    const handleThumbnailClick = (index) => {
        setActiveImageIndex(index);
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
    };

    const navigateLightbox = (direction) => {
        const allImages = getAllProjectImages(selectedProject);
        let newIndex = lightboxIndex + direction;
        
        if (newIndex < 0) newIndex = allImages.length - 1;
        if (newIndex >= allImages.length) newIndex = 0;
        
        setLightboxIndex(newIndex);
    };

    const getShortDescription = (description) => {
        if (!description) return 'Project description';
        const words = description.split(' ');
        return words.slice(0, 12).join(' ') + (words.length > 12 ? '...' : '');
    };

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

    const getTechStack = (project) => {
        if (project.technologies && project.technologies.length > 0) {
            return project.technologies;
        }
        
        return ['React', 'Node.js', 'MongoDB', 'Express', 'Figma', 'AWS'];
    };

    useEffect(() => {
        const items = document.querySelectorAll('.bento-project-item');
        
        if (items.length > 0) {
            gsap.set(items, {
                opacity: 0,
                y: 50,
                scale: 0.9
            });
            
            gsap.to(items, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.3
            });
        }
        
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            const items = document.querySelectorAll('.bento-project-item');
            
            if (items.length > 0) {
                gsap.to(items, {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set(items, { clearProps: 'all' });
                        
                        gsap.set(items, {
                            opacity: 0,
                            y: 30,
                            scale: 0.95
                        });
                        
                        gsap.to(items, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        }
    }, [activeBusiness]);

    useEffect(() => {
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
    }, [isPopupOpen, isLightboxOpen]);

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
            
            {/* Left Side Business Boxes - Aligned with left border */}
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

            <main className="vertical-content">
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

                <section className="projects-section">
                    <div className="content-wrapper">
                        <div className="bento-projects-grid" ref={gridRef}>
                            {filteredProjects.map((project, index) => {
                                const imageSrc = getImagePath(project);
                                
                                return (
                                    <div
                                        key={project.id}
                                        data-id={project.id}
                                        data-business={project.business}
                                        data-index={index}
                                        className={getBentoClass(index)}
                                        onMouseEnter={() => handleProjectHover(project, index)}
                                        onMouseLeave={() => handleProjectLeave(index)}
                                        onClick={() => handleProjectClick(project.id)}
                                    >
                                        <div className="project-image-container-bento">
                                            <img 
                                                src={imageSrc}
                                                alt={project.title}
                                                className="project-image-bento"
                                                onError={(e) => {
                                                    e.target.style.backgroundColor = '#222';
                                                    e.target.style.minHeight = '150px';
                                                    e.target.style.display = 'flex';
                                                    e.target.style.alignItems = 'center';
                                                    e.target.style.justifyContent = 'center';
                                                    e.target.innerHTML = `<div style="color: #666; font-size: 12px;">${project.category}</div>`;
                                                }}
                                            />
                                            <div className="image-overlay-bento"></div>
                                        </div>

                                        <div className="project-content-bento">
                                            <div className="project-header-bento">
                                                <div className="project-date-bento">
                                                    {project.date || project.year || '2024'}
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
                                );
                            })}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="empty-state-vertical">
                                <div className="empty-icon-vertical">—</div>
                                <p>No projects available.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

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
                            <div className="project-details-images">
                                <img 
                                    src={getAllProjectImages(selectedProject)[activeImageIndex]} 
                                    alt={selectedProject.title}
                                    className="main-project-image"
                                    onError={(e) => {
                                        e.target.style.backgroundColor = '#222';
                                        e.target.style.minHeight = '400px';
                                        e.target.style.display = 'flex';
                                        e.target.style.alignItems = 'center';
                                        e.target.style.justifyContent = 'center';
                                        e.target.innerHTML = '<div style="color: #666; font-size: 14px;">Image not found</div>';
                                    }}
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
                                                onError={(e) => {
                                                    e.target.style.backgroundColor = '#333';
                                                    e.target.style.minHeight = '80px';
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="project-details-info">
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
                                            {selectedProject.year || '2024'}
                                        </span>
                                    </div>
                                </div>

                                <div className="project-details-description">
                                    {selectedProject.fullDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: selectedProject.fullDescription }} />
                                    ) : (
                                        <p>{selectedProject.description}</p>
                                    )}
                                </div>

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

                                <div className="tech-stack-section">
                                    <h3>Tools & Materials</h3>
                                    <div className="tech-stack-grid">
                                        {getTechStack(selectedProject).map((tech, index) => (
                                            <span key={index} className="tech-item">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-timeline">
                                    <h3>Project Timeline</h3>
                                    {getTimelineData(selectedProject).map((item, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-date">{item.date}</div>
                                            <div className="timeline-content">{item.content}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="project-stats">
                                    <div className="stat-item">
                                        <div className="stat-value">
                                            {selectedProject.duration || '3'} {selectedProject.business === 'thotilla' ? 'weeks' : 'mo'}
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
                                        <div className="stat-label">Tools</div>
                                    </div>
                                </div>

                                {selectedProject.teamRoles && (
                                    <div className="team-roles-section">
                                        <div className="team-roles">
                                            <strong>Team:</strong>
                                            {selectedProject.teamRoles}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                            onError={(e) => {
                                e.target.style.backgroundColor = '#222';
                                e.target.style.minHeight = '300px';
                                e.target.style.display = 'flex';
                                e.target.style.alignItems = 'center';
                                e.target.style.justifyContent = 'center';
                                e.target.innerHTML = '<div style="color: #666; font-size: 16px;">Image not found</div>';
                            }}
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