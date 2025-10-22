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

function About() {
  const { teamMembers, aboutContent, loading } = useData();

  // Default values if no aboutContent in Firestore
  const achievements = aboutContent?.achievements ? [
    { number: aboutContent.achievements.projectsCompleted, label: "Projects Completed" },
    { number: aboutContent.achievements.yearsExperience, label: "Years of Experience" },
    { number: aboutContent.achievements.teamMembers, label: "Team Members" },
    { number: aboutContent.achievements.clientSatisfaction, label: "Client Satisfaction" }
  ] : [
    { number: "500+", label: "Projects Completed" },
    { number: "12+", label: "Years of Experience" },
    { number: "50+", label: "Team Members" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const companyStory = aboutContent?.companyStory || `Founded in 2012, Design Studio Architects began with a simple mission: to create beautiful, functional spaces that enhance the lives of those who inhabit them. What started as a small team of passionate designers has grown into one of Hyderabad's most trusted architectural and interior design firms.

Over the past decade, we've completed over 500 projects across residential, commercial, and hospitality sectors. Our commitment to quality, innovation, and client satisfaction has earned us numerous awards and the trust of hundreds of satisfied clients.

Today, we continue to push the boundaries of design while maintaining the personal touch and attention to detail that has defined our work from the beginning.`;

  const awards = aboutContent?.awards && aboutContent.awards.length > 0 ? aboutContent.awards : [
    { icon: '🏆', title: '2023 Best Interior Design Firm', description: 'Awarded by Design Excellence Awards', year: 2023 },
    { icon: '🌟', title: '2022 Sustainability Award', description: 'Recognized for eco-friendly design practices', year: 2022 },
    { icon: '🎯', title: '2021 Client Choice Award', description: 'Highest client satisfaction rating', year: 2021 }
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
            About VASTORA DESIGNS
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
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-4">
                {companyStory.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" 
                alt="Our Studio" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-yellow-500 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold">{aboutContent?.foundedYear ? (new Date().getFullYear() - parseInt(aboutContent.foundedYear)) + '+' : '12+'}</div>
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
          {teamMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No team members yet</h3>
              <p className="text-gray-600">Team members added through the admin panel will appear here.</p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.id || index} className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow duration-300">
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
            {awards.map((award, index) => (
              <div key={index} className="bg-gray-800 p-4 sm:p-6 rounded-xl">
                <div className="text-yellow-500 text-xl sm:text-2xl mb-2 sm:mb-3">{award.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{award.year} {award.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{award.description}</p>
              </div>
            ))}
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
          <Link to="/contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-500 font-semibold text-base sm:text-lg rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 inline-block text-center">
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
