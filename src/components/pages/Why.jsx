import React from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const features = [
  { 
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="4"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ), 
    label: 'Interior Fit Out',
    description: 'Complete interior design and fit-out solutions tailored to your vision.'
  },
  { 
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ), 
    label: 'Site Supervision',
    description: 'Professional on-site supervision ensuring quality and timely completion.'
  },
  { 
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/>
      </svg>
    ), 
    label: 'Quality of Finish',
    description: 'Exceptional attention to detail and premium finishing standards.'
  },
  { 
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ), 
    label: 'Reliability',
    description: 'Dependable service with consistent delivery on every project.'
  },
  { 
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"/>
      </svg>
    ), 
    label: 'Control of Cost',
    description: 'Transparent pricing and cost control throughout the project lifecycle.'
  },
];

const promises = [
  { 
    label: 'Timely delivery', 
    icon: '⏰',
    description: 'We commit to delivering your project on schedule, every time.'
  },
  { 
    label: 'Best price', 
    icon: '💰',
    description: 'Competitive pricing without compromising on quality or service.'
  },
  { 
    label: 'Top quality', 
    icon: '⭐',
    description: 'Premium materials and craftsmanship in every detail.'
  },
  { 
    label: 'Innovation & Flexibility', 
    icon: '🎨',
    description: 'Creative solutions that adapt to your unique requirements.'
  },
];

function Why() {
  return (
    <section className="w-full min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine creativity, expertise, and dedication to deliver exceptional results that exceed your expectations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-300 group"
            >
              <div className="mb-3 sm:mb-4 lg:mb-6 text-yellow-600 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 text-center mb-2 sm:mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                {feature.label}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Promises Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h3
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Promises to You
          </h3>
          
          {/* Promises Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {promises.map((promise, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {promise.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {promise.label}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-yellow-500 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl">
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Experience Excellence?
          </h3>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let's discuss your project and see how we can bring your vision to life with our proven expertise.
          </p>
          <button className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-yellow-500 font-semibold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}

export default Why