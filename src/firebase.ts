// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Agregado

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGfjR8p1VB2DniEBmcH9r_exQDqF--5kM",
  authDomain: "lm-fitness-28a40.firebaseapp.com",
  projectId: "lm-fitness-28a40",
  storageBucket: "lm-fitness-28a40.appspot.com",
  messagingSenderId: "311656502449",
  appId: "1:311656502449:web:b77c3ea483a78935b93e90",
  measurementId: "G-7NNTNSRYZR",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancias
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Agregado

// (Opcional) Analytics solo en entorno de producción del navegador
if (typeof window !== "undefined" && import.meta.env.MODE === "production") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

export default app;
