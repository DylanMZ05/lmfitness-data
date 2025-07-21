
// import { db } from "../firebase";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { productData } from "../data/products";

// export async function uploadSinStockSinEliminar() {
//   console.log("📦 Agregando productos nuevos a la categoría SIN STOCK (sin eliminar los existentes)...");

//   const sinStockCategory = productData.find(cat => cat.name.toUpperCase() === "SIN STOCK");
//   if (!sinStockCategory) {
//     console.warn("❌ No se encontró la categoría 'SIN STOCK'");
//     return;
//   }

//   const slug = sinStockCategory.slug || sinStockCategory.name.toLowerCase().replace(/\s+/g, "-");
//   const categoryRef = doc(db, "productos", slug);

//   // Crea o actualiza el documento de la categoría (sin tocar productos aún)
//   await setDoc(categoryRef, {
//     name: sinStockCategory.name,
//     slug,
//     image: sinStockCategory.image || "",
//     orden: sinStockCategory.orden ?? 999,
//   });

//   const itemsCollectionRef = collection(db, "productos", slug, "items");

//   for (const product of sinStockCategory.products) {
//     const productRef = doc(itemsCollectionRef, product.id.toString());

//     const cleanPrice = typeof product.price === "string"
//       ? Number(product.price.replace("$", "").replace(/\./g, "").trim())
//       : product.price;

//     const cleanOfferPrice = typeof product.offerPrice === "string"
//       ? Number(product.offerPrice.replace("$", "").replace(/\./g, "").trim())
//       : product.offerPrice ?? null;

//     await setDoc(productRef, {
//       ...product,
//       price: cleanPrice,
//       offerPrice: cleanOfferPrice,
//     });
//   }

//   console.log(`✅ Se añadieron ${sinStockCategory.products.length} productos nuevos a la categoría 'SIN STOCK'.`);
// }


