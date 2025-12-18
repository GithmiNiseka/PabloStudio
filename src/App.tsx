// Update src/App.jsx - Add the Media route
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Media from './pages/Media'; // Add this import
import ProjectDetail from './pages/ProjectDetail';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';

import './App.css';

function App() {
  return (
    <Router basename="/PabloStudio">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/media" element={<Media />} /> {/* Add this route */}
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/">Return to Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;