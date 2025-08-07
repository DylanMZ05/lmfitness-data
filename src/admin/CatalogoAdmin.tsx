import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
    const categoriasSnap = await getDocs(collection(db, "productos"));
    const categorias: Category[] = [];

    for (const catDoc of categoriasSnap.docs) {
      const catData = catDoc.data();
      const itemsSnap = await getDocs(collection(catDoc.ref, "items"));
      const productos: Product[] = itemsSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          price: Number(data.price),
          offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
          images: Array.isArray(data.images)
            ? data.images.map((img: string) => (img.startsWith("/") ? img : `/${img}`))
            : [],
          featuredId: data.featuredId,
          exclusiveId: data.exclusiveId,
          description: data.description,
          longDescription: data.longDescription,
          sinStock: data.sinStock || false,
          sabores: Array.isArray(data.sabores) ? data.sabores : [], // ✅ CORREGIDO: carga sabores si existen
        };
      });

      categorias.push({
        name: catData.name,
        slug: catDoc.id,
        image: catData.image,
        orden: parseInt(catData.orden ?? "999"),
        products: productos,
      });
    }

    categorias.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
    setData(categorias);
    setLoading(false);
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
