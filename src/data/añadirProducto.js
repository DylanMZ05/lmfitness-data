// src/data/añadirProducto.js
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  collectionGroup,
  getDocs,
} from "firebase/firestore";

const ONE_SHOT_KEY = "__seed_multivitaminico_sinstock_done__";

function banner(msg, isError = false) {
  try {
    const el = document.createElement("div");
    el.textContent = msg;
    el.style.position = "fixed";
    el.style.zIndex = "999999";
    el.style.left = "50%";
    el.style.top = "16px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "8px";
    el.style.fontFamily = "system-ui, sans-serif";
    el.style.background = isError ? "#ffdddd" : "#ddffdd";
    el.style.color = isError ? "#900" : "#060";
    el.style.boxShadow = "0 4px 12px rgba(0,0,0,.15)";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  } catch {}
}

async function getGlobalMaxId() {
  let maxId = 0;
  // Busca en TODAS las subcolecciones "items"
  const snap = await getDocs(collectionGroup(db, "items"));
  snap.forEach((d) => {
    const byDocId = Number(d.id);
    if (!Number.isNaN(byDocId)) maxId = Math.max(maxId, byDocId);
    const data = d.data();
    if (data && typeof data.id === "number") {
      maxId = Math.max(maxId, data.id);
    }
  });
  return maxId;
}

async function run() {
  // Evitar que corra 2 veces si refrescás
  if (localStorage.getItem(ONE_SHOT_KEY) === "1") {
    console.log("⏭️ Seed ya corrido (omitido).");
    return;
  }

  const CATEGORY_ID = "sin-stock";

  // 1) calcular ID siguiente global
  const maxId = await getGlobalMaxId();
  const nextId = maxId + 1;

  // 2) armar ref y producto
  const categoryRef = doc(db, "productos", CATEGORY_ID);
  const itemRef = doc(collection(categoryRef, "items"), String(nextId));

  const product = {
    id: nextId,
    images: [
      "assets/images/MULTIVITAMINICO-Y-COLAGENO/MULTIVITAMINICO-STAR-NUTRITION.webp",
      "assets/images/MULTIVITAMINICO-Y-COLAGENO/INFO-MULTIVITAMINICO-STAR-NUTRITION.webp",
    ],
    title: "MULTIVITAMINICO - STAR NUTRITION",
    description:
      "Multivitamínico completo con vitaminas y minerales esenciales. 60 comprimidos.",
    price: "CONSULTAR",
    offerPrice: null,
    longDescription:
      "**MULTIVITAMINICO - STAR NUTRITION** // " +
      "**Cantidad:** 60 comprimidos // **Porción:** 1 comprimido // **Servicios por envase:** 60 // " +
      "**Modo de uso:** Tomar 1 comprimido diario en un vaso de agua, preferentemente por la mañana. // " +
      "**Beneficios principales:** // " +
      "• Completa la dieta con vitaminas y minerales esenciales. // " +
      "• Fortalece el sistema inmunológico. // " +
      "• Aumenta la energía y reduce la fatiga. // " +
      "• Mejora la concentración y función cerebral. // " +
      "• Promueve la salud de piel, cabello y uñas. // " +
      "• Apoya el sistema nervioso.",
    featuredId: null,
    exclusiveId: null,
    sinStock: true, // importante: está en SIN STOCK
  };

  // 3) escribir
  await setDoc(itemRef, product, { merge: true });

  console.log(`✅ Subido a: ${itemRef.path}`);
  banner("✅ MULTIVITAMINICO subido a SIN STOCK");
  localStorage.setItem(ONE_SHOT_KEY, "1");
}

// Ejecutar cuando el DOM esté listo
if (typeof window !== "undefined" && document.readyState !== "loading") {
  run().catch((e) => {
    console.error(e);
    banner("❌ Error al subir (ver consola)", true);
  });
} else if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () =>
    run().catch((e) => {
      console.error(e);
      banner("❌ Error al subir (ver consola)", true);
    })
  );
}
