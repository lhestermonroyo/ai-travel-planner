// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIwrJkh8CT0_AJPXfeI6RVXfSYBAt2vSU',
  authDomain: 'ai-travel-planner-90c6b.firebaseapp.com',
  projectId: 'ai-travel-planner-90c6b',
  storageBucket: 'ai-travel-planner-90c6b.firebasestorage.app',
  messagingSenderId: '449182423743',
  appId: '1:449182423743:web:b78cbc53d5fd6abeaa040a',
  measurementId: 'G-KNVJ2LQP44',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
