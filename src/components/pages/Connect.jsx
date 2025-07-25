import React, { useState } from 'react'

// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function Connect() {
  const [form, setForm] = useState({ name: '', mobile: '', home: '2BHK' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); alert('Consultation request sent!'); };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-blend-multiply" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 gap-8 sm:gap-12 lg:gap-16">
        {/* Left: Text */}
        <div className="flex-1 text-white max-w-xl text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Let's Connect
          </h2>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-400 mb-4 sm:mb-6 tracking-wide">
            GET FREE CONSULTATION REQUEST
          </h3>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 mb-6 sm:mb-8">
            Our interior designers and architects use next-gen Design, Technology, skilled work force & Implementation methods, to solve not just today's Home Interiors needs, but even the ones you don't foresee for tomorrow. With our specialized interior design and interior decor capabilities, we have been ranked the Best Interior Designers in Hyderabad since last 5 years. Our architectural design guidelines help you create outstanding interior experiences to your home within the committed timelines. Start your journey with us today by filling out the form, and let's create something beautiful together!
          </p>
        </div>
        
        {/* Right: Form Card */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-md w-full min-w-[280px] sm:min-w-[320px] flex flex-col gap-4 sm:gap-6 border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Get A Free Consultation
          </h3>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 bg-gray-50 text-sm sm:text-base" 
              placeholder="Enter your name" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input 
              name="mobile" 
              value={form.mobile} 
              onChange={handleChange} 
              required 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 bg-gray-50 text-sm sm:text-base" 
              placeholder="Enter your mobile number" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              About your home <span className="text-red-500">*</span>
            </label>
            <select 
              name="home" 
              value={form.home} 
              onChange={handleChange} 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 bg-gray-50 text-sm sm:text-base"
            >
              <option>2BHK</option>
              <option>3BHK</option>
              <option>Villa</option>
              <option>Other</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="mt-2 sm:mt-4 w-full py-2 sm:py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book a Free Consultation
          </button>
        </form>
      </div>
    </section>
  )
}

export default Connect