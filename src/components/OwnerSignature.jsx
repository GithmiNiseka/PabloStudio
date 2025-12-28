// src/components/OwnerSignature.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './OwnerSignature.css';

const OwnerSignature = () => {
    const signatureRef = useRef(null);

    useEffect(() => {
        if (signatureRef.current) {
            gsap.fromTo(signatureRef.current,
                { 
                    x: 100, 
                    opacity: 0,
                    scale: 0.9 
                },
                { 
                    x: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 1, 
                    delay: 1.5, 
                    ease: "power3.out" 
                }
            );
        }
    }, []);

    return (
        <div className="owner-signature-simple" ref={signatureRef}>
            <Link 
                to="/profile" 
                className="owner-signature-link-simple"
                title="Visit Sugath Sanjeewa's Profile"
            >
                <div className="vertical-text-simple">
                    SUGATH SANJEEWA
                </div>
            </Link>
        </div>
    );
};

export default OwnerSignature;