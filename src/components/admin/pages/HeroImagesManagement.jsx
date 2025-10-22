import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { processImageForFirestore } from '../../../services/imageUploadService';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function HeroImagesManagement() {
  const { heroImages, addHeroImage, updateHeroImage, deleteHeroImage } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
    order: 1
  });
  const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'url'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const sortedImages = [...heroImages].sort((a, b) => a.order - b.order);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, url: '' });
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('heroImageUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageData = formData.url;

      // If using upload method and a file is selected, convert to base64
      if (uploadMethod === 'upload' && selectedFile) {
        imageData = await processImageForFirestore(selectedFile, (progress) => {
          setUploadProgress(progress);
        });
      }

      const heroImageData = {
        url: imageData,
        alt: formData.alt,
        order: formData.order
      };

      if (editingImage) {
        await updateHeroImage(editingImage.id, heroImageData);
      } else {
        await addHeroImage(heroImageData);
      }
      resetForm();
    } catch (error) {
      alert('Error saving hero image: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      alt: image.alt,
      order: image.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hero image?')) {
      try {
        await deleteHeroImage(id);
      } catch (error) {
        alert('Error deleting hero image: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      url: '',
      alt: '',
      order: heroImages.length + 1
    });
    setEditingImage(null);
    setShowModal(false);
    setSelectedFile(null);
    setUploadProgress(0);
    setUploading(false);
    setUploadMethod('upload');
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
            Hero Images Management
          </h1>
          <p className="text-gray-600">Manage homepage carousel images</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Add Hero Image
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-900 font-semibold mb-1">About Hero Images</p>
            <p className="text-sm text-blue-800">
              These images appear in the rotating carousel on the homepage. They auto-rotate every 5 seconds. Use high-quality images with a 16:9 aspect ratio for best results.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedImages.map((image) => (
          <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                  Order: {image.order}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-semibold">Alt Text:</span> {image.alt}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {heroImages.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hero images yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first hero image</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
          >
            Add Your First Hero Image
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editingImage ? 'Edit Hero Image' : 'Add New Hero Image'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Hero Image *</label>
                
                {/* Toggle between Upload and URL */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMethod('upload')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      uploadMethod === 'upload'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    📤 Upload from Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      uploadMethod === 'url'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🔗 Use URL
                  </button>
                </div>

                {/* Upload from Device */}
                {uploadMethod === 'upload' && (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="heroImageUpload"
                      />
                      <label
                        htmlFor="heroImageUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : 'Click to upload hero image'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 800KB (auto-compressed)
                        </span>
                      </label>
                    </div>
                    
                    {/* Upload Progress */}
                    {uploading && uploadProgress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Processing image...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Image URL */}
                {uploadMethod === 'url' && (
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required={uploadMethod === 'url'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="https://example.com/image.jpg"
                  />
                )}

                {/* Image Preview */}
                {formData.url && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Preview:</p>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Remove image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <img src={formData.url} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Alt Text *</label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Modern Living Room Interior"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Descriptive text for accessibility and SEO
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Display Order *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first in the carousel
                </p>
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
                  disabled={uploading}
                  className="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Processing...' : (editingImage ? 'Update Image' : 'Add Image')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroImagesManagement;
