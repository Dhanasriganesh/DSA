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

function AboutContentManagement() {
  const { aboutContent, updateAboutContent } = useData();
  const [formData, setFormData] = useState({
    companyStory: '',
    foundedYear: '2012',
    achievements: {
      projectsCompleted: '500+',
      yearsExperience: '12+',
      teamMembers: '50+',
      clientSatisfaction: '98%'
    },
    awards: []
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    if (aboutContent) {
      setFormData(aboutContent);
    }
  }, [aboutContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateAboutContent(formData);
      alert('About page content updated successfully!');
    } catch (error) {
      alert('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAchievementChange = (field, value) => {
    setFormData({
      ...formData,
      achievements: {
        ...formData.achievements,
        [field]: value
      }
    });
  };

  const addAward = () => {
    setFormData({
      ...formData,
      awards: [
        ...formData.awards,
        { title: '', description: '', icon: '🏆', year: new Date().getFullYear() }
      ]
    });
  };

  const updateAward = (index, field, value) => {
    const updatedAwards = [...formData.awards];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    setFormData({ ...formData, awards: updatedAwards });
  };

  const removeAward = (index) => {
    const updatedAwards = formData.awards.filter((_, i) => i !== index);
    setFormData({ ...formData, awards: updatedAwards });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          About Page Content
        </h1>
        <p className="text-gray-600">Manage your About page content and information</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('story')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'story' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📖 Company Story
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'achievements' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎯 Achievements
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'awards' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏆 Awards
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Story Tab */}
        {activeTab === 'story' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Company Story
            </h2>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Founded Year</label>
              <input
                type="text"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="e.g., 2012"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Company Story *</label>
              <textarea
                value={formData.companyStory}
                onChange={(e) => setFormData({ ...formData, companyStory: e.target.value })}
                required
                rows="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Tell your company's story... This appears on the About page."
              />
              <p className="text-xs text-gray-500 mt-1">
                This text appears in the "Our Story" section of the About page
              </p>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Achievements
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Projects Completed</label>
                <input
                  type="text"
                  value={formData.achievements.projectsCompleted}
                  onChange={(e) => handleAchievementChange('projectsCompleted', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., 500+"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={formData.achievements.yearsExperience}
                  onChange={(e) => handleAchievementChange('yearsExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., 12+"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Team Members</label>
                <input
                  type="text"
                  value={formData.achievements.teamMembers}
                  onChange={(e) => handleAchievementChange('teamMembers', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., 50+"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Client Satisfaction</label>
                <input
                  type="text"
                  value={formData.achievements.clientSatisfaction}
                  onChange={(e) => handleAchievementChange('clientSatisfaction', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., 98%"
                />
              </div>
            </div>
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Awards & Recognition
              </h2>
              <button
                type="button"
                onClick={addAward}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                + Add Award
              </button>
            </div>

            {formData.awards.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No awards added yet. Click "+ Add Award" to add one.</p>
              </div>
            )}

            <div className="space-y-4">
              {formData.awards.map((award, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Award {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeAward(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Icon</label>
                        <input
                          type="text"
                          value={award.icon}
                          onChange={(e) => updateAward(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="🏆"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Year</label>
                        <input
                          type="number"
                          value={award.year}
                          onChange={(e) => updateAward(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="2023"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Award Title</label>
                      <input
                        type="text"
                        value={award.title}
                        onChange={(e) => updateAward(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g., Best Interior Design Firm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={award.description}
                        onChange={(e) => updateAward(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g., Awarded by Design Excellence Awards"
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
            {saving ? 'Saving...' : 'Save About Page Content'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AboutContentManagement;
