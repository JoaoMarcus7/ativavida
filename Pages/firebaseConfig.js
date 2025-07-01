// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAV50muO4U5cInE20G_K003oQa6chnPtRw",
  authDomain: "ativa-vida.firebaseapp.com",
  projectId: "ativa-vida",
  storageBucket: "ativa-vida.appspot.com",
  messagingSenderId: "282400954907",
  appId: "1:282400954907:web:1e9341548858db0fe736be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;