import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function TestimonialsManagement() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    role: '',
    rating: 5,
    featured: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData);
      } else {
        await addTestimonial(formData);
      }
      resetForm();
    } catch (error) {
      alert('Error saving testimonial: ' + error.message);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      text: testimonial.text,
      author: testimonial.author,
      role: testimonial.role,
      rating: testimonial.rating || 5,
      featured: testimonial.featured || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
      } catch (error) {
        alert('Error deleting testimonial: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      author: '',
      role: '',
      rating: 5,
      featured: false
    });
    setEditingTestimonial(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Testimonials Management
          </h1>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Rating & Featured Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-lg">★</span>
                    ))}
                  </div>
                  {testimonial.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{typeof testimonial.text === 'string' ? testimonial.text : 'No text available'}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first testimonial</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
          >
            Add Your First Testimonial
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Client Name *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Priya Sharma"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Role/Location *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Homeowner, Mumbai"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rating *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Testimonial Text *</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter the client's testimonial..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="featured" className="text-gray-700 font-medium">
                  Featured Testimonial (Display prominently on homepage)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialsManagement;
