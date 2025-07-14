// src/hooks/useFirestoreProducts.ts
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export interface ProductoFirestore {
  id: string;
  title: string;
  price: number;
  offerPrice?: number;
  description?: string;
  images: string[];
  featuredId?: number;
  exclusiveId?: number;
  categoria?: string;
}

export interface CategoriaFirestore {
  name: string;
  slug: string;
  orden?: number;
  products: ProductoFirestore[];
}

export const useFirestoreProducts = () => {
  const [categorias, setCategorias] = useState<CategoriaFirestore[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    const snapshot = await getDocs(collection(db, "productos"));
    const categoriasTemp: CategoriaFirestore[] = [];

    for (const catDoc of snapshot.docs) {
      const catData = catDoc.data();
      const itemsSnap = await getDocs(collection(catDoc.ref, "items"));

      const productos = itemsSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          price: Number(data.price),
          offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
          description: data.description || "",
          images: Array.isArray(data.images)
            ? data.images.map((img: string) =>
                img.startsWith("/") ? img : `/${img}`
              )
            : [],
          featuredId: data.featuredId,
          exclusiveId: data.exclusiveId,
          categoria: catDoc.id,
        };
      });

      categoriasTemp.push({
        name: catData.name,
        slug: catDoc.id,
        orden: parseInt(catData.orden ?? "999"),
        products: productos,
      });
    }

    categoriasTemp.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
    setCategorias(categoriasTemp);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { categorias, loading };
};
