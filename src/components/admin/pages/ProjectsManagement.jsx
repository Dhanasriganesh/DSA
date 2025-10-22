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

function ProjectsManagement() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    description: '',
    img: ''
  });
  const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'url'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const categories = ['Residential', 'Commercial', 'Renovation', 'Hospitality'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, img: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, img: '' });
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageData = formData.img;

      // If using upload method and a file is selected, convert to base64
      if (uploadMethod === 'upload' && selectedFile) {
        imageData = await processImageForFirestore(selectedFile, (progress) => {
          setUploadProgress(progress);
        });
      }

      const projectData = {
        ...formData,
        img: imageData
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }
      resetForm();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      img: project.img
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Residential',
      description: '',
      img: ''
    });
    setEditingProject(null);
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
            Projects Management
          </h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                {project.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first project</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold"
          >
            Add Your First Project
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Modern Living Room"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Project Image *</label>
                
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
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
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
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    required={uploadMethod === 'url'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="https://example.com/image.jpg"
                  />
                )}

                {/* Image Preview */}
                {formData.img && (
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
                    <img src={formData.img} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Describe the project..."
                />
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
                  {uploading ? 'Processing...' : (editingProject ? 'Update Project' : 'Add Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsManagement;
