// src/data/añadirProducto.js
import { db } from "../firebase.js";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";

async function addProteinBars() {
  // 🔧 Cambiá este ID si tu categoría tiene otro slug
  const CATEGORY_ID = "barras-proteicas";

  const categoryRef = doc(db, "productos", CATEGORY_ID);
  const productsRef = collection(categoryRef, "items");

  const products = [
    {
      id: 86,
      images: ["assets/images/BARRAS-PROTEICAS/whey-protein-bar-mervick.webp"],
      title: "WHEY PROTEIN BAR – MERVICK (x12)",
      description:
        "Snack proteico ideal para sumar proteínas de forma práctica y rica.",
      price: "CONSULTAR",
      offerPrice: null,
      longDescription:
        "**WHEY PROTEIN BAR – MERVICK** // Caja por 12 unidades. // " +
        "**Por barra (46 g):** 15 g de proteína · 17 g de carbohidratos · 176 kcal. // " +
        "• Aporta proteínas de alta calidad // • Saludable y delicioso // " +
        "• Ideal para después del entrenamiento, entre comidas o como colación rápida.",
      featuredId: null,
      exclusiveId: null,
      sinStock: false,
    },
    {
      id: 84,
      images: ["assets/images/BARRAS-PROTEICAS/whey-low-carb-mervick.webp"],
      title: "WHEY LOW CARB – MERVICK (x12)",
      description:
        "Snack proteico bajo en carbohidratos, ideal para cuidar la ingesta sin resignar sabor.",
      price: "CONSULTAR",
      offerPrice: null,
      longDescription:
        "**WHEY LOW CARB – MERVICK** // Caja por 12 unidades. // " +
        "**Por barra (46 g):** 15 g de proteína · 2,8 g de carbohidratos · 138 kcal. // " +
        "• Aporta proteínas de alta calidad // • Bajo en carbos y calorías // " +
        "• Perfecto para después del entrenamiento, entre comidas o como colación rápida.",
      featuredId: null,
      exclusiveId: null,
      sinStock: false,
    },
    {
      id: 85,
      images: ["assets/images/BARRAS-PROTEICAS/barras-cereal-vitagly.webp"],
      title: "BARRAS DE CEREAL – VITAGLY (x10)",
      description:
        "Snack práctico, liviano y nutritivo para cualquier momento del día.",
      price: "CONSULTAR",
      offerPrice: null,
      longDescription:
        "**BARRAS DE CEREAL – VITAGLY** // Presentación: caja por 10 unidades. // " +
        "• Fuente de fibra // • Bajo contenido calórico // • *Sin TACC (apto celíacos)* // " +
        "Ideales para colaciones, lunch box o para llevar al trabajo/estudio. // " +
        "Sabores riquísimos: Cacao y almendras · Arándanos · Chocolate y cajú. // " +
        "(CONSULTAR SABORES DISPONIBLES).",
      featuredId: null,
      exclusiveId: null,
      sinStock: false,
    },
  ];

  try {
    // 🗑️ Intentar borrar el producto viejo (83) en sin-stock si existe
    try {
      await deleteDoc(doc(db, "productos", "sin-stock", "items", "83"));
      console.log(
        "🗑️ Eliminado producto 83 de productos/sin-stock/items (si existía)"
      );
    } catch {
      console.log("ℹ️ No se encontró 83 en sin-stock (continuamos).");
    }

    // ✍️ Upsert de los 3 productos en barras-proteicas
    for (const p of products) {
      await setDoc(doc(productsRef, String(p.id)), p);
      console.log(`✅ Cargado: ${p.title}`);
    }

    console.log("🎯 Listo: BARRAS PROTEICAS actualizadas.");
  } catch (error) {
    console.error("❌ Error al añadir productos:", error);
  }
}

addProteinBars();
