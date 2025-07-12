import React from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const features = [
  { icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
    ), label: 'Interior Fit Out' },
  { icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ), label: 'Site Supervision' },
  { icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
    ), label: 'Quality of Finish' },
  
  { icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
    ), label: 'Reliability' },
  { icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"/></svg>
    ), label: 'Control of Cost' },
];

const promises = [
  { label: 'Timely delivery', color: 'text-black' },
  { label: 'Best price', color: 'text-black' },
  { label: 'Top quality', color: 'text-black' },
  { label: 'Innovation & Flexibility', color: 'text-black' },
];

function Why() {
  return (
    <section className="w-full min-h-screen bg-gray-100 py-16 px-4">
      <h2
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight"
        style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.04em' }}
      >
        Why Choose Us?
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-8 w-56 min-h-[180px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 group"
          >
            <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <span className="mt-2 text-lg font-semibold text-gray-800 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{feature.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6 items-center mb-8">
       
        <div className="flex-1 h-px bg-gray-300 max-w-xs" />
      </div>
      <div className="flex flex-wrap justify-center gap-4]">
        {promises.map((promise, idx) => (
          <div
            key={idx}
            className="flex items-center rounded-full border border-gray-300 px-6 py-3 bg-white text-base font-medium shadow hover:bg-blue-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            <span className={promise.color} style={{ fontFamily: 'Playfair Display, serif' }}>{promise.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Why