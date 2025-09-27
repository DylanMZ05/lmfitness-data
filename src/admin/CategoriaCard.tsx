import { useEffect, useMemo, useState } from "react";
import { doc, updateDoc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "../firebase";
import { Category, Product } from "./types";
import ProductoAdminCard from "./ProductoAdminCard";
import { FaArrowUp, FaArrowDown, FaSave, FaSortAlphaDown, FaGripLines } from "react-icons/fa";

/* ==============================
   bump de versión (invalidar caché)
============================== */
async function bumpCatalogVersion(note?: string) {
  const metaRef = doc(db, "meta", "catalog");
  await setDoc(
    metaRef,
    { version: increment(1), updatedAt: serverTimestamp(), note: note ?? "reorder" },
    { merge: true }
  );
  try {
    ["catalogCacheV1:data","catalogCacheV1:version","catalogCacheV1:updatedAt","catalogCacheV1:index"]
      .forEach((k) => localStorage.removeItem(k));
  } catch (err) { void err; }
}

type Props = {
  category: Category;
  data: Category[];
  onEditProduct: (p: Product) => void;
  onUpdate: () => void; // se usa solo para reordenar; evitamos dispararlo desde las tarjetas hijas
};

// ✅ Orden estable: primero `orden`, si empatan, `id`
const byOrdenThenId = (a: Product, b: Product) => {
  const ao = Number((a as any).orden ?? 9999);
  const bo = Number((b as any).orden ?? 9999);
  if (ao !== bo) return ao - bo;
  return String(a.id).localeCompare(String(b.id), "es", { sensitivity: "base" });
};

const CategoriaCard: React.FC<Props> = ({ category, data, onEditProduct, onUpdate }) => {
  // snapshot local de los productos para reordenar sin pegar a la DB
  const [items, setItems] = useState<Product[]>([]);
  const [reorderMode, setReorderMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sorted = [...category.products].sort(byOrdenThenId);
    setItems(sorted);
  }, [category.products]);

  const canMove = useMemo(
    () => (idx: number, dir: number) => {
      const t = idx + dir;
      return t >= 0 && t < items.length;
    },
    [items]
  );

  const move = (idx: number, dir: number) => {
    if (!canMove(idx, dir)) return;
    const next = [...items];
    const t = idx + dir;
    [next[idx], next[t]] = [next[t], next[idx]];
    setItems(next);
  };

  const sortAZ = () => {
    const next = [...items].sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
    setItems(next);
  };

  const saveOrder = async () => {
    if (saving) return;
    setSaving(true);
    try {
      // asignamos índices 10,20,30... para permitir inserciones futuras
      const writes = items.map((p, i) => {
        const ref = doc(db, "productos", category.slug, "items", p.id.toString());
        return updateDoc(ref, { orden: (i + 1) * 10 });
      });

      // ✅ Esperar todos los updates (evita avisos mezclados)
      await Promise.all(writes);

      // Versión no bloqueante (si falla, no mostramos error al usuario)
      bumpCatalogVersion(`save order ${category.slug}`).catch((e) =>
        console.warn("bumpCatalogVersion falló:", e)
      );

      // Aviso único de éxito
      alert("✅ Orden guardado");

      // Refresco externo (si tu padre hace refetch aquí, es consciente)
      onUpdate();

      setReorderMode(false);
    } catch (err) {
      console.error("❌ Error al guardar el orden:", err);
      alert("❌ Hubo un error al guardar el orden.");
    } finally {
      setSaving(false);
    }
  };

  // ⛳ No-op para evitar refetches/alerts duplicados desde las tarjetas hijas
  const noopUpdate = () => {};

  return (
    <section className="mb-6 border border-black/10 rounded-lg overflow-hidden bg-white">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center gap-3">
          {category.image && (
            <img src={category.image} alt={category.name} className="h-8 w-8 object-contain" />
          )}
          <h3 className="text-lg font-bold">{category.name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded border ${reorderMode ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setReorderMode((v) => !v)}
            type="button"
            title="Reordenar productos"
          >
            <span className="inline-flex items-center gap-2">
              <FaGripLines /> {reorderMode ? "Salir" : "Reordenar"}
            </span>
          </button>

          {reorderMode && (
            <>
              <button
                className="px-3 py-1 rounded border bg-white"
                onClick={sortAZ}
                type="button"
                title="Ordenar A → Z"
              >
                <span className="inline-flex items-center gap-2">
                  <FaSortAlphaDown /> A → Z
                </span>
              </button>
              <button
                className="px-3 py-1 rounded border bg-green-600 text-white disabled:opacity-60"
                onClick={saveOrder}
                disabled={saving}
                type="button"
                title="Guardar orden"
              >
                <span className="inline-flex items-center gap-2">
                  <FaSave /> {saving ? "Guardando..." : "Guardar orden"}
                </span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3">
        {items.map((product, idx) => (
          <div key={`${product.id}-${category.slug}`} className="relative">
            {/* Controles de orden visibles solo en modo reordenar */}
            {reorderMode && (
              <div className="absolute -top-2 -right-2 z-10 flex flex-col gap-1">
                <button
                  className={`p-1 rounded-full shadow border bg-white ${!canMove(idx, -1) ? "opacity-40 cursor-not-allowed" : ""}`}
                  onClick={() => move(idx, -1)}
                  disabled={!canMove(idx, -1)}
                  type="button"
                  title="Subir"
                >
                  <FaArrowUp />
                </button>
                <button
                  className={`p-1 rounded-full shadow border bg-white ${!canMove(idx, +1) ? "opacity-40 cursor-not-allowed" : ""}`}
                  onClick={() => move(idx, +1)}
                  disabled={!canMove(idx, +1)}
                  type="button"
                  title="Bajar"
                >
                  <FaArrowDown />
                </button>
              </div>
            )}

            {/* Número de orden actual */}
            {reorderMode && (
              <span className="absolute -top-2 -left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                {idx + 1}
              </span>
            )}

            {/* Card existente del admin */}
            <ProductoAdminCard
              product={product}
              categorySlug={category.slug}
              allData={data}
              onEdit={() => onEditProduct(product)}
              // ⚠️ Pasamos un onUpdate no-op para evitar refetch/alertes duplicados desde el hijo
              onUpdate={noopUpdate}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriaCard;
