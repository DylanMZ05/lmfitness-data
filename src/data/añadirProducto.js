// src/data/añadirProducto.js
import { db } from "../firebase"; // Asumo que esta ruta funciona
import {
  doc,
  setDoc,
  collection,
  collectionGroup,
  getDocs,
} from "firebase/firestore";

const ONE_SHOT_KEY = "__seed_colageno_y_vitc_done__";

// Exportamos 'banner'
export function banner(msg, isError = false) { 
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

// Exportamos 'getGlobalMaxId' (aunque solo se usa internamente)
export async function getGlobalMaxId() {
  let maxId = 0;
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

// Exportamos la función principal
export async function runAddColagenos() {
  if (localStorage.getItem(ONE_SHOT_KEY) === "1") {
    console.log("⏭️ Seed de colágenos ya corrido (omitido por localStorage).");
    banner("⏭️ Seed de Colágenos ya corrido", false);
    return;
  }

  const CATEGORY_ID = "colagenos"; 
  const categoryRef = doc(db, "productos", CATEGORY_ID);
  
  // 1) calcular ID siguiente global
  let maxId = await getGlobalMaxId();
  let nextId = maxId + 1;
  
  // --- Definición de los productos a añadir ---
  const newProducts = [
    // --- Producto 1: COLAGENO - HYDROFLEX XBODY ---
    {
      id: nextId,
      images: [
        "assets/images/COLAGENOS/COLAGENO-HYDROFLEX-XBODY.webp",
      ],
      title: "COLÁGENO - HYDROFLEX XBODY",
      description:
        "Fórmula ultra-completa: Colágeno, Ácido Hialurónico, Coenzima Q10, Resveratrol, Biotina y Vitaminas C y E.",
      price: "CONSULTAR", 
      offerPrice: null,
      longDescription:
        "**COLÁGENO - HYDROFLEX XBODY** // " +
        "**Cantidad:** 240gr // **Porción:** 11gr (2 scoops) // **Servicios por envase:** 22 // " +
        "**Modo de uso:** Tomar 1 porción (2 scoops) en un vaso de agua al día, preferentemente por la mañana. // " +
        "**Beneficios principales:** // " +
        "• Fórmula más completa para el cuidado de piel, pelo, uñas y articulaciones. // " +
        "• Con Ácido Hialurónico, Coenzima Q10, Resveratrol, Biotina, Vitamina E y Vitamina C. // " +
        "• Cabello más fuerte y brilloso, uñas y huesos resistentes. // " +
        "• Piel suave y reluciente, retrasa el envejecimiento celular y previene arrugas.",
      featuredId: "novedad",
      exclusiveId: null,
      sinStock: false,
    },
    
    // --- Producto 2: VITAMINA C - ONEFIT ---
    {
      id: nextId + 1, 
      images: [
        "assets/images/COLAGENOS/vit-c-onefit.webp",
      ],
      title: "VITAMINA C - ONEFIT",
      description:
        "Vitamina C en polvo de alta pureza. Refuerza defensas, poderoso antioxidante. 150 gramos.",
      price: "CONSULTAR", 
      offerPrice: null,
      longDescription:
        "**VITAMINA C - ONEFIT** // " +
        "**Cantidad:** 150GR // **Porción:** 2.5GR (cucharita de te) // **Servicios por envase:** 60 // " +
        "**Modo de uso:** Tomar 1 porción (cucharita de te) por día, en cualquier momento del dia. // " +
        "**Beneficios principales:** // " +
        "• Refuerza el sistema inmunológico. // " +
        "• Potente antioxidante. // " +
        "• Favorece la recuperación muscular. // " +
        "• Estimula la producción de colágeno. // " +
        "• Mejora la absorción del hierro. // " +
        "• Apoya la salud cardiovascular.",
      featuredId: null, 
      exclusiveId: null,
      sinStock: false,
    },
  ];

  // --- 3) Iterar y subir los productos ---
  const uploadedPaths = [];
  for (const product of newProducts) {
    const itemRef = doc(collection(categoryRef, "items"), String(product.id));
    await setDoc(itemRef, product, { merge: true });
    uploadedPaths.push(itemRef.path);
  }
  
  // 4) Crear la metadata de la categoría 'colagenos'
  await setDoc(categoryRef, {
      name: "COLÁGENOS",
      orden: 200, 
      slug: "colagenos",
  }, { merge: true });

  console.log(`✅ Subidos ${newProducts.length} productos a Firestore.`);
  banner(`✅ ${newProducts.length} productos de COLÁGENOS y la categoría subidos`);
  localStorage.setItem(ONE_SHOT_KEY, "1"); 
}