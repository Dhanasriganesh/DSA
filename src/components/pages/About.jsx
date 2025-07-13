import React from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function About() {
  const teamMembers = [
    {
      name: "Aarohi Mehta",
      role: "Lead Interior Designer & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      experience: "12+ Years",
      specialization: "Luxury Residential & Commercial Spaces",
      description: "Aarohi brings creative vision and meticulous attention to detail to every project. Her work blends modern elegance with timeless comfort."
    },
    {
      name: "Rajesh Kumar",
      role: "Principal Architect",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      experience: "15+ Years",
      specialization: "Sustainable Architecture & Urban Planning",
      description: "Rajesh specializes in creating sustainable, innovative architectural solutions that harmonize with their surroundings."
    },
    {
      name: "Priya Sharma",
      role: "Senior Interior Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      experience: "8+ Years",
      specialization: "Modern Minimalist & Scandinavian Design",
      description: "Priya excels in creating clean, functional spaces that maximize both aesthetics and practicality."
    }
  ];

  const achievements = [
    { number: "500+", label: "Projects Completed" },
    { number: "12+", label: "Years of Experience" },
    { number: "50+", label: "Team Members" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: "🎨",
      title: "Creative Excellence",
      description: "We push boundaries to create innovative designs that inspire and delight."
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "We work closely with clients to understand their vision and bring it to life."
    },
    {
      icon: "🌱",
      title: "Sustainable Design",
      description: "We prioritize eco-friendly materials and sustainable practices in all our projects."
    },
    {
      icon: "⭐",
      title: "Quality Craftsmanship",
      description: "We maintain the highest standards of quality in every detail of our work."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About Design Studio Architects
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming spaces into extraordinary experiences through innovative design, 
            sustainable practices, and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Founded in 2012, Design Studio Architects began with a simple mission: to create 
                beautiful, functional spaces that enhance the lives of those who inhabit them. 
                What started as a small team of passionate designers has grown into one of 
                Hyderabad's most trusted architectural and interior design firms.
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Over the past decade, we've completed over 500 projects across residential, 
                commercial, and hospitality sectors. Our commitment to quality, innovation, 
                and client satisfaction has earned us numerous awards and the trust of 
                hundreds of satisfied clients.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Today, we continue to push the boundaries of design while maintaining the 
                personal touch and attention to detail that has defined our work from the beginning.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" 
                alt="Our Studio" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-yellow-500 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold">12+</div>
                <div className="text-xs sm:text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-semibold">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-yellow-600 font-semibold mb-2 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{member.experience} Experience</p>
                <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 font-medium">{member.specialization}</p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Awards & Recognition
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
              <div className="text-yellow-500 text-xl sm:text-2xl mb-2 sm:mb-3">🏆</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">2023 Best Interior Design Firm</h3>
              <p className="text-gray-300 text-sm sm:text-base">Awarded by Design Excellence Awards</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
              <div className="text-yellow-500 text-xl sm:text-2xl mb-2 sm:mb-3">🌟</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">2022 Sustainability Award</h3>
              <p className="text-gray-300 text-sm sm:text-base">Recognized for eco-friendly design practices</p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
              <div className="text-yellow-500 text-xl sm:text-2xl mb-2 sm:mb-3">🎯</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">2021 Client Choice Award</h3>
              <p className="text-gray-300 text-sm sm:text-base">Highest client satisfaction rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Start Your Project?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8">
            Let's work together to create something extraordinary for your space.
          </p>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-500 font-semibold text-base sm:text-lg rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300">
            Get Free Consultation
          </button>
        </div>
      </section>
    </div>
  )
}

export default About
