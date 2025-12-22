// Update src/components/Nav.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
// Import the logo from the same folder
import logo from './logo.jpeg';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const location = useLocation();

    const textOptions = ['Design', 'Create', 'Innovate', 'Inspire'];
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 1500;

    // Typewriter effect
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentIndex = loopNum % textOptions.length;
            const fullText = textOptions[currentIndex];
            
            setText(isDeleting 
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, textOptions]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/media', label: 'Media' },
        { path: '/shop', label: 'Shop' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav className={`navbar-rz ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo-container" onClick={() => setIsMenuOpen(false)}>
                    <div className="logo-image-wrapper">
                        {/* Use the imported logo */}
                        <img 
                            src={logo} 
                            alt="PabloStudio Logo" 
                            className="logo-image"
                        />
                    </div>
                    <div className="logo-text">
                        <span className="logo-main">Pablo<span className="logo-accent">Studio</span></span>
                        <span className="animated-text">
                            <span className="static-text">We </span>
                            <span className="typing-text">{text}</span>
                            <span className="cursor">|</span>
                        </span>
                    </div>
                </Link>

                <div className="nav-links-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <button 
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="menu-icon">{isMenuOpen ? '✕' : '☰'}</span>
                </button>

                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Nav;