import React, { useState, useEffect, useRef } from 'react'
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

const images = [
  'https://keyvendors.com/blogs/wp-content/uploads/2023/06/simple-living-room-1.jpg',
  'https://restaurantinteriordesign.eu/wp-content/uploads/2018/04/Hollywood_Roosevelt_Hotel.jpg',
  'https://d28pk2nlhhgcne.cloudfront.net/assets/app/uploads/sites/3/2023/05/how-to-design-restaurant-interior-help-3d-3-1220x671.jpg',
  'https://mohhinteriors.com/wp-content/uploads/2024/05/expensive-restaurant-interior-view-with-colorful-illuminating-scaled.jpg',
];

function Home() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

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
        {/* Hero Carousel Section */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden mb-4">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${current * 100}vw)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`carousel-${idx}`}
                className="w-full h-full object-cover flex-shrink-0"
                style={{ opacity: 1 }}
                draggable="false"
              />
            ))}
          </div>
          
          {/* Carousel Indicators for Mobile */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-yellow-500' : 'bg-white/50'
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>

        {/* Hero Text Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center drop-shadow-lg leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
            >
              Make Your Dream Home True With Design Studio Architects
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
