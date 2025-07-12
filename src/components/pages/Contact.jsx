import React from 'react'

function Contact() {
  return (
    <main className="py-16 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        <form className="flex-1 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4" placeholder="How can we help you?" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition-colors">Send Message</button>
        </form>
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Inspire Interiors</h2>
            <p className="text-gray-700">123 Elegant Avenue<br/>Mumbai, India</p>
          </div>
          <div>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> +91 98765 43210</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> hello@inspireinteriors.com</p>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-indigo-600 transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="4"/><path d="M18.5 2h-13A3.5 3.5 0 0 0 2 5.5v13A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-13A3.5 3.5 0 0 0 18.5 2zm-6.5 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm6-10.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-indigo-600 transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-indigo-600 transition-colors">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489-.094-.807-.179-2.048.037-2.93.195-.8 1.252-5.104 1.252-5.104s-.319-.638-.319-1.582c0-1.484.861-2.592 1.934-2.592.912 0 1.354.684 1.354 1.504 0 .918-.584 2.292-.885 3.57-.252 1.066.535 1.936 1.586 1.936 1.903 0 3.366-2.008 3.366-4.904 0-2.563-1.844-4.36-4.478-4.36-3.054 0-4.85 2.292-4.85 4.66 0 .924.355 1.918.8 2.457.09.11.104.206.076.316-.083.34-.27 1.066-.307 1.215-.05.2-.162.243-.376.147-1.4-.573-2.273-2.37-2.273-3.818 0-3.108 2.26-5.963 6.522-5.963 3.423 0 6.086 2.438 6.086 5.7 0 3.406-2.137 6.146-5.104 6.146-1.021 0-1.982-.531-2.308-1.155l-.627 2.39c-.19.73-.563 1.646-.84 2.205C9.68 21.8 10.82 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
