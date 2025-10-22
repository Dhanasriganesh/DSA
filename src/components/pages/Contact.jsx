import React, { useState } from 'react'
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

function Contact() {
  const { addContactSubmission, contactContent } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: 'residential'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addContactSubmission(formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: 'residential'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Use contact content from Firestore or default values
  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Our Studio",
      details: contactContent?.address || "123 Design Avenue, Banjara Hills, Hyderabad, Telangana 500034",
      description: "Our main studio where we welcome clients and showcase our portfolio."
    },
    {
      icon: "📞",
      title: "Call Us",
      details: contactContent?.phone || "+91 98765 43210",
      description: "Speak directly with our design team for immediate assistance."
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: contactContent?.email || "hello@designstudioarchitects.com",
      description: "Send us your project details and we'll respond within 24 hours."
    },
    {
      icon: "⏰",
      title: "Business Hours",
      details: contactContent?.businessHours || "Mon - Sat: 9:00 AM - 7:00 PM",
      description: "We're available during these hours for consultations and meetings."
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📷", url: contactContent?.socialMedia?.instagram || "#" },
    { name: "Facebook", icon: "📘", url: contactContent?.socialMedia?.facebook || "#" },
    { name: "LinkedIn", icon: "💼", url: contactContent?.socialMedia?.linkedin || "#" },
    { name: "Pinterest", icon: "📌", url: contactContent?.socialMedia?.pinterest || "#" }
  ];

  const faqs = contactContent?.faqs && contactContent.faqs.length > 0 ? contactContent.faqs : [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A typical residential project takes 3-6 months, while larger commercial projects may take 6-12 months."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We offer a free initial consultation to discuss your project requirements and provide preliminary guidance."
    },
    {
      question: "What areas do you serve?",
      answer: "We primarily serve Hyderabad and surrounding areas, but we also take on projects across Telangana and Andhra Pradesh."
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
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space? Let's start a conversation about your dream project.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How Can We Help You?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{info.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{info.title}</h3>
                <p className="text-yellow-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{info.details}</p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section id="contact-form" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="renovation">Renovation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                    placeholder="What's your project about?"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project, requirements, and vision..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6 sm:space-y-8">
              {/* Map */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80">
                <iframe
                  src={contactContent?.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.45678901234567!3d17.41234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzQ0LjQiTiA3OMKwMjcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Design Studio Architects Location"
                />
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Contact</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2 sm:mr-3 text-lg">📞</span>
                    <span className="text-gray-700 text-sm sm:text-base">{contactContent?.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2 sm:mr-3 text-lg">✉️</span>
                    <span className="text-gray-700 text-sm sm:text-base">{contactContent?.email || 'hello@designstudioarchitects.com'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2 sm:mr-3 text-lg">📍</span>
                    <span className="text-gray-700 text-sm sm:text-base">{contactContent?.address || '123 Design Avenue, Banjara Hills, Hyderabad'}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Follow Us</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl transition-colors duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
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
            Schedule a free consultation and let's discuss how we can bring your vision to life.
          </p>
          <a href="#contact-form" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-500 font-semibold text-base sm:text-lg rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 inline-block text-center">
            Schedule Consultation
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
