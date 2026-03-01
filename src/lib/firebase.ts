import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2ZuTjGba60IE6bvs8J4OQ0tg72A1EBeo",
  authDomain: "sorbodolio-party.firebaseapp.com",
  projectId: "sorbodolio-party",
  storageBucket: "sorbodolio-party.firebasestorage.app",
  messagingSenderId: "517374220328",
  appId: "1:517374220328:web:8262f6249c927908bffd1d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
