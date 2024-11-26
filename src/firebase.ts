import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBELJur4y8bYy4nOBvHSdwtcYyOWxPuqNM",
  authDomain: "healthlensai-6807e.firebaseapp.com",
  projectId: "healthlensai-6807e",
  storageBucket: "healthlensai-6807e.firebasestorage.app",
  messagingSenderId: "530335769196",
  appId: "1:530335769196:web:452f5157a27215013bee49",
  measurementId: "G-QM1X3N2G2T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);