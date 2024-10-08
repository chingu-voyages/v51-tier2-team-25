import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getStorage, } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_FIREBASE_APP_ID 
};

let app, db, storage;

console.log("Storage Bucket:", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);


try {
  console.log("Initializing Firebase...");
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log("Firebase initialized successfully");

  console.log("Initializing Firestore...");
  db = getFirestore(app);
  console.log("Firestore initialized successfully");

  console.log("Initializing Firebase Storage...");
  storage = getStorage(app);
  console.log("Firebase Storage initialized successfully");


} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { app, db, storage };