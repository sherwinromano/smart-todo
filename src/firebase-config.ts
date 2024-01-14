import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVUnaWy4kjObOKrnzkQohRjsnB6eEzBKc",
  authDomain: "todo-list-web-app-5e6b6.firebaseapp.com",
  projectId: "todo-list-web-app-5e6b6",
  storageBucket: "todo-list-web-app-5e6b6.appspot.com",
  messagingSenderId: "608369134",
  appId: "1:608369134:web:bb293bb639acd98145f6ff",
  measurementId: "G-K6S37N5T1H",
} as const;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dailyTask = collection(db, "Daily Task");
export const important = collection(db, "Important");
