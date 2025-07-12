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

  return (
    <div>
      <main className="bg-gray-200 min-h-screen min-w-full p-0 m-0">
        <div className="relative w-screen h-[70vh] overflow-hidden mb-4">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${current * 100}vw)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`carousel-${idx}`}
                className="w-screen h-[70vh] object-cover flex-shrink-0"
                style={{ opacity: 1 }}
                draggable="false"
              />
            ))}
          </div>
        </div>
        {/* Text below the carousel */}
        <div className="w-full  justify-center mt-8 ">
          <h1
            className="text-3xl font-bold text-black text-center drop-shadow-lg"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Make Your Dream Home True With Design Studio Architects
          </h1>
          <div className='flex justify-center items-center mt-8'>
            <button >
              Connect With Us
            </button>
          </div>
        </div>
       
      </main>
      <div>
          <Why/>
        </div>
        <div>
          <Projects/>
        </div>
        <div>
          <Testinomials/>
        </div>
        <div>
          <Connect/>
        </div>
    </div>
  )
}

export default Home
