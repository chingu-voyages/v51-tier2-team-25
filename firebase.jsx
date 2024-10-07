import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getStorage, } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGK4eY08PLnltkiBhvhWBbJBkN5izQb7I",
  authDomain: "splice-566ff.firebaseapp.com",
  projectId: "splice-566ff",
  storageBucket: "splice-566ff.appspot.com",
  messagingSenderId: "359861429848",
  appId: "1:359861429848:web:45d2484f7e7c68a7eb4c2d"
};

let app, db, storage;

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