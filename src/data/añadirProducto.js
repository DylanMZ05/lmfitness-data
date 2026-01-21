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

// Nueva clave para asegurar que se ejecute este cambio específico (Creatina Gold en SIN-STOCK)
const ONE_SHOT_KEY = "__seed_creatina_gold_sinstock_v1__";

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

// Función principal para añadir el producto
export async function runAddProductosNuevos() {
  if (localStorage.getItem(ONE_SHOT_KEY) === "1") {
    console.log("⏭️ Seed de Creatina Gold (Sin Stock) ya ejecutado.");
    return;
  }

  // 1) Calcular ID siguiente global para evitar duplicados
  let maxId = await getGlobalMaxId();
  let nextId = maxId + 1;

  // 2) Definición del Producto en categoría SIN-STOCK
  const dataToSeed = [
    {
      categoryId: "SIN-STOCK",
      categoryName: "SIN STOCK",
      orden: 999, 
      items: [
        {
          id: nextId,
          images: ["assets/images/CREATINAS/creatina-gold-nutrition-creapure.webp"], 
          title: "CREATINA - GOLD NUTRITION CREAPURE (200gr)",
          description: "Creatina monohidrato de pureza alemana con sello Creapure. Máxima calidad farmacéutica para potencia y fuerza.",
          price: "CONSULTAR",
          offerPrice: null,
          longDescription:
            "**CREATINA CREAPURE | PUREZA ALEMANA, POTENCIA GOLD NUTRITION** // " +
            "La creatina más pura y reconocida del mundo ahora también es Gold. // " +
            "**Detalles del producto:** // " +
            "• Cantidad: 200g // " +
            "• Sabor: Sin sabor // " +
            "• Porciones: 40 (5g por porción) // " +
            "Con sello Creapure y código oficial de autenticidad 25GL21. Ideal para quienes buscan calidad farmacéutica y resultados reales. // " +
            "**Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // " +
            "**Beneficios principales:** // " +
            "• Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // " +
            "• Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // " +
            "• Recuperación más rápida, reduciendo el daño muscular y la inflamación. // " +
            "• Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
          featuredId: null,
          exclusiveId: null,
          sinStock: true, // Marcado como sin stock
        }
      ]
    }
  ];

  // 3) Ejecutar la subida a Firestore
  try {
    let totalAdded = 0;
    for (const group of dataToSeed) {
      const categoryRef = doc(db, "productos", group.categoryId);

      // Actualizar metadata de categoría
      await setDoc(categoryRef, {
        name: group.categoryName,
        slug: group.categoryId,
        orden: group.orden
      }, { merge: true });

      // Subir el producto a la subcolección 'items'
      for (const product of group.items) {
        const itemRef = doc(collection(categoryRef, "items"), String(product.id));
        await setDoc(itemRef, {
          ...product,
          updatedAt: serverTimestamp()
        }, { merge: true });
        totalAdded++;
      }
    }

    console.log(`✅ Se ha añadido el producto a la categoría ${dataToSeed[0].categoryId}.`);
    banner(`✅ Producto añadido a SIN STOCK.`);
    localStorage.setItem(ONE_SHOT_KEY, "1");
  } catch (error) {
    console.error("❌ Error al subir el producto:", error);
    banner("❌ Error al subir el producto a Firestore.", true);
  }
}

// EJECUCIÓN AUTOMÁTICA AL IMPORTAR EL ARCHIVO
runAddProductosNuevos();