import React from 'react'

function About() {
  return (
    <main className="py-16 px-6">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Designer" className="w-40 h-40 rounded-full shadow-lg object-cover" />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aarohi Mehta</h1>
          <h2 className="text-xl text-indigo-600 mb-2">Lead Interior Designer & Founder, Inspire Interiors</h2>
          <p className="text-gray-700 mb-6">With over 12 years of experience, Aarohi Mehta is known for her creative vision and attention to detail. She believes every space should tell a story and reflect the personality of its owner. Her work blends modern elegance with timeless comfort, transforming homes and offices into inspiring environments.</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Recipient of the 2022 National Interior Design Award</li>
            <li>Featured in "Modern Living" and "Design India" magazines</li>
            <li>Passionate about sustainable and eco-friendly design</li>
            <li>Dedicated to client satisfaction and personalized service</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default About
