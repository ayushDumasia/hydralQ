import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvc7P0DDXs5nmX8sDm0Sgxi-GV8fKPixM',
  authDomain: 'hydraqv1.firebaseapp.com',
  projectId: 'hydraqv1',
  storageBucket: 'hydraqv1.firebasestorage.app',
  messagingSenderId: '130616886244',
  appId: '1:130616886244:web:6bb18ed6bc3609aaaffdf1',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
