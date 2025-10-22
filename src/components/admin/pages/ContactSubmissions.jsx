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

function ContactSubmissions() {
  const { contactSubmissions, updateContactStatus, deleteContactSubmission } = useData();
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredContacts = filter === 'all' 
    ? contactSubmissions 
    : contactSubmissions.filter(c => c.status === filter);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatus(id, newStatus);
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteContactSubmission(id);
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      } catch (error) {
        alert('Error deleting submission: ' + error.message);
      }
    }
  };

  const statusColors = {
    new: 'bg-green-100 text-green-800',
    contacted: 'bg-blue-100 text-blue-800',
    closed: 'bg-gray-100 text-gray-800'
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
            Contact Submissions
          </h1>
          <p className="text-gray-600">View and manage client inquiries</p>
        </div>
        
        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({contactSubmissions.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === 'new' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            New ({contactSubmissions.filter(c => c.status === 'new').length})
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-4">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                  selectedContact?.id === contact.id ? 'ring-2 ring-yellow-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[contact.status]}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-semibold mb-2">{contact.subject}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{contact.projectType}</span>
                  <span>{contact.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600">There are no contact submissions to display</p>
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="sticky top-6">
          {selectedContact ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Submission Details
                </h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone || 'Not provided'}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Project Type</label>
                  <p className="text-gray-900 capitalize">{selectedContact.projectType}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <p className="text-gray-700 leading-relaxed">{selectedContact.message}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Date</label>
                  <p className="text-gray-900">{selectedContact.date}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-center transition-colors"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">👈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select a submission</h3>
              <p className="text-gray-600">Click on a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactSubmissions;
