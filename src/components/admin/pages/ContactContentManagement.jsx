import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function ContactContentManagement() {
  const { contactContent, updateContactContent } = useData();
  const [formData, setFormData] = useState({
    address: '123 Design Avenue, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91 98765 43210',
    email: 'hello@designstudioarchitects.com',
    businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    googleMapsUrl: '',
    socialMedia: {
      instagram: '#',
      facebook: '#',
      linkedin: '#',
      pinterest: '#'
    },
    faqs: []
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    if (contactContent) {
      setFormData(contactContent);
    }
  }, [contactContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateContactContent(formData);
      alert('Contact page content updated successfully!');
    } catch (error) {
      alert('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value
      }
    });
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [
        ...formData.faqs,
        { question: '', answer: '' }
      ]
    });
  };

  const updateFaq = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Contact Page Content
        </h1>
        <p className="text-gray-600">Manage your contact information and FAQs</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'contact' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📞 Contact Info
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'social' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📱 Social Media
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'faqs' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ❓ FAQs
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contact Information
            </h2>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="123 Design Avenue, City, State, Pincode"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="hello@designstudio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Business Hours *</label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Google Maps Embed URL</label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Get this from Google Maps → Share → Embed a map
              </p>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Social Media Links
            </h2>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Instagram URL</label>
              <input
                type="url"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Facebook URL</label>
              <input
                type="url"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.socialMedia.linkedin}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Pinterest URL</label>
              <input
                type="url"
                value={formData.socialMedia.pinterest}
                onChange={(e) => handleSocialMediaChange('pinterest', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="https://pinterest.com/yourprofile"
              />
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Frequently Asked Questions
              </h2>
              <button
                type="button"
                onClick={addFaq}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                + Add FAQ
              </button>
            </div>

            {formData.faqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs added yet. Click "+ Add FAQ" to add one.</p>
              </div>
            )}

            <div className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">FAQ {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g., How long does a typical project take?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Provide a detailed answer..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Contact Page Content'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactContentManagement;
