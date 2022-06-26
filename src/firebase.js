// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC6w4eig27fQhVkONM1osj-YtozDop46ow',
  authDomain: 'dmarkit-e1901.firebaseapp.com',
  projectId: 'dmarkit-e1901',
  storageBucket: 'dmarkit-e1901.appspot.com',
  messagingSenderId: '736985279037',
  appId: '1:736985279037:web:72cc728b5e743789ffd854',
  measurementId: 'G-EXCZ4MZYHQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
