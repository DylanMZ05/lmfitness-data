import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaEye, FaTimes } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  price: number;
  offerPrice?: number;
  images: string[];
  featuredId?: number;
  exclusiveId?: number;
  description?: string;
  longDescription?: string;
}

interface Category {
  name: string;
  slug: string;
  image?: string;
  orden?: number;
  products: Product[];
}

const CatalogoAdmin = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceEdits, setPriceEdits] = useState<Record<string, string>>({});
  const [offerPriceEdits, setOfferPriceEdits] = useState<Record<string, string>>({});
  const [offerEnabled, setOfferEnabled] = useState<Record<string, boolean>>({});
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

    const prices: Record<string, string> = {};
    const offers: Record<string, string> = {};
    const enabled: Record<string, boolean> = {};

    categorias.forEach((cat) =>
      cat.products.forEach((p) => {
        prices[p.id] = p.price.toString();
        offers[p.id] = p.offerPrice?.toString() ?? "";
        enabled[p.id] = p.offerPrice != null;
      })
    );

    setPriceEdits(prices);
    setOfferPriceEdits(offers);
    setOfferEnabled(enabled);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatePrice = async (
    categorySlug: string,
    productId: string,
    newPrice: string,
    offerPrice?: string | null
  ) => {
    try {
      const parsedPrice = parseFloat(newPrice);
      const parsedOffer = offerPrice ? parseFloat(offerPrice) : null;

      if (isNaN(parsedPrice)) {
        alert("❌ El precio no es válido.");
        return;
      }

      const ref = doc(db, "productos", categorySlug, "items", productId.toString());
      const updateData: { price: number; offerPrice?: number | null } = { price: parsedPrice };

      if (offerEnabled[productId]) {
        if (parsedOffer != null && !isNaN(parsedOffer)) {
          updateData.offerPrice = parsedOffer;
        } else {
          alert("❌ El precio en oferta no es válido.");
          return;
        }
      } else {
        updateData.offerPrice = null;
      }

      await updateDoc(ref, updateData);
      alert("✅ Precios actualizados");
      fetchData();
    } catch (err) {
      console.error("Error al actualizar precio:", err);
      alert("❌ Hubo un error: " + (err as Error).message);
    }
  };

  const getNextAvailableId = (type: "featured" | "exclusive") => {
    const ids: number[] = [];
    for (const category of data) {
      for (const product of category.products) {
        const value = type === "featured" ? product.featuredId : product.exclusiveId;
        if (typeof value === "number") ids.push(value);
      }
    }
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {data.map((category) => (
        <div key={category.slug} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {category.products.map((product) => (
              <div key={product.id} className="border rounded p-4 bg-white shadow flex flex-col">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  className="h-28 object-contain mb-2"
                />
                <h3 className="font-semibold text-sm">{product.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{category.slug}</p>

                <label className="text-sm mt-2 mb-1">Precio:</label>
                <input
                  type="number"
                  step="0.01"
                  value={priceEdits[product.id]}
                  onChange={(e) => setPriceEdits((prev) => ({ ...prev, [product.id]: e.target.value }))}
                  className="border p-1 text-sm rounded w-full mb-2"
                />

                <label className="text-sm flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={offerEnabled[product.id] || false}
                    onChange={(e) =>
                      setOfferEnabled((prev) => ({ ...prev, [product.id]: e.target.checked }))
                    }
                  />
                  Activar precio en oferta
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio en oferta"
                  value={offerPriceEdits[product.id] ?? ""}
                  onChange={(e) =>
                    setOfferPriceEdits((prev) => ({ ...prev, [product.id]: e.target.value }))
                  }
                  disabled={!offerEnabled[product.id]}
                  className={`border p-1 text-sm rounded w-full mb-2 ${
                    !offerEnabled[product.id] ? "bg-gray-100 text-gray-400" : ""
                  }`}
                />

                <label className="text-sm flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={product.exclusiveId != null}
                    onChange={async (e) => {
                      const ref = doc(db, "productos", category.slug, "items", product.id.toString());
                      if (e.target.checked) {
                        const nextId = getNextAvailableId("exclusive");
                        await updateDoc(ref, { exclusiveId: nextId });
                      } else {
                        await updateDoc(ref, { exclusiveId: null });
                      }
                      fetchData();
                    }}
                  />
                  Producto Exclusivo
                  {product.exclusiveId != null && (
                    <span className="text-xs text-gray-500 ml-1">#{product.exclusiveId}</span>
                  )}
                </label>

                <label className="text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={product.featuredId != null}
                    onChange={async (e) => {
                      const ref = doc(db, "productos", category.slug, "items", product.id.toString());
                      if (e.target.checked) {
                        const nextId = getNextAvailableId("featured");
                        await updateDoc(ref, { featuredId: nextId });
                      } else {
                        await updateDoc(ref, { featuredId: null });
                      }
                      fetchData();
                    }}
                  />
                  Producto Destacado
                  {product.featuredId != null && (
                    <span className="text-xs text-gray-500 ml-1">#{product.featuredId}</span>
                  )}
                </label>

                <button
                  onClick={() =>
                    handleUpdatePrice(
                      category.slug,
                      product.id,
                      priceEdits[product.id],
                      offerEnabled[product.id] ? offerPriceEdits[product.id] : null
                    )
                  }
                  className="my-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded"
                >
                  Guardar
                </button>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setCategoriasSeleccionadas(
                      data.filter((cat) => cat.products.some((p) => p.id === product.id)).map((cat) => cat.slug)
                    );
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-black text-sm px-2 py-1 rounded flex items-center justify-center gap-1"
                >
                  <FaEye /> Ver
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

    {selectedProduct && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 relative border border-gray-300 overflow-y-auto max-h-[90vh]">
          <div className="p-6">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setCategoriasSeleccionadas([]);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">Detalle del Producto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={selectedProduct.images?.[0] || "/placeholder.jpg"}
                  alt={selectedProduct.title}
                  className="w-full object-contain border p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Título</label>
                <input
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  className="border rounded p-2"
                />

                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  value={selectedProduct.description || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  className="border rounded p-2"
                />

                <label className="text-sm font-medium">Descripción Larga</label>
                <textarea
                  value={selectedProduct.longDescription || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) =>
                      prev ? { ...prev, longDescription: e.target.value } : prev
                    )
                  }
                  className="border rounded p-2"
                />

                <label className="text-sm font-medium">Precio</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct((prev) =>
                      prev ? { ...prev, price: Number(e.target.value) } : prev
                    )
                  }
                  className="border rounded p-2"
                />

                <label className="text-sm font-medium mt-2">CATEGORÍAS:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-32 overflow-y-auto border p-2 rounded">
                  {data.map((cat) => {
                    const isChecked = categoriasSeleccionadas.includes(cat.slug);
                    return (
                      <label key={cat.slug} className="text-sm flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCategoriasSeleccionadas((prev) => [...prev, cat.slug]);
                            } else {
                              const nuevas = categoriasSeleccionadas.filter((slug) => slug !== cat.slug);
                              if (nuevas.length === 0) {
                                alert("❌ El producto debe pertenecer al menos a una categoría.");
                                return;
                              }
                              setCategoriasSeleccionadas(nuevas);
                            }
                          }}
                        />
                        {cat.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
              onClick={async () => {
                try {
                  if (categoriasSeleccionadas.length === 0) {
                    alert("❌ El producto debe pertenecer al menos a una categoría.");
                    return;
                  }

                  const allSlugs = data.map((cat) => cat.slug);

                  for (const slug of allSlugs) {
                    const ref = doc(db, "productos", slug, "items", selectedProduct.id.toString());

                    if (categoriasSeleccionadas.includes(slug)) {
                      await setDoc(ref, {
                        ...selectedProduct,
                        id: selectedProduct.id.toString(),
                        offerPrice: selectedProduct.offerPrice ?? null,
                        featuredId: selectedProduct.featuredId ?? null,
                        exclusiveId: selectedProduct.exclusiveId ?? null,
                        images: selectedProduct.images || [],
                      });
                    } else {
                      const cat = data.find((c) => c.slug === slug);
                      if (cat && cat.products.some((p) => p.id === selectedProduct.id)) {
                        await deleteDoc(ref);
                      }
                    }
                  }

                  alert("✅ Cambios guardados");
                  setSelectedProduct(null);
                  setCategoriasSeleccionadas([]);
                  fetchData();
                } catch (err) {
                  console.error("🔥 ERROR al guardar producto:", err);
                  alert("❌ Hubo un error al guardar.");
                }
              }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    )}




    </div>
  );
};

export default CatalogoAdmin;
