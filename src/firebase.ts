// src/firebase.ts
import { initializeApp, FirebaseError } from "firebase/app";
import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Firestore con cache ilimitado y sin guardar undefined
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  ignoreUndefinedProperties: true,
});

// Persistencia offline (solo en navegador)
if (typeof window !== "undefined") {
  // Preferimos multi-tab; si no se puede, probamos single-tab
  enableMultiTabIndexedDbPersistence(db).catch(async (err) => {
    const code = (err as FirebaseError).code;
    if (code === "failed-precondition" || code === "unimplemented") {
      try {
        await enableIndexedDbPersistence(db);
      } catch (err2) {
        const code2 = (err2 as FirebaseError).code;
        console.warn(
          "[Firestore] IndexedDB persistence no disponible:",
          code2 || err2
        );
      }
    } else {
      console.warn("[Firestore] Persistence error:", code || err);
    }
  });
}

// Exportar instancias
export const auth = getAuth(app);
export const storage = getStorage(app);

// (Opcional) Analytics solo en producción y navegador
if (typeof window !== "undefined" && import.meta.env.MODE === "production") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

export default app;
