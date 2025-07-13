import React, { useState } from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const projects = [
  {
    img: 'https://cdn.home-designing.com/wp-content/uploads/2019/04/living-room-pendant-light.jpg',
    title: 'Modern Living Room',
    category: 'Residential',
    description: 'Contemporary living space with elegant lighting and minimalist design.'
  },
  {
    img: 'https://thumbs.dreamstime.com/b/modern-open-plan-kitchen-living-room-luxury-home-interior-design-night-lighting-tropical-view-360667684.jpg',
    title: 'Open Plan Kitchen',
    category: 'Residential',
    description: 'Spacious open-plan kitchen with luxury finishes and tropical views.'
  },
  {
    img: 'https://hommes.studio/wp-content/uploads/Get-To-Know-12-Of-The-Most-Popular-Interior-Design-Styles_2.jpg',
    title: 'Contemporary Interior',
    category: 'Residential',
    description: 'Modern interior design with clean lines and sophisticated aesthetics.'
  },
  {
    img: 'https://blog.bikroy.com/en/wp-content/uploads/2020/11/Blog-creative-How-to-renovate-your-home-780x470.jpg',
    title: 'Home Renovation',
    category: 'Renovation',
    description: 'Complete home transformation with modern upgrades and improved functionality.'
  },
  {
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Bedroom',
    category: 'Residential',
    description: 'Elegant bedroom design with premium materials and comfortable ambiance.'
  },
  {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: 'Commercial Space',
    category: 'Commercial',
    description: 'Professional commercial interior with modern workspace solutions.'
  },
];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Renovation'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="w-full min-h-screen bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
          >
            Some of Our Recent Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of stunning projects that showcase our expertise in creating beautiful, functional spaces.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable="false"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                
          
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-24">
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16">
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ready to Start Your Project?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together.
            </p>
            <button className="px-8 sm:px-10 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects