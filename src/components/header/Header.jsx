import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <header className="bg-white/30 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between py-2 px-4 min-h-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800 tracking-tight">Design Studio</span>
        </div>
        <nav className="flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium transition-colors duration-200 hover:text-indigo-600 ${location.pathname === link.path ? 'text-indigo-600' : 'text-gray-700'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <a href="/contact" className="ml-4 px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition-colors duration-200 hidden sm:inline-block">Book a Consultation</a>
      </div>
    </header>
  )
}

export default Header
