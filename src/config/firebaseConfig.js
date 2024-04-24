import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLbb7c_5kKPNkkHNA6Ct7-LIcvyKRTQoE",
  authDomain: "monthlyexpensetracker-749b4.firebaseapp.com",
  projectId: "monthlyexpensetracker-749b4",
  storageBucket: "monthlyexpensetracker-749b4.appspot.com",
  messagingSenderId: "355525673029",
  appId: "1:355525673029:web:cc540e3212d31ab65c232c",
  measurementId: "G-4C8V2S8V14"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);