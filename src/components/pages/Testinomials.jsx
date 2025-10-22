import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const badges = [
  { icon: '⭐', label: 'Top Rated' },
  { icon: '🛋️', label: 'Luxury Interiors' },
  { icon: '🎨', label: 'Custom Designs' },
  { icon: '⏱️', label: 'On-Time Delivery' },
  { icon: '🏆', label: 'Award Winning' },
  { icon: '💬', label: 'Client Favorite' },
];

function Testinomials() {
  const { testimonials, loading } = useData();

  // Separate featured and regular testimonials
  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  // If loading, show loading state
  if (loading) {
    return (
      <section className="w-full min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="uppercase text-xs sm:text-sm tracking-widest bg-yellow-100 px-3 py-1 rounded-full mb-4 sm:mb-6 text-yellow-700 font-semibold">
            Testimonials
          </span>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 text-center max-w-3xl mx-auto leading-relaxed">
            Discover how Design Studio is creating beautiful, functional spaces and delighting clients with exceptional interior design solutions.
          </p>
        </div>

        {/* Trusted & Recognized Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
            Trusted & Recognized
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center bg-white rounded-xl shadow-lg px-4 sm:px-6 py-4 sm:py-6 min-h-[100px] sm:min-h-[120px] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3">{badge.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Featured Testimonial */}
        {featuredTestimonial && (
          <div className="mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
              <div className="flex items-center mb-4 sm:mb-6">
                {[...Array(featuredTestimonial.rating || 5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg sm:text-xl lg:text-2xl">★</span>
                ))}
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed mb-6 sm:mb-8">
                "{featuredTestimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-4">
                  {featuredTestimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {featuredTestimonial.author}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {featuredTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Testimonials Message */}
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No testimonials yet</h3>
            <p className="text-gray-600">Testimonials added through the admin panel will appear here.</p>
          </div>
        )}

        {/* Other Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularTestimonials.map((t, idx) => (
            <div 
              key={t.id || idx} 
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-base sm:text-lg">★</span>
                ))}
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-800 mb-6 sm:mb-8 flex-1 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mr-3 sm:mr-4">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {t.author}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-24">
          <div className="bg-yellow-500 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <h3 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Join Our Happy Clients
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Experience the same level of excellence and satisfaction that our clients rave about.
            </p>
            <Link to="/contact" className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-yellow-500 font-semibold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block text-center">
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testinomials