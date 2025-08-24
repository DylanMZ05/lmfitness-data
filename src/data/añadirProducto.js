// src/data/añadirProducto.js
import { db } from "../firebase.js"; 
import { doc, setDoc, collection } from "firebase/firestore";

async function addSingleProduct() {
  const newProduct = {
    id: 83,
    images: ["assets/images/COMBOS/belleza.webp"],
    title: "COMBO BELLEZA",
    description: "Colágeno Hydroflex + Vitamina C, la fórmula más completa para piel, cabello, uñas y articulaciones.",
    price: "$35.000",
    offerPrice: "$29.000",
    longDescription:
      "**COMBO BELLEZA** // El colágeno HYDROFLEX de la línea XBODY es la fórmula más completa para el cuidado de tu piel, pelo, uñas y articulaciones. // " +
      "Con el aporte de: Ácido hialurónico, Coenzima Q10, Resveratrol, Biotina, Vitamina E y Vitamina C. // " +
      "👉 Beneficios: Cabello más fuerte y brilloso, uñas y huesos resistentes, piel suave y reluciente, retraso del envejecimiento celular y prevención de arrugas. // " +
      "Además, acompañado de la Vitamina C de OneFit que acelera estos procesos y estimula la producción natural de colágeno. // " +
      "✨ ¡El combo ideal para cuidar tu belleza desde adentro!",
    featuredId: null,
    exclusiveId: null,
    sinStock: true,
  };

  try {
    // ✅ ahora va a productos/sin-stock/items
    const categoryRef = doc(db, "productos", "sin-stock");
    const productsRef = collection(categoryRef, "items");

    await setDoc(doc(productsRef, String(newProduct.id)), newProduct);

    console.log("✅ Producto añadido con éxito en productos/sin-stock/items");
  } catch (error) {
    console.error("❌ Error al añadir producto:", error);
  }
}

addSingleProduct();
