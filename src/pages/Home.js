import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import OwnerSignature from '../components/OwnerSignature.jsx';
import './Home.css';

// Import all wel images for hero section only
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
import wel16 from './assets/wel16.jpeg';
import wel18 from './assets/wel18.jpeg';
// Import fish image
import fishImage from './assets/fish.png';

const Home = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    const gridContainerRef = useRef(null);
    const contentContainerRef = useRef(null);
    const fishContainerRef = useRef(null);
    const fishRefs = useRef([]);

    const heroDescription = `We transform spaces with bespoke interior design solutions. Custom furniture, wall decor, and complete makeovers for residential and commercial projects. Sustainable materials and expert craftsmanship. Your vision, our creation.`;

    // Fish data - different sizes, speeds, and depths (bottom positions)
    const fishData = [
        // Bottom layer fish (larger, slower, bottom of screen)
        { id: 1, size: 70, speed: 25, delay: 0, yPos: 550, opacity: 0.8, waveHeight: 15, depth: 'bottom' },
        { id: 2, size: 60, speed: 22, delay: 3, yPos: 500, opacity: 0.7, waveHeight: 10, depth: 'bottom' },
        { id: 3, size: 65, speed: 24, delay: 6, yPos: 580, opacity: 0.75, waveHeight: 12, depth: 'bottom' },
        
        // Middle layer fish (medium size, medium speed, middle-bottom)
        { id: 4, size: 45, speed: 18, delay: 1, yPos: 400, opacity: 0.7, waveHeight: 20, depth: 'middle-bottom' },
        { id: 5, size: 50, speed: 20, delay: 4, yPos: 450, opacity: 0.65, waveHeight: 18, depth: 'middle-bottom' },
        
        // Middle-top layer fish (smaller, faster)
        { id: 6, size: 35, speed: 15, delay: 2, yPos: 300, opacity: 0.6, waveHeight: 25, depth: 'middle-top' },
        { id: 7, size: 40, speed: 16, delay: 5, yPos: 350, opacity: 0.55, waveHeight: 22, depth: 'middle-top' },
        
        // Top layer fish (smallest, fastest)
        { id: 8, size: 30, speed: 12, delay: 7, yPos: 250, opacity: 0.5, waveHeight: 30, depth: 'top' },
        { id: 9, size: 25, speed: 10, delay: 8, yPos: 200, opacity: 0.45, waveHeight: 35, depth: 'top' },
    ];

    // Define the grid layout for hero section only
    const gridImages = [
        // Column 1 (Right aligned - MOVED 80px LEFT)
        { src: wel1, width: 140, height: 200, x: -80, y: 0, type: 'tall', column: 1, rightAligned: true },
        { src: wel2, width: 200, height: 140, x: -140, y: 210, type: 'wide', column: 1, rightAligned: true },
        { src: wel15, width: 150, height: 150, x: -90, y: 360, type: 'square', column: 1, rightAligned: true },
        
        // Column 2
        { src: wel7, width: 140, height: 240, x: 150, y: -20, type: 'tall', column: 2 },
        { src: wel6, width: 140, height: 200, x: 150, y: 230, type: 'tall', column: 2 },
        { src: wel14, width: 140, height: 200, x: 150, y: 440, type: 'tall', column: 2 },
        
        // Column 3
        { src: wel3, width: 200, height: 140, x: 310, y: 0, type: 'wide', column: 3 },
        { src: wel4, width: 200, height: 140, x: 310, y: 150, type: 'wide', column: 3 },
        { src: wel5, width: 200, height: 140, x: 310, y: 300, type: 'wide', column: 3 },
        
        // Column 4
        { src: wel13, width: 140, height: 240, x: 530, y: -20, type: 'tall', column: 4 },
        { src: wel11, width: 150, height: 150, x: 530, y: 230, type: 'square', column: 4 },
        { src: wel12, width: 150, height: 150, x: 530, y: 390, type: 'square', column: 4 },
        
        // Column 5
        { src: wel8, width: 150, height: 150, x: 690, y: 0, type: 'square', column: 5 },
        { src: wel9, width: 150, height: 150, x: 690, y: 160, type: 'square', column: 5 },
        
        // Column 6
        { src: wel16, width: 140, height: 200, x: 860, y: 0, type: 'tall', column: 6 },
        { src: wel18, width: 200, height: 140, x: 860, y: 210, type: 'wide', column: 6 },
        { src: wel10, width: 150, height: 150, x: 860, y: 360, type: 'square', column: 6 }
    ];

    useEffect(() => {
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';
        
        // Set initial state
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

        // Create all image elements with their positions
        gridImages.forEach((imgData, index) => {
            const img = document.createElement('img');
            img.src = imgData.src;
            img.className = 'grid-image';
            img.alt = `Craft ${index + 1}`;
            img.style.opacity = '0';
            img.style.width = `${imgData.width}px`;
            img.style.height = `${imgData.height}px`;
            img.dataset.type = imgData.type;
            img.dataset.x = imgData.x;
            img.dataset.y = imgData.y;
            img.dataset.column = imgData.column;
            img.dataset.index = index;
            img.dataset.rightAligned = imgData.rightAligned || false;
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

        // Get hero section dimensions
        const heroSection = document.querySelector('.hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        
        // Calculate centered position for the entire grid
        const totalGridWidth = 1060;
        const totalGridHeight = 610;
        const gridCenterX = (heroRect.width - totalGridWidth) / 2;
        const gridCenterY = (heroRect.height - totalGridHeight) / 2;

        // Create main timeline
        const tl = gsap.timeline();

        // STEP 1: Images fly in from edges and form grid
        images.forEach((img, index) => {
            const xPos = parseInt(img.dataset.x);
            const yPos = parseInt(img.dataset.y);
            const type = img.dataset.type;
            const column = parseInt(img.dataset.column);
            const isRightAligned = img.dataset.rightAligned === 'true';
            
            // Calculate final position (centered)
            let finalX, finalY;
            
            if (isRightAligned) {
                finalX = gridCenterX + 60 + xPos;
                finalY = gridCenterY + yPos;
            } else {
                finalX = gridCenterX + xPos;
                finalY = gridCenterY + yPos;
            }
            
            // Start from different edges based on type and column
            let startX, startY, rotation;
            
            switch(type) {
                case 'tall':
                    startX = finalX + (Math.random() * 80 - 40);
                    if (column % 2 === 0) {
                        startY = -300;
                        rotation = -15;
                    } else {
                        startY = heroRect.height + 300;
                        rotation = 15;
                    }
                    break;
                    
                case 'wide':
                    startY = finalY + (Math.random() * 80 - 40);
                    if (column % 2 === 0) {
                        startX = -300;
                        rotation = -10;
                    } else {
                        startX = window.innerWidth + 300;
                        rotation = 10;
                    }
                    break;
                    
                case 'square':
                default:
                    const corner = column % 4;
                    switch(corner) {
                        case 0:
                            startX = -400;
                            startY = -400;
                            rotation = -20;
                            break;
                        case 1:
                            startX = window.innerWidth + 400;
                            startY = -400;
                            rotation = 20;
                            break;
                        case 2:
                            startX = -400;
                            startY = heroRect.height + 400;
                            rotation = -10;
                            break;
                        case 3:
                            startX = window.innerWidth + 400;
                            startY = heroRect.height + 400;
                            rotation = 10;
                            break;
                    }
                    break;
            }

            // Set initial position
            gsap.set(img, {
                x: startX,
                y: startY,
                rotation: rotation,
                scale: 1.3,
                opacity: 0,
                zIndex: 10
            });

            // Animate to grid position with column-based delay
            const columnDelay = (7 - column) * 0.1;
            const rowDelay = (Math.abs(yPos) / 200) * 0.05;
            
            tl.to(img, {
                x: finalX,
                y: finalY,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "back.out(1.7)",
                delay: columnDelay + rowDelay
            }, 0);
        });

        // Pause after grid formation
        tl.to({}, { duration: 0.8 });

        // STEP 2: Start fading in hero container
        tl.to(contentContainerRef.current, {
            opacity: 1,
            duration: 0.8,
            onStart: () => {
                setShowContent(true);
            }
        }, "-=0.5");

        // STEP 3: Images scatter to background positions
        images.forEach((img, index) => {
            const bgX = Math.random() * heroRect.width;
            const bgY = Math.random() * (heroRect.height * 0.8);
            const scale = 0.08 + (Math.random() * 0.04);
            const rotation = -30 + (Math.random() * 60);
            
            const scatterDelay = (index % 3) * 0.1;
            
            tl.to(img, {
                x: bgX,
                y: bgY,
                scale: scale,
                rotation: rotation,
                opacity: 0.05,
                duration: 1.2,
                ease: "power2.out",
                delay: scatterDelay,
                onStart: () => {
                    img.style.zIndex = '1';
                }
            }, "scatter-start");
        });

        // STEP 4: Animate content (centered)
        tl.fromTo(".pablo-letter", 
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }, "scatter-start+=0.3");

        tl.to(".hero-studio", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "scatter-start+=0.6");

        tl.to(".hero-description", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "scatter-start+=0.9");

        tl.to([".get-quote-left", ".view-services-right"], {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            onComplete: () => {
                setTimeout(() => {
                    setAnimationComplete(true);
                    // Enable scrolling after animation
                    document.body.style.overflow = 'auto';
                    // Start fish animation after hero animation completes
                    setTimeout(() => {
                        animateFishSwimming();
                    }, 500);
                }, 500);
            }
        }, "scatter-start+=1.2");
    };

    const animateFishSwimming = () => {
        const heroSection = document.querySelector('.hero-section');
        const heroRect = heroSection.getBoundingClientRect();
        
        // Create fish elements
        const fishContainer = fishContainerRef.current;
        if (!fishContainer) return;
        
        fishContainer.innerHTML = '';
        
        fishData.forEach((fish, index) => {
            const fishElement = document.createElement('img');
            fishElement.src = fishImage;
            fishElement.className = `red-fish fish-depth-${fish.depth}`;
            fishElement.alt = 'Swimming Fish';
            fishElement.style.width = `${fish.size}px`;
            fishElement.style.opacity = fish.opacity.toString();
            
            // Set initial position - start from LEFT side
            gsap.set(fishElement, {
                x: -fish.size - 100, // Start off-screen to the LEFT
                y: fish.yPos,
                rotation: 0,
                scaleX: 1, // Facing RIGHT (normal orientation)
                scaleY: 1
            });
            
            fishContainer.appendChild(fishElement);
            fishRefs.current[index] = fishElement;
            
            // Create swimming animation for this fish
            animateSingleFish(fishElement, fish, heroRect);
        });
    };

    const animateSingleFish = (fishElement, fishData, heroRect) => {
        // Main swimming animation (LEFT to RIGHT)
        const swimTL = gsap.timeline({
            repeat: -1,
            repeatDelay: fishData.delay * 0.5, // Shorter delay for continuous flow
            delay: fishData.delay
        });

        // Swim from left to right with wave motion
        swimTL.to(fishElement, {
            x: heroRect.width + fishData.size + 100, // End off-screen to the RIGHT
            y: fishData.yPos,
            duration: fishData.speed,
            ease: "none",
            modifiers: {
                // Add wave motion (more pronounced for smaller fish)
                y: function(y) {
                    const x = gsap.getProperty(fishElement, "x");
                    const progress = x / (heroRect.width + fishData.size + 200);
                    const wave = Math.sin(progress * Math.PI * 3) * fishData.waveHeight; // 3 waves across
                    return fishData.yPos + wave;
                },
                // Add slight rotation based on wave direction
                rotation: function() {
                    const x = gsap.getProperty(fishElement, "x");
                    const progress = x / (heroRect.width + fishData.size + 200);
                    const waveRotation = Math.cos(progress * Math.PI * 3) * 5; // Gentle rotation
                    return waveRotation;
                }
            }
        });

        // Reset position (instant teleport back to left)
        swimTL.set(fishElement, {
            x: -fishData.size - 100,
            y: fishData.yPos,
            rotation: 0
        });

        // Add swimming motion (flipper animation) - different based on depth
        const flipperSpeed = fishData.depth === 'bottom' ? 0.7 : 
                            fishData.depth === 'middle-bottom' ? 0.6 :
                            fishData.depth === 'middle-top' ? 0.5 : 0.4;
        
        gsap.to(fishElement, {
            scaleY: 0.9,
            duration: flipperSpeed,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: fishData.delay
        });

        // Add slight bobbing motion - more for top fish, less for bottom
        const bobAmount = fishData.depth === 'bottom' ? 3 : 
                         fishData.depth === 'middle-bottom' ? 5 :
                         fishData.depth === 'middle-top' ? 8 : 10;
        
        gsap.to(fishElement, {
            y: `+=${bobAmount}`,
            duration: 1.5 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: fishData.delay
        });

        // Add occasional speed variations for realism
        gsap.to(fishElement, {
            duration: fishData.speed * 0.1,
            timeScale: 1.2, // Speed up briefly
            repeat: 1,
            yoyo: true,
            repeatDelay: Math.random() * 10 + 5,
            delay: fishData.delay + Math.random() * 5
        });
    };

    return (
        <div className="pablo-dark-theme">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="grid-container" ref={gridContainerRef}></div>
                
                {/* Fish Container */}
                {animationComplete && (
                    <div className="fish-container" ref={fishContainerRef}></div>
                )}
                
                <div className={`content-container ${showContent ? 'visible' : ''}`} ref={contentContainerRef}>
                    <Nav />
                    <OwnerSignature />
                    
                    <div className="container hero-centered-container">
                        <div className="hero-content hero-centered">
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
                                            to="/contact" 
                                            className="hero-btn get-quote-btn"
                                            onClick={(e) => navigate('/contact')}
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
                                            to="/about" 
                                            className="hero-btn view-services-btn"
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
        </div>
    );
};

export default Home;