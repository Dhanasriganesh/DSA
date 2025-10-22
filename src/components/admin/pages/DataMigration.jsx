import React, { useState } from 'react';
import { migrateLocalStorageToFirestore, clearOldLocalStorage, checkLocalStorageData } from '../../../utils/migrateData';

// Add Google Fonts import for Playfair Display
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

function DataMigration() {
  const [migrating, setMigrating] = useState(false);
  const [migrationResults, setMigrationResults] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);

  const handleCheckData = () => {
    const data = checkLocalStorageData();
    setLocalStorageData(data);
  };

  const handleMigrate = async () => {
    if (!window.confirm('This will copy all localStorage data to Firestore. Continue?')) {
      return;
    }

    setMigrating(true);
    try {
      const results = await migrateLocalStorageToFirestore();
      setMigrationResults(results);
      alert('Migration completed! Check the console for details. Please refresh the page to see your data.');
    } catch (error) {
      alert('Migration failed: ' + error.message);
    } finally {
      setMigrating(false);
    }
  };

  const handleClearLocalStorage = () => {
    if (!window.confirm('This will delete old localStorage data. Make sure migration was successful first! Continue?')) {
      return;
    }

    clearOldLocalStorage();
    alert('localStorage cleared! Your data is now only in Firestore.');
    setLocalStorageData(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Data Migration Tool
        </h1>
        <p className="text-gray-600">Migrate old localStorage data to Firestore</p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-900 font-semibold mb-2">About This Tool</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              This tool helps you migrate data from the old localStorage system to the new Firestore database. 
              If you had projects, testimonials, or team members before Firebase integration, use this to transfer them.
              You only need to run this once.
            </p>
          </div>
        </div>
      </div>

      {/* Check Data */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Step 1: Check localStorage Data
        </h2>
        <p className="text-gray-600 mb-4">First, let's see what data exists in your browser's localStorage.</p>
        <button
          onClick={handleCheckData}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          Check localStorage Data
        </button>

        {localStorageData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900 mb-2">Found in localStorage:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {Object.entries(localStorageData).map(([key, value]) => {
                if (value) {
                  try {
                    const parsed = JSON.parse(value);
                    return <li key={key}>✅ {key}: {parsed.length} items</li>;
                  } catch (error) {
                    return <li key={key}>⚠️ {key}: Invalid data</li>;
                  }
                } else {
                  return <li key={key}>❌ {key}: No data</li>;
                }
              })}
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Open browser console (F12) for detailed information
            </p>
          </div>
        )}
      </div>

      {/* Migrate Data */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Step 2: Migrate to Firestore
        </h2>
        <p className="text-gray-600 mb-4">
          This will copy all localStorage data to Firestore. Run this only once!
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-900 font-semibold mb-1">⚠️ Before Migration:</p>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Make sure Firestore rules are updated</li>
            <li>• Make sure you're logged in as admin</li>
            <li>• Check console (F12) for any errors</li>
            <li>• Only run this once!</li>
          </ul>
        </div>

        <button
          onClick={handleMigrate}
          disabled={migrating}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {migrating ? 'Migrating...' : 'Migrate Data to Firestore'}
        </button>

        {migrationResults && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">✅ Migration Complete!</p>
            <ul className="space-y-1 text-sm text-green-800">
              <li>✅ Projects: {migrationResults.projects} migrated</li>
              <li>✅ Testimonials: {migrationResults.testimonials} migrated</li>
              <li>✅ Team Members: {migrationResults.teamMembers} migrated</li>
              <li>✅ Hero Images: {migrationResults.heroImages} migrated</li>
            </ul>
            {migrationResults.errors.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-red-600">Errors:</p>
                <ul className="text-sm text-red-600">
                  {migrationResults.errors.map((err, i) => (
                    <li key={i}>❌ {err}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-green-700 mt-3">
              Please refresh the page to see your migrated data in the admin panel!
            </p>
          </div>
        )}
      </div>

      {/* Clear localStorage */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Step 3: Clear localStorage (Optional)
        </h2>
        <p className="text-gray-600 mb-4">
          After successful migration, you can clear the old localStorage data.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-900 font-semibold mb-1">⚠️ Warning:</p>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Only do this AFTER successful migration</li>
            <li>• Make sure data is in Firestore</li>
            <li>• Check admin pages show your data</li>
            <li>• This cannot be undone!</li>
          </ul>
        </div>

        <button
          onClick={handleClearLocalStorage}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          Clear Old localStorage Data
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          How to Use This Tool
        </h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span><strong>Check Data:</strong> Click "Check localStorage Data" to see what you have</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span><strong>Migrate:</strong> Click "Migrate Data to Firestore" to transfer data</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span><strong>Verify:</strong> Check admin pages to confirm data migrated</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span><strong>Refresh:</strong> Reload the page to see your data</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <span><strong>Clean Up:</strong> Optionally clear old localStorage</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default DataMigration;
