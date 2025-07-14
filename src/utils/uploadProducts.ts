// // src/utils/uploadProducts.ts
// import { db } from "../firebase";
// import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
// import { productData } from "../data/products";

// export async function uploadAllProducts() {
//   console.log("📦 Iniciando reemplazo de productos...");

//   for (const category of productData) {
//     const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, "-");
//     const categoryRef = doc(db, "productos", slug);

//     // 1. Subir datos de la categoría
//     await setDoc(categoryRef, {
//       name: category.name,
//       slug,
//       image: category.image || "",
//     });

//     const itemsCollectionRef = collection(db, "productos", slug, "items");

//     // 2. Limpiar productos antiguos
//     const existingDocs = await getDocs(itemsCollectionRef);
//     for (const docSnap of existingDocs.docs) {
//       await deleteDoc(docSnap.ref);
//     }

//     // 3. Subir productos nuevos
//     for (const product of category.products) {
//       const productRef = doc(itemsCollectionRef, product.id.toString());

//       await setDoc(productRef, {
//         ...product,
//         price: typeof product.price === "string"
//           ? product.price.replace("$", "").replace(/\./g, "").trim()
//           : product.price,
//         offerPrice: typeof product.offerPrice === "string"
//           ? product.offerPrice.replace("$", "").replace(/\./g, "").trim()
//           : product.offerPrice || null,
//       });
//     }

//     console.log(`✅ Categoría "${category.name}" actualizada con ${category.products.length} productos.`);
//   }

//   console.log("✅ Todos los productos fueron reemplazados exitosamente.");
// }
