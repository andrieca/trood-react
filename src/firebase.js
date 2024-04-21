import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-ccGskTlkwVhzXOCyS2jQNCiW0FZIXSM",
  authDomain: "trood-vue-project.firebaseapp.com",
  projectId: "trood-vue-project",
  storageBucket: "trood-vue-project.appspot.com",
  messagingSenderId: "349131685169",
  appId: "1:349131685169:web:6bbb621f50c1844fa84410"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);