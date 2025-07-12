import React from 'react'

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
  },
  {
    img: 'https://thumbs.dreamstime.com/b/modern-open-plan-kitchen-living-room-luxury-home-interior-design-night-lighting-tropical-view-360667684.jpg',
  },
  {
    
    img: 'https://hommes.studio/wp-content/uploads/Get-To-Know-12-Of-The-Most-Popular-Interior-Design-Styles_2.jpg',
  },
  {
    
    img: 'https://blog.bikroy.com/en/wp-content/uploads/2020/11/Blog-creative-How-to-renovate-your-home-780x470.jpg',
  },
  {
    
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  },
  // Replace with your actual images
];

function Projects() {
  return (
    <section className="w-full min-h-screen  py-12 px-4">
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight"
        style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
      >
        Some of Our Recent Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[220px]">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={
              `overflow-hidden rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer ` +
              (idx % 5 === 0 ? 'row-span-2' : idx % 4 === 0 ? 'col-span-2' : '')
            }
            style={idx === projects.length - 1 ? { marginTop: '-250px' } : {}}
          >
            <img
              src={project.img}
              alt="project"
              className="w-full h-full object-cover"
              style={{ minHeight: '220px', maxHeight: '500px' }}
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects