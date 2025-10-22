import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyAaRRHzIinD1aYBAyCsorCr41DlHJRfy9w",
  authDomain: "dsap-9e4c3.firebaseapp.com",
  projectId: "dsap-9e4c3",
  storageBucket: "dsap-9e4c3.firebasestorage.app",
  messagingSenderId: "121881025547",
  appId: "1:121881025547:web:8fde144bdc7d4e0fddbb0e",
  measurementId: "G-DR3MBJTL4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// Images are stored as base64 in Firestore (no Storage needed)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
