import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import { Product, Category } from "./types";

/* =====================================================
   Helper: subir versión de catálogo e invalidar cache
===================================================== */
async function bumpCatalogVersion(note?: string) {
  const metaRef = doc(db, "meta", "catalog");
  await setDoc(
    metaRef,
    {
      version: increment(1),
      updatedAt: serverTimestamp(),
      note: note ?? "admin",
    },
    { merge: true }
  );

  // limpieza de cache local en esta pestaña
  try {
    const KEYS = [
      "catalogCacheV1:data",
      "catalogCacheV1:version",
      "catalogCacheV1:updatedAt",
      "catalogCacheV1:index",
    ];
    KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* localStorage puede no estar disponible; ignorar */
  }
}

interface Props {
  product: Product;
  categorias: Category[];
  categoriasSeleccionadas: string[];
  setCategoriasSeleccionadas: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;

  // ⬅️ el padre usará esto para actualizar estado local sin refetch
  onSave: (updated: Product, prevCats: string[], newCats: string[]) => void;
}

const EditProductModal: React.FC<Props> = ({
  product,
  categorias,
  categoriasSeleccionadas,
  setCategoriasSeleccionadas,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description || "");
  const [longDescription, setLongDescription] = useState(
    product.longDescription || ""
  );
  const [price, setPrice] = useState(product.price);
  const [sabores, setSabores] = useState<string[]>([]);
  const [usaSabores, setUsaSabores] = useState<boolean>(false);
  const [nuevoSabor, setNuevoSabor] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Guardamos las categorías originales para informar prevCats al onSave del padre
  const initialCatsRef = useRef<string[]>([]);
  useEffect(() => {
    initialCatsRef.current = [...categoriasSeleccionadas];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // ✅ Carga inicial de sabores desde el producto
  useEffect(() => {
    if (Array.isArray(product.sabores) && product.sabores.length > 0) {
      const filtrados = product.sabores.filter((s) => !!s.trim());
      setSabores(filtrados);
      setUsaSabores(true);
    }
  }, [product.sabores]);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    try {
      if (categoriasSeleccionadas.length === 0) {
        alert("❌ El producto debe pertenecer al menos a una categoría.");
        setSaving(false);
        return;
      }

      const saboresFiltrados = sabores
        .map((s) => s.trim())
        .filter((s, i, arr) => s && arr.indexOf(s) === i); // eliminar vacíos y duplicados

      const allSlugs = categorias.map((cat) => cat.slug);

      // Construir todas las operaciones y esperar juntas
      const writes: Promise<any>[] = [];

      for (const slug of allSlugs) {
        const ref = doc(db, "productos", slug, "items", product.id.toString());

        if (categoriasSeleccionadas.includes(slug)) {
          const updatedData = {
            id: product.id.toString(),
            title,
            description,
            longDescription,
            price,
            // campos mantenidos desde el producto original
            offerPrice: product.offerPrice ?? null,
            featuredId: (product as any).featuredId ?? null,
            exclusiveId: (product as any).exclusiveId ?? null,
            images: product.images || [],
            sinStock: product.sinStock ?? false,
            sabores: usaSabores ? saboresFiltrados : [],
            // MUY IMPORTANTE: preservar 'orden' para no romper el orden estable
            orden: (product as any).orden ?? 9999,
          };

          writes.push(setDoc(ref, updatedData, { merge: true }));
        } else {
          // si estaba y ya no, lo removemos (no crítico → no rompemos flujo)
          writes.push(deleteDoc(ref).catch(() => null));
        }
      }

      // Esperar todas las escrituras antes de declarar éxito
      await Promise.all(writes);

      // Subir versión: no bloquear ni mostrar error al usuario si falla
      bumpCatalogVersion("edit product / categories / sabores").catch((e) => {
        console.warn("bumpCatalogVersion falló:", e);
      });

      // Construimos el objeto actualizado para actualización local en el padre
      const updatedProduct: Product = {
        ...product,
        title,
        description,
        longDescription,
        price,
        sabores: usaSabores ? saboresFiltrados : [],
        orden: (product as any).orden ?? 9999,
        images: product.images || [],
      };

      const prevCats = initialCatsRef.current;
      const newCats = [...categoriasSeleccionadas];

      // 👉 Blindamos onSave para que un error del handler NO dispare el catch general
      try {
        onSave(updatedProduct, prevCats, newCats);
      } catch (e) {
        console.warn(
          "onSave (padre) arrojó un error, pero la escritura en Firestore fue exitosa:",
          e
        );
      }

      alert("✅ Cambios guardados");
    } catch (err) {
      console.error("🔥 ERROR al guardar producto:", err);
      alert("❌ Hubo un error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 relative border border-gray-300 overflow-y-auto max-h-[90vh]">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl font-bold mb-4">Detalle del Producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full object-contain border p-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded p-2"
              />

              <label className="text-sm font-medium">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded p-2"
              />

              <label className="text-sm font-medium">Descripción Larga</label>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="border rounded p-2"
              />

              <label className="text-sm font-medium">Precio</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border rounded p-2"
              />

              <label className="text-sm flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={usaSabores}
                  onChange={(e) => {
                    setUsaSabores(e.target.checked);
                    if (!e.target.checked) setSabores([]);
                  }}
                />
                ¿Este producto tiene sabores?
              </label>

              {usaSabores && (
                <div className="mt-2 flex flex-col gap-2">
                  {sabores.map((sabor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={sabor}
                        onChange={(e) => {
                          const nuevos = [...sabores];
                          nuevos[index] = e.target.value;
                          setSabores(nuevos);
                        }}
                        className="border p-1 rounded w-full"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSabores(sabores.filter((_, i) => i !== index))
                        }
                        className="text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nuevoSabor}
                      onChange={(e) => setNuevoSabor(e.target.value)}
                      placeholder="Nuevo sabor"
                      className="border p-1 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (nuevoSabor.trim()) {
                          setSabores([...sabores, nuevoSabor.trim()]);
                          setNuevoSabor("");
                        }
                      }}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <label className="text-sm font-medium mt-4">CATEGORÍAS:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-32 overflow-y-auto border p-2 rounded">
                {categorias.map((cat) => {
                  const isChecked = categoriasSeleccionadas.includes(cat.slug);
                  return (
                    <label
                      key={cat.slug}
                      className="text-sm flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategoriasSeleccionadas((prev) => [
                              ...prev,
                              cat.slug,
                            ]);
                          } else {
                            const nuevas = categoriasSeleccionadas.filter(
                              (slug) => slug !== cat.slug
                            );
                            if (nuevas.length === 0) {
                              alert(
                                "❌ El producto debe pertenecer al menos a una categoría."
                              );
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
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-60"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
