import React from 'react'
import { Link } from 'react-router-dom'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Interior Design',
    'Architecture',
    'Renovation',
    'Space Planning',
    'Custom Furniture',
    'Project Management',
  ];

  const contactInfo = [
    { icon: '📍', text: '123 Design Avenue, Banjara Hills, Hyderabad' },
    { icon: '📞', text: '+91 9999999999 ' },
    { icon: '✉️', text: 'hello@designstudioarchitects.com' },
    { icon: '⏰', text: 'Mon - Sat: 9:00 AM - 7:00 PM' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Pinterest', icon: '📌', url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Design Studio
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
              Creating beautiful, functional spaces that inspire and delight. We transform your vision into reality with innovative design solutions and exceptional craftsmanship.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm sm:text-base text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm sm:text-base text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Contact Info
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-lg flex-shrink-0">{info.icon}</span>
                  <span className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
              &copy; {currentYear} Design Studio Architects. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
