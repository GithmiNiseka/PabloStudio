import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Contact.css';

const Contact = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    contact: false,
    map: false,
    faq: false
  });
  
  const [whatsappHover, setWhatsappHover] = useState(false);

  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const mapRef = useRef(null);
  const faqRef = useRef(null);
  const whatsappRef = useRef(null);

  const faqData = [
    {
      question: 'What services does ePablo.lk offer?',
      answer: 'ePablo.lk specializes in custom wall art, interior murals, decorative installations, and personalized handcrafted items. We work with residential spaces, commercial establishments, and institutional projects to create unique artistic environments.'
    },
    {
      question: 'How do I request a custom design or mural?',
      answer: 'Simply contact us via phone, email, or WhatsApp with your project details. We\'ll schedule a consultation to discuss your vision, space requirements, budget, and timeline. We provide digital mockups before starting any project.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes! We accept international commissions and ship our products worldwide. For large installations outside Sri Lanka, we can work remotely with local teams or travel for key phases of the project.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Pricing varies based on project size, complexity, materials, and timeline. Small decorative items start from LKR 5,000, wall murals from LKR 50,000, and large installations are quoted individually. We provide detailed estimates after consultation.'
    },
    {
      question: 'How long does shipping take within Sri Lanka?',
      answer: 'Local delivery in Colombo and suburbs: 1-3 days. Other major cities: 3-5 days. Rural areas: 5-7 days. For large installations, we coordinate delivery and installation together with our team.'
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.dataset.section]: true }));
        }
      });
    }, observerOptions);

    const sections = [heroRef, contactRef, mapRef, faqRef].filter(Boolean);
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="contact-page">
      <Nav />
      
      <div className="contact-layout">
        <section 
          ref={heroRef}
          data-section="hero"
          className={`contact-hero ${isVisible.hero ? 'visible' : ''}`}
        >
          <h1 className="contact-title">Contact</h1>
          <p className="contact-description">
            Whether you're decorating a room, designing a business space, or ordering a custom piece, we're here to help.
          </p>
        </section>

        <section 
          ref={contactRef}
          data-section="contact"
          className={`contact-grid-section ${isVisible.contact ? 'visible' : ''}`}
        >
          <div className="contact-columns">
            <div className="contact-column">
              <h2 className="column-title">Get in Touch</h2>
              
              <div className="contact-detail">
                <div className="contact-label">Phone</div>
                <a 
                  href="tel:+94773858512" 
                  className="contact-value clickable"
                  onClick={(e) => e.target.classList.add('clicked')}
                  onAnimationEnd={(e) => e.target.classList.remove('clicked')}
                >
                  +94 77 385 8512
                </a>
              </div>

              <div className="contact-detail">
                <div className="contact-label">Email</div>
                <a 
                  href="mailto:hello@epablo.lk" 
                  className="contact-value clickable"
                  onClick={(e) => e.target.classList.add('clicked')}
                  onAnimationEnd={(e) => e.target.classList.remove('clicked')}
                >
                  hello@epablo.lk
                </a>
              </div>

              <div className="contact-detail">
                <div className="contact-label">Address</div>
                <div className="contact-value">
                  Moratuwa, Sri Lanka
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-label">Social Media</div>
                <div className="social-links">
                  <a 
                    href="#" 
                    className="social-link clickable"
                    onClick={(e) => e.target.classList.add('clicked')}
                    onAnimationEnd={(e) => e.target.classList.remove('clicked')}
                  >
                    Facebook
                  </a>
                  <a 
                    href="#" 
                    className="social-link clickable"
                    onClick={(e) => e.target.classList.add('clicked')}
                    onAnimationEnd={(e) => e.target.classList.remove('clicked')}
                  >
                    Instagram
                  </a>
                  <a 
                    href="#" 
                    className="social-link clickable"
                    onClick={(e) => e.target.classList.add('clicked')}
                    onAnimationEnd={(e) => e.target.classList.remove('clicked')}
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>

            <div 
              ref={mapRef}
              data-section="map"
              className={`contact-column map-column ${isVisible.map ? 'visible' : ''}`}
            >
              <h2 className="column-title">Our Location</h2>
              <div className="map-container">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5391249908194!2d79.88215407485231!3d6.580107193430223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae237b611537c2d%3A0x9e3b3b4b5c5d5e5f!2sMoratuwa%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1649123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-note">
                <small>We serve clients across Sri Lanka and internationally.</small>
              </div>
            </div>
          </div>
        </section>

        <section 
          ref={faqRef}
          data-section="faq"
          className={`faq-section ${isVisible.faq ? 'visible' : ''}`}
        >
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Quick answers to common questions</p>
          </div>
          
          <div className="faq-questions">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question clickable ${openQuestion === index ? 'active' : ''}`}
                  onClick={(e) => {
                    toggleQuestion(index);
                    e.target.classList.add('clicked');
                    setTimeout(() => e.target.classList.remove('clicked'), 200);
                  }}
                >
                  <span className="question-text">{item.question}</span>
                  <span className="expand-icon">
                    {openQuestion === index ? '−' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${openQuestion === index ? 'open' : ''}`}>
                  <div className="answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <a 
        ref={whatsappRef}
        href="https://wa.me/94773858512" 
        className={`floating-whatsapp ${whatsappHover ? 'hover' : ''}`}
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setWhatsappHover(true)}
        onMouseLeave={() => setWhatsappHover(false)}
        onClick={(e) => {
          window.open(e.currentTarget.href, '_blank');
        }}
      >
        <div className="whatsapp-icon-container">
          <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
          </svg>
        </div>
        <div className="whatsapp-text">
          <span className="text-title">Have a project in mind?</span>
          <span className="text-message">Let's talk — Message us</span>
        </div>
      </a>

      <Footer />
    </div>
  );
};

export default Contact;