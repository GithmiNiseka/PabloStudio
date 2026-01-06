// src/components/OwnerSignature.jsx
import React from 'react';
import './OwnerSignature.css';

const OwnerSignature = () => {
  // Function to handle click - navigate to owner's profile
  const handleOwnerClick = (e) => {
    e.preventDefault();
    // You can change this URL to the actual owner's profile page
    window.open('https://yourdomain.com/owner-profile', '_blank');
    // Or if you want to navigate within your app:
    // window.location.href = '/owner-profile';
  };

  return (
    <div className="owner-signature">
      <a 
        href="https://yourdomain.com/owner-profile" 
        className="owner-signature-link"
        onClick={handleOwnerClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Owner Profile - Pablo Suagth Sunjeewa"
      >
        <div className="vertical-text">
          Owner| Pablo Suagth Sunjeewa
        </div>
      </a>
    </div>
  );
};

export default OwnerSignature;