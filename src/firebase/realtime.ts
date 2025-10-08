// src/firebase/realtime.ts
// import { getDb } from "./init";
// import { collection, onSnapshot } from "firebase/firestore";

let started = false;

/**
 * Arranca tus onSnapshot() de Firestore.
 * Se llama después del load o de la primera interacción del usuario.
 */
export const startRealtime = () => {
  if (started) return;
  started = true;

  // ⚠️ Cuando quieras usar realtime, descomenta:
  // const db = getDb();
  // const productosRef = collection(db, "productos");
  // onSnapshot(productosRef, (snap) => {
  //   console.log("Realtime productos:", snap.size);
  // }, (err) => {
  //   console.warn("Realtime error:", err);
  // });
};
