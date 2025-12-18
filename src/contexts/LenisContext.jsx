// src/context/LenisContext.jsx
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import Lenis from '@studio-freight/lenis';

const LenisContext = createContext(null);

export const useLenis = () => {
  return useContext(LenisContext);
};

export const LenisProvider = ({ children }) => {
  const lenis = useMemo(() => new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  }), []);

  useEffect(() => {
    let animationFrameId;

    const animate = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};