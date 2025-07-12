import React from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const badges = [
  { icon: '⭐', label: 'Top Rated' },
  { icon: '🛋️', label: 'Luxury Interiors' },
  { icon: '🎨', label: 'Custom Designs' },
  { icon: '⏱️', label: 'On-Time Delivery' },
  { icon: '🏆', label: 'Award Winning' },
  { icon: '💬', label: 'Client Favorite' },
];

const testimonials = [
  {
    text: (
      <>
        Design Studio's <span className="text-indigo-600 font-semibold">creative vision</span> and attention to detail transformed our home into a masterpiece. Their <span className="text-yellow-600 font-semibold">personalized approach</span> and <span className="text-green-600 font-semibold">timely execution</span> made the entire process seamless and enjoyable.
      </>
    ),
    author: 'Priya Sharma',
    role: 'Homeowner, Mumbai',
    main: true,
  },
  {
    text: 'The team at Design Studio brought our dream home to life. Their expertise in modern interiors and space planning is unmatched.',
    author: 'Sampath Rao',
    role: 'Villa Owner, Hyderabad',
  },
  {
    text: 'From concept to completion, Design Studio exceeded our expectations. The quality of finish and unique design touches truly set them apart.',
    author: 'Ajay Mehta',
    role: 'Apartment Owner, Pune',
  },
  {
    text: 'We loved working with Design Studio! Their professionalism, creativity, and commitment to timelines made our renovation stress-free.',
    author: 'Mahesh Gupta',
    role: 'Renovation Client, Bangalore',
  },
];

function Testinomials() {
  return (
    <section className="w-full min-h-screen bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="uppercase text-xs tracking-widest bg-gray-100 px-3 py-1 rounded-full mb-4 text-gray-500 font-semibold">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>What Our Clients Say</h2>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-2xl">Discover how Design Studio is creating beautiful, functional spaces and delighting clients with exceptional interior design solutions.</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-2 text-center">Trusted & Recognized</h3>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow px-6 py-4 min-w-[120px] border border-gray-100">
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-sm font-medium text-gray-700">{badge.label}</span>
            </div>
          ))}
        </div>
        {/* Main testimonial and image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-center min-h-[180px] border border-gray-100">
            <span className="text-lg text-gray-800 leading-relaxed">{testimonials[0].text}</span>
            <span className="mt-4 text-sm text-gray-500">&ldquo;{testimonials[0].author}, {testimonials[0].role}&rdquo;</span>
          </div>
         
        </div>
        {/* Other testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.slice(1).map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col h-full">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <span className="text-base text-gray-800 mb-4 flex-1">{t.text}</span>
              <span className="font-semibold text-gray-900">{t.author}</span>
              <span className="text-xs text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testinomials