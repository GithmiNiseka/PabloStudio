// src/components/BusinessBoxes.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './BusinessBoxes.css';

const BusinessBoxes = ({ activeBusiness, onBusinessChange, showAll = true }) => {
    const [hoveredBusiness, setHoveredBusiness] = useState(null);
    
    // Define businesses
    const businesses = [
        ...(showAll ? [{ 
            id: 'all',
            name: 'All', 
            description: 'All content'
        }] : []),
        { 
            id: 'thotilla',
            name: 'Thotilla', 
            description: 'Transportation Services'
        },
        { 
            id: 'suvinor',
            name: 'Suvinor', 
            description: 'Vehicle Solutions'
        },
        { 
            id: 'epablo',
            name: 'Pablo', 
            description: 'Creative Studio'
        }
    ];

    // Initialize animations
    useEffect(() => {
        gsap.from('.business-box-sidebar', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
        
        gsap.from('.business-box', {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power2.out'
        });
    }, []);

    // Handle business change with animation
    const handleBusinessChange = (businessId) => {
        const prevBox = document.querySelector('.business-box.active');
        const newBox = document.querySelector(`.business-box[data-business="${businessId}"]`);
        
        if (newBox) {
            gsap.to(newBox, {
                scale: 0.95,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }
        
        if (onBusinessChange) {
            onBusinessChange(businessId);
        }
    };

    // Handle hover with animation
    const handleBoxHover = (businessId) => {
        setHoveredBusiness(businessId);
        const box = document.querySelector(`.business-box[data-business="${businessId}"]`);
        
        if (box && !box.classList.contains('active')) {
            gsap.to(box, {
                backgroundColor: '#000000',
                color: '#ffffff',
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    };

    const handleBoxLeave = (businessId) => {
        setHoveredBusiness(null);
        const box = document.querySelector(`.business-box[data-business="${businessId}"]`);
        
        if (box && !box.classList.contains('active')) {
            gsap.to(box, {
                backgroundColor: 'transparent',
                color: '#000000',
                duration: 0.2,
                ease: 'power2.out'
            });
        }
    };

    return (
        <div className="business-boxes-sidebar">
            {businesses.map((business) => (
                <button
                    key={business.id}
                    data-business={business.id}
                    className={`business-box ${activeBusiness === business.id ? 'active' : ''}`}
                    onClick={() => handleBusinessChange(business.id)}
                    onMouseEnter={() => handleBoxHover(business.id)}
                    onMouseLeave={() => handleBoxLeave(business.id)}
                    title={business.description}
                >
                    <span className="business-name">
                        {business.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default BusinessBoxes;