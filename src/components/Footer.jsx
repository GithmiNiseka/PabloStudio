import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-rz">
            {/* Black background container */}
            <div className="footer-black-container">
                <div className="footer-main">
                    <div className="footer-left">
                        <div className="footer-contact">
                            <div className="footer-phone">
                                <span className="footer-label">Phone</span>
                                <a href="tel:+94771234567">+94 77 123 4567</a>
                            </div>
                            <div className="footer-enquiries">
                                <span className="footer-label">Email</span>
                                <a href="mailto:hello@pablostudio.com">hello@pablostudio.com</a>
                            </div>
                            <div className="footer-address">
                                <span className="footer-label">Address</span>
                                <div>
                                    123 Art Street<br />
                                    Moratuwa<br />
                                    Sri Lanka
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-follow">
                            <span className="footer-label">Follow</span>
                            <div className="social-links">
                                <a href="#" className="social-link">In</a>
                                <a href="#" className="social-link">Fb</a>
                                <a href="#" className="social-link">Ln</a>
                                <a href="#" className="social-link">Tw</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-founded">
                        <div className="footer-logo">P</div>
                        <p>
                            Pablo Studio specializes in creative interior art and eco-friendly designs. 
                            Our team combines artistic vision with sustainable practices to create unique 
                            spaces that inspire and endure. Based in Moratuwa, Sri Lanka.
                        </p>
                    </div>
                    <div className="footer-legal">
                        <a href="#" className="legals-link">Legals</a>
                        <p className="copyright">© {new Date().getFullYear()} - Pablo Studio</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;