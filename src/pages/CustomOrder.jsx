// src/pages/CustomOrder.jsx
import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    budget: '',
    description: '',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="custom-order-page">
      <Nav />
      
      <section className="custom-order-hero">
        <div className="content-wrapper">
          <h1>Custom Order Request</h1>
          <p>Tell us about your project and we'll create a custom quote</p>
        </div>
      </section>

      <section className="custom-order-form">
        <div className="content-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              {/* Form fields */}
            </div>
            
            <div className="form-section">
              <h3>Project Details</h3>
              {/* Project details fields */}
            </div>
            
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CustomOrder;