import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <a href="/">
              <div className="flex items-center gap-2">
                <span
                  className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Design Studio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-base font-medium transition-colors duration-200 hover:text-yellow-600 ${
                    location.pathname === link.path 
                      ? 'text-yellow-600 border-b-2 border-yellow-600' 
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Book a Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-yellow-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen 
            ? 'transform translate-y-0' 
            : 'transform -translate-y-full'
        }`}>
          <div className="py-4 px-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                    location.pathname === link.path
                      ? 'text-yellow-600 bg-yellow-50 border-l-4 border-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Book a Consultation
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
