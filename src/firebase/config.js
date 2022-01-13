import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  // Paste Your keys here
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
