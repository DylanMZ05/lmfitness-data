// src/data/añadirProducto.js
import { db } from "../firebase"; // Asumo que esta ruta funciona
import {
  doc,
  setDoc,
  collection,
  collectionGroup,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const ONE_SHOT_KEY = "__seed_creatina_proteina_ena_v2__";

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

// Función principal para añadir los productos
export async function runAddProductosNuevos() {
  if (localStorage.getItem(ONE_SHOT_KEY) === "1") {
    console.log("⏭️ Seed ya ejecutado anteriormente.");
    return;
  }

  // 1) Calcular ID siguiente global
  let maxId = await getGlobalMaxId();
  let nextId = maxId + 1;

  // 2) Definición de productos por categoría (IDs según captura de pantalla)
  const dataToSeed = [
    {
      categoryId: "creatinas",
      categoryName: "CREATINAS MONOHIDRATO",
      orden: 60, // Ajustar según preferencia
      items: [
        {
          id: nextId++,
          images: ["assets/images/CREATINAS/myprotein-creatina-250gr.webp"],
          title: "CREATINA - MYPROTEIN",
          description: "Calidad importada premium. Una de las marcas más vendidas del mundo. 250 gramos.",
          price: "CONSULTAR",
          offerPrice: null,
          longDescription:
            "**CREATINA - MYPROTEIN** // " +
            "**Cantidad:** 250g // **Sabor:** Sin sabor // **Porciones:** 50 (5g por porción) // " +
            "**Detalle:** MYPROTEIN es una de las marcas más vendidas a lo amplio del mundo con la mayor calidad del mercado. Sin dudas de las mejores creatinas IMPORTADAS. // " +
            "**Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // " +
            "**Beneficios principales:** // " +
            "• Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // " +
            "• Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // " +
            "• Recuperación más rápida, reduciendo el daño muscular y la inflamación. // " +
            "• Beneficios cognitivos, ayudando a funciones como la memoria y concentración.",
          featuredId: "novedad",
          exclusiveId: null,
          sinStock: false,
        },
        {
          id: nextId++,
          images: ["assets/images/CREATINAS/creatina-creapure-ena-sport-200gr.webp"],
          title: "CREATINA - CREAPURE ENA SPORT",
          description: "Máxima pureza garantizada con sello Creapure®. Creatina Monohidrato de 200g.",
          price: "CONSULTAR",
          offerPrice: null,
          longDescription:
            "**CREATINA - CREAPURE ENA SPORT (200gr)** // " +
            "**Cantidad:** 200g // **Sabor:** Sin sabor // **Porciones:** 40 (5g por porción) // " +
            "**Detalle:** Con sello de CERTIFICACION CREAPURE garantizando la mayor pureza en Creatina Monohidrato. // " +
            "**Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // " +
            "**Beneficios principales:** // " +
            "• Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // " +
            "• Aumento de la masa muscular. // " +
            "• Recuperación muscular optimizada. // " +
            "• Mayor pureza y calidad farmacológica gracias al sello Creapure.",
          featuredId: null,
          exclusiveId: null,
          sinStock: false,
        }
      ]
    },
    {
      categoryId: "proteinas",
      categoryName: "PROTEÍNAS",
      orden: 100, // Ajustar según preferencia
      items: [
        {
          id: nextId++,
          images: ["assets/images/PROTEINAS/proteina-ena-true-made.webp"],
          title: "PROTEINA – ENA TRUE MADE",
          description: "Suero lácteo concentrado y aislado. 25g de proteína por porción. Favorece desarrollo muscular.",
          price: "CONSULTAR",
          offerPrice: null,
          longDescription:
            "**PROTEINA – ENA TRUE MADE** // " +
            "**Cantidad:** 453 g // **Porción:** 31 g // **Servicios:** 14 // " +
            "**Información nutricional (31g):** Proteína: 25g | Carbohidratos: 1.9g | Grasas: 2.3g // " +
            "**Detalle:** Proteína de suero lácteo concentrada y aislada de alta calidad, diseñada para favorecer el desarrollo muscular y acelerar la recuperación. // " +
            "**Modo de uso:** Mezclar 1 medida (31g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día. Máximo 2 porciones al día. // " +
            "**Beneficios principales:** // " +
            "• Favorece el desarrollo y mantenimiento de la masa muscular. // " +
            "• Acelera la recuperación post-entrenamiento. // " +
            "• Aporta proteína de alta calidad y rápida absorción. // " +
            "• Ideal para complementar tu dieta de forma práctica.",
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

      // Actualizar metadata de categoría (merge para no borrar lo existente)
      await setDoc(categoryRef, {
        name: group.categoryName,
        slug: group.categoryId,
        orden: group.orden
      }, { merge: true });

      // Subir cada producto a la subcolección 'items'
      for (const product of group.items) {
        const itemRef = doc(collection(categoryRef, "items"), String(product.id));
        await setDoc(itemRef, {
          ...product,
          updatedAt: serverTimestamp()
        }, { merge: true });
        totalAdded++;
      }
    }

    console.log(`✅ Se han añadido/actualizado ${totalAdded} productos.`);
    banner(`✅ ${totalAdded} productos subidos correctamente.`);
    localStorage.setItem(ONE_SHOT_KEY, "1");
  } catch (error) {
    console.error("❌ Error al subir productos:", error);
    banner("❌ Error al subir productos a Firestore.", true);
  }
}