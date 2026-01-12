// src/data/añadirProducto.js
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  collectionGroup,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

// Nueva clave para asegurar que se ejecute este cambio específico
const ONE_SHOT_KEY = "__seed_combo_ena_creapure_proteina_v1__";

// Función para mostrar notificaciones en pantalla
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

// Función para obtener el ID numérico más alto en todo Firestore
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

// Función principal para añadir el combo
export async function runAddProductosNuevos() {
  if (localStorage.getItem(ONE_SHOT_KEY) === "1") {
    console.log("⏭️ Seed del combo ya ejecutado.");
    return;
  }

  // 1) Calcular ID siguiente global para evitar duplicados
  let maxId = await getGlobalMaxId();
  let nextId = maxId + 1;

  // 2) Definición del Combo (Creatina ENA Creapure + Proteína ENA True Made)
  const dataToSeed = [
    {
      categoryId: "combos-exclusivos",
      categoryName: "COMBOS EXCLUSIVOS",
      orden: 1, 
      items: [
        {
          id: nextId,
          // Nota: Asegúrate de que esta imagen exista en tu carpeta assets
          images: ["assets/images/COMBOS/combo-ena-creatina-proteina.webp"], 
          title: "COMBO ENA: CREATINA CREAPURE + PROTEÍNA TRUE MADE",
          description: "Pack Crecimiento: 1 Creatina Creapure (200g) + 1 Proteína True Made (453g). Máxima pureza y recuperación.",
          price: "CONSULTAR",
          offerPrice: null,
          longDescription:
            "**COMBO CRECIMIENTO - ENA SPORT** // " +
            "Este pack exclusivo combina los dos pilares fundamentales de la suplementación para deportistas exigentes. // " +
            "**Incluye:** 1 Creatina Creapure (200g) + 1 Proteína True Made (453g). // " +
            "**Detalle de los productos:** // " +
            "• **Creatina Creapure:** Monohidrato de pureza farmacológica con sello de certificación internacional para máxima fuerza y potencia. // " +
            "• **Proteína True Made:** Mezcla de suero lácteo concentrado y aislado con 25g de proteína por porción para el desarrollo muscular. // " +
            "**Modo de uso sugerido:** Mezclar 1 medida de proteína (31g) en agua o leche post-entrenamiento. Tomar 1 porción de creatina (5g) diariamente en cualquier momento del día para mantener la saturación muscular. // " +
            "**Beneficios principales:** // " +
            "• Favorece el desarrollo y mantenimiento de la masa muscular magra. // " +
            "• Acelera la recuperación post-esfuerzo reduciendo la inflamación. // " +
            "• Mejora el rendimiento físico en ejercicios de alta intensidad. // " +
            "• Aporta aminoácidos de alta calidad y rápida absorción.",
          featuredId: "novedad",
          exclusiveId: null,
          sinStock: false,
        }
      ]
    }
  ];

  // 3) Ejecutar la subida a Firestore
  try {
    let totalAdded = 0;
    for (const group of dataToSeed) {
      const categoryRef = doc(db, "productos", group.categoryId);

      // Actualizar metadata de categoría (sin borrar lo que ya tenga)
      await setDoc(categoryRef, {
        name: group.categoryName,
        slug: group.categoryId,
        orden: group.orden
      }, { merge: true });

      // Subir el combo a la subcolección 'items'
      for (const product of group.items) {
        const itemRef = doc(collection(categoryRef, "items"), String(product.id));
        await setDoc(itemRef, {
          ...product,
          updatedAt: serverTimestamp()
        }, { merge: true });
        totalAdded++;
      }
    }

    console.log(`✅ Se ha añadido el combo a la categoría ${dataToSeed[0].categoryId}.`);
    banner(`✅ Combo ENA subido correctamente.`);
    localStorage.setItem(ONE_SHOT_KEY, "1");
  } catch (error) {
    console.error("❌ Error al subir el combo:", error);
    banner("❌ Error al subir el combo a Firestore.", true);
  }
}