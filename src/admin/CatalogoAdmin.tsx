import { useEffect, useState } from "react";
import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { Product, Category } from "./types";
import EditProductModal from "./EditProductModal";
import CategoriaCard from "./CategoriaCard";

const sortProductosEstable = (arr: Product[]) => {
  arr.sort((a, b) => {
    const ao = Number((a as any).orden ?? 9999);
    const bo = Number((b as any).orden ?? 9999);
    if (ao !== bo) return ao - bo;
    return String(a.id).localeCompare(String(b.id), "es", { sensitivity: "base" });
  });
};

const CatalogoAdmin = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoriasSnap = await getDocsFromServer(collection(db, "productos"));
      const categorias: Category[] = [];

      for (const catDoc of categoriasSnap.docs) {
        const catData = catDoc.data();
        const itemsSnap = await getDocsFromServer(collection(catDoc.ref, "items"));
        const productos: Product[] = itemsSnap.docs.map((docu) => {
          const d = docu.data() as any;
          return {
            id: docu.id,
            title: d.title,
            price: Number(d.price),
            offerPrice: d.offerPrice != null ? Number(d.offerPrice) : undefined,
            images: Array.isArray(d.images)
              ? d.images.map((img: string) => (img.startsWith("/") ? img : `/${img}`))
              : [],
            featuredId: d.featuredId,
            exclusiveId: d.exclusiveId,
            description: d.description,
            longDescription: d.longDescription,
            sinStock: Boolean(d.sinStock),
            sabores: Array.isArray(d.sabores) ? d.sabores : [],
            orden: typeof d.orden === "number" ? d.orden : 9999,
          };
        });

        sortProductosEstable(productos);

        categorias.push({
          name: catData.name,
          slug: catDoc.id,
          image: catData.image,
          orden: parseInt(catData.orden ?? "999", 10),
          products: productos,
        });
      }

      categorias.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
      setData(categorias);
    } catch (e) {
      console.error("Error cargando catálogo:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ⬇️ Actualización local sin refetch
  const applyLocalUpdate = (updated: Product, prevCats: string[], newCats: string[]) => {
    setData((prev) => {
      const next = prev.map((cat) => ({ ...cat, products: [...cat.products] }));
      const prevSet = new Set(prevCats);
      const newSet = new Set(newCats);

      // remover donde ya no va
      for (const cat of next) {
        if (prevSet.has(cat.slug) && !newSet.has(cat.slug)) {
          const idx = cat.products.findIndex((p) => p.id === updated.id);
          if (idx !== -1) cat.products.splice(idx, 1);
        }
      }
      // insertar/actualizar donde corresponde
      for (const cat of next) {
        if (newSet.has(cat.slug)) {
          const idx = cat.products.findIndex((p) => p.id === updated.id);
          if (idx === -1) cat.products.push(updated);
          else cat.products[idx] = { ...cat.products[idx], ...updated };
          sortProductosEstable(cat.products);
        }
      }
      return next;
    });
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {data.map((category) => (
        <CategoriaCard
          key={category.slug}
          category={category}
          data={data}
          onEditProduct={(product) => {
            setSelectedProduct(product);
            const cats = data
              .filter((cat) => cat.products.some((p) => p.id === product.id))
              .map((cat) => cat.slug);
            setCategoriasSeleccionadas(cats);
          }}
          // ⚠️ Importante: que CategoriaCard NO llame a refetch al cerrar el modal.
          // Si CategoriaCard usa onUpdate para otras acciones (reordenar manual, etc.),
          // podés dejar un handler que SOLO toque estado local y evite fetchData().
        />
      ))}

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          categorias={data}
          categoriasSeleccionadas={categoriasSeleccionadas}
          setCategoriasSeleccionadas={setCategoriasSeleccionadas}
          onClose={() => {
            setSelectedProduct(null);
            setCategoriasSeleccionadas([]);
          }}
          // 👉 sin refetch: aplicamos actualización local
          onSave={(updatedProduct: Product, prevCats: string[], newCats: string[]) => {
            setSelectedProduct(null);
            setCategoriasSeleccionadas([]);
            applyLocalUpdate(updatedProduct, prevCats, newCats);
          }}
        />
      )}
    </div>
  );
};

export default CatalogoAdmin;
