import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDOCFc-xh5BVPPexCTXLL0w-IhCdAiSays",
  authDomain: "mycv-3107.firebaseapp.com",
  projectId: "mycv-3107",
  storageBucket: "mycv-3107.appspot.com",
  messagingSenderId: "1083448601920",
  appId: "1:1083448601920:web:e84de0bb17cc8770855ea5",
  measurementId: "G-6BTCG2WQDR",
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export { db, storage, provider };
