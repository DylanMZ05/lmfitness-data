// src/firebase/init.ts
import { initializeApp, type FirebaseApp } from "firebase/app";
import { initializeFirestore, type Firestore } from "firebase/firestore";

// ⚠️ Usa variables de entorno Vite (recomendado). Crea .env con estos VITE_*:
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

/**
 * Inicializa la app y devuelve una instancia de Firestore.
 * No abre ningún listener realtime.
 */
export const getDb = (): Firestore => {
  if (!app) app = initializeApp(firebaseConfig);
  if (!db) {
    // Long polling automático para entornos como PageSpeed/Proxys
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
      // experimentalForceLongPolling: true, // usa esto sólo si lo necesitás
    });
    // Alternativa (sin opciones): db = getFirestore(app)
  }
  return db;
};
