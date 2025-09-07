import { useEffect, useState } from "react";
import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { Product, Category } from "./types";
import EditProductModal from "./EditProductModal";
import CategoriaCard from "./CategoriaCard";

const CatalogoAdmin = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 🔄 leer siempre fresco desde el server (evita cache local del SDK)
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
            orden: typeof d.orden === "number" ? d.orden : 9999, // 👈 soporte orden
          };
        });

        // ordenar por `orden` y luego por título
        productos.sort((a, b) => {
          const ao = Number((a as any).orden ?? 9999);
          const bo = Number((b as any).orden ?? 9999);
          if (ao !== bo) return ao - bo;
          return a.title.localeCompare(b.title, "es", { sensitivity: "base" });
        });

        categorias.push({
          name: catData.name,
          slug: catDoc.id,
          image: catData.image,
          orden: parseInt(catData.orden ?? "999", 10),
          products: productos,
        });
      }

      // ordenar categorías por `orden`
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
          onUpdate={() => fetchData()}
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
          onSave={() => {
            setSelectedProduct(null);
            setCategoriasSeleccionadas([]);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default CatalogoAdmin;
