// === helper: bump de versión de catálogo ===
import { doc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "../firebase";

async function bumpCatalogVersion(note?: string) {
  const metaRef = doc(db, "meta", "catalog");
  await setDoc(
    metaRef,
    {
      version: increment(1),
      updatedAt: serverTimestamp(),
      note: note ?? "admin",
    },
    { merge: true }
  );

  // limpiar cache local inmediato en esta pestaña
  try {
    localStorage.removeItem("catalogCacheV1:data");
    localStorage.removeItem("catalogCacheV1:version");
    localStorage.removeItem("catalogCacheV1:updatedAt");
    localStorage.removeItem("catalogCacheV1:index");
  } catch {}
}
