import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoiS0gwGhgyLc3RnXg95inJTI50Ip3x0g",
  authDomain: "capstone-project-firebase.firebaseapp.com",
  projectId: "capstone-project-firebase",
  storageBucket: "capstone-project-firebase.appspot.com",
  messagingSenderId: "407904818237",
  appId: "1:407904818237:web:cd90998fa4ef9c6dd9c654",
  measurementId: "G-HSY452QY03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
