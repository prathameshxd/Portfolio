import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ENVIRONMENT VARIABLES:
// These VITE_FIREBASE_* variables are exposed to the client bundle by Vite.
// They are safe to be public for Firebase as long as Firebase Security Rules are correctly configured.
// However, any private API keys MUST NEVER be committed to source control.
// Ensure your actual .env file is in .gitignore.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
