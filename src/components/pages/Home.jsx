import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../../context/DataContext'
import Projects from './Projects';
import Why from './Why';
import Connect from './Connect';
import Testinomials from './Testinomials';

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

// Default images (used if no hero images in Firestore) - High-quality architecture & interior design
const defaultImages = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80', // Modern living room
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80', // Luxury bedroom
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80', // Contemporary kitchen
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80', // Elegant dining room
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80', // Stylish office space
];

function Home() {
  const { heroImages } = useData();
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Use hero images from Firestore, or default if none exist
  const sortedHeroImages = heroImages.length > 0 
    ? [...heroImages].sort((a, b) => (a.order || 0) - (b.order || 0))
    : null;
  
  const images = sortedHeroImages && sortedHeroImages.length > 0
    ? sortedHeroImages.map(img => img.url)
    : defaultImages;


  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set up auto-rotation if there are multiple images
    if (images.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, images.length]);

  // Reset current index if it's out of bounds when images change
  useEffect(() => {
    if (current >= images.length && images.length > 0) {
      setCurrent(0);
    }
  }, [images.length, current]);

  const handleConnectClick = () => {
    const connectSection = document.getElementById('connect-section');
    if (connectSection) {
      connectSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <main className="bg-gray-200 min-h-screen w-full p-0 m-0">
        {/* Hero Carousel Section - Above the caption */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
          <div className="relative h-full w-full">
            {images.map((src, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? 'opacity-100' : 'opacity-0'
              }`}>
                <img
                  src={src}
                  alt={`Hero image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  draggable="false"
                  onError={(e) => {
                    console.error(`Failed to load image ${idx}:`, src);
                    e.target.style.display = 'none';
                  }}
                />
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>
          
          {/* Carousel Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrent((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 hover:scale-110"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                  idx === current ? 'bg-yellow-500 scale-125 shadow-yellow-500/50' : 'bg-white/80 hover:bg-white hover:scale-110'
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Auto-rotation indicator */}
          <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            Auto-rotating every 5s
          </div>
        </div>

        {/* Hero Text Section - Below the carousel */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <div className="max-w-6xl mx-auto">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center drop-shadow-lg leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
            >
              Make Your Dream Home True With VASTORA DESIGNS
            </h1>
            
            <div className='flex justify-center items-center mt-6 sm:mt-8 md:mt-10'>
              <button 
                onClick={handleConnectClick}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 w-full sm:w-auto max-w-xs sm:max-w-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Connect With Us
              </button>
            </div>
          </div>
        </div>
       
      </main>

      {/* Content Sections */}
      <div className="w-full">
        <Why/>
      </div>
      
      <div className="w-full">
        <Projects/>
      </div>
      
      <div id="connect-section" className="w-full">
        <Connect/>
      </div>
      
      <div className="w-full">
        <Testinomials/>
      </div>
        
    </div>
  )
}

export default Home
