// src/pages/Testimonials.jsx
import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import testimonials from '../data/testimonials';

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      <Nav />
      
      <section className="testimonials-hero">
        <div className="content-wrapper">
          <h1>Client Testimonials</h1>
          <p>What our clients say about working with us</p>
        </div>
      </section>

      <section className="testimonials-grid">
        <div className="content-wrapper">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="quote">"{testimonial.quote}"</p>
              <div className="client-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Testimonials;