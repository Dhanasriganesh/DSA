import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataContext';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Dashboard() {
  const { projects, testimonials, teamMembers, contactSubmissions, heroImages } = useData();

  const newContactsCount = contactSubmissions.filter(c => c.status === 'new').length;

  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: '🏠',
      color: 'bg-blue-500',
      link: '/admin/projects'
    },
    {
      name: 'Testimonials',
      value: testimonials.length,
      icon: '⭐',
      color: 'bg-green-500',
      link: '/admin/testimonials'
    },
    {
      name: 'Team Members',
      value: teamMembers.length,
      icon: '👥',
      color: 'bg-purple-500',
      link: '/admin/team'
    },
    {
      name: 'Contact Submissions',
      value: contactSubmissions.length,
      icon: '📧',
      color: 'bg-yellow-500',
      link: '/admin/contacts',
      badge: newContactsCount > 0 ? `${newContactsCount} new` : null
    },
    {
      name: 'Hero Images',
      value: heroImages.length,
      icon: '🖼️',
      color: 'bg-pink-500',
      link: '/admin/hero-images'
    }
  ];

  const recentContacts = contactSubmissions.slice(0, 5);

  const quickActions = [
    { name: 'Add New Project', link: '/admin/projects', icon: '➕', color: 'bg-blue-500' },
    { name: 'Add Testimonial', link: '/admin/testimonials', icon: '⭐', color: 'bg-green-500' },
    { name: 'Add Team Member', link: '/admin/team', icon: '👤', color: 'bg-purple-500' },
    { name: 'View Contacts', link: '/admin/contacts', icon: '📧', color: 'bg-yellow-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome to VASTORA DESIGNS Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              {stat.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {stat.badge}
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.name}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-lg p-4 hover:opacity-90 transition-opacity flex items-center gap-3`}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-semibold">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Recent Contacts
            </h2>
            <Link to="/admin/contacts" className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div key={contact.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.status === 'new' ? 'bg-green-100 text-green-800' :
                      contact.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{contact.subject}</p>
                  <p className="text-xs text-gray-500">{contact.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No contact submissions yet</p>
            )}
          </div>
        </div>

        {/* Project Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Project Categories
          </h2>
          <div className="space-y-4">
            {['Residential', 'Commercial', 'Renovation'].map((category) => {
              const count = projects.filter(p => p.category === category).length;
              const percentage = projects.length > 0 ? (count / projects.length) * 100 : 0;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">{count} projects</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Admin Portal v1.0
            </h3>
            <p className="text-yellow-100">
              All systems operational. Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="text-4xl">✅</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
