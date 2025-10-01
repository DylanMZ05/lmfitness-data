import { useEffect, useState } from "react";
import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { Product, Category } from "./types";
import EditProductModal from "./EditProductModal";
import CategoriaCard from "./CategoriaCard";

const normalizeImage = (img: string) => {
  if (!img) return "";
  const s = String(img).trim();
  if (/^(https?:)?\/\//i.test(s) || /^data:/i.test(s)) return s; // http(s) o data URI
  if (s.startsWith("/")) return s; // ya absoluto en tu sitio
  return `/${s}`; // relativo → absoluto del sitio
};

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
      // Colección de categorías
      const categoriasSnap = await getDocsFromServer(collection(db, "productos"));

      // Mapear categorías base
      const cats = categoriasSnap.docs.map((catDoc) => {
        const catData = catDoc.data() as any;
        return {
          slug: catDoc.id,
          name: String(catData.name ?? ""),
          image: String(catData.image ?? ""),
          orden: parseInt(String(catData.orden ?? "999"), 10),
          ref: catDoc.ref,
        };
      });

      // Leer items en paralelo
      const itemsSnaps = await Promise.all(
        cats.map((c) => getDocsFromServer(collection(c.ref, "items")))
      );

      // Construir estructura final
      const categorias: Category[] = cats.map((c, i) => {
        const productos: Product[] = itemsSnaps[i].docs.map((docu) => {
          const d = docu.data() as any;
          return {
            id: docu.id,
            title: d.title,
            price: Number(d.price),
            offerPrice: d.offerPrice != null ? Number(d.offerPrice) : undefined,
            images: Array.isArray(d.images) ? d.images.map(normalizeImage) : [],
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

        return {
          name: c.name,
          slug: c.slug,
          image: c.image,
          orden: c.orden,
          products: productos,
        };
      });

      // Ordenar categorías por orden ascendente
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Actualización local (sin refetch) cuando se guarda desde el modal
  const applyLocalUpdate = (updated: Product, prevCats: string[], newCats: string[]) => {
    setData((prev) => {
      const next = prev.map((cat) => ({ ...cat, products: [...cat.products] }));
      const prevSet = new Set(prevCats);
      const newSet = new Set(newCats);

      // Remover de categorías que ya no correspondan
      for (const cat of next) {
        if (prevSet.has(cat.slug) && !newSet.has(cat.slug)) {
          const idx = cat.products.findIndex((p) => p.id === updated.id);
          if (idx !== -1) cat.products.splice(idx, 1);
        }
      }
      // Insertar / merge en nuevas categorías
      for (const cat of next) {
        if (newSet.has(cat.slug)) {
          const idx = cat.products.findIndex((p) => p.id === updated.id);
          if (idx === -1) {
            cat.products.push(updated);
          } else {
            cat.products[idx] = { ...cat.products[idx], ...updated };
          }
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
          onUpdate={() => {
            /* opcional: podés usar fetchData si necesitás refetch global tras reorden */
          }}
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
