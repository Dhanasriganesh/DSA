import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('popupShown');
    
    if (!popupShown) {
      // Show popup after 1 second delay when page loads
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark that popup was shown in this session
        sessionStorage.setItem('popupShown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Background Image/Gradient */}
        <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-6 sm:px-8 py-8 sm:py-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          
          <div className="relative text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h2 
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Transform Your Space Today!
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-4">
              Get a <span className="font-bold">FREE Consultation</span> with our expert designers
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Limited time offer!</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-8">
          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Professional Interior Design</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">On-Time Project Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">500+ Successful Projects</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            onClick={closeModal}
            className="block w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-center font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Free Consultation Now
          </Link>

          {/* Secondary Action */}
          <button
            onClick={closeModal}
            className="block w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            No thanks, I'll browse first
          </button>
        </div>

        {/* Trust Badge */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Trusted by 500+ happy clients</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PopupModal;
