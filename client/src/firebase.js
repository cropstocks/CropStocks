import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7GEHEMblR0dcjbvbBvPAHze6NiqNUIsM",
  authDomain: "cropstocks-35037.firebaseapp.com",
  projectId: "cropstocks-35037",
  storageBucket: "cropstocks-35037.firebasestorage.app",
  messagingSenderId: "293357016738",
  appId: "1:293357016738:web:c3051e46775e43f7c5a9fb",
  measurementId: "G-N4YF03CQ1F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
