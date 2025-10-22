import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function AdminHeader({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: Menu Button + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <h1 
              className="text-xl sm:text-2xl font-bold text-gray-800"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              VASTORA DESIGNS
            </h1>
            <span className="hidden sm:inline text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
              Admin
            </span>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
            </div>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Website
                  </span>
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
