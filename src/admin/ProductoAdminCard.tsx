import React, { MouseEvent, useMemo, useState } from "react";
import { Product, Category } from "./types";
import { doc, updateDoc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "../firebase";
import { FaEye } from "react-icons/fa";

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
  } catch (err) {
    void err; // <- satisface el linter
  }
}

interface Props {
  product: Product;
  categorySlug: string;
  allData: Category[];
  onEdit: () => void;
  onUpdate: () => void;
  /** Callback opcional para actualizar la UI del listado de forma optimista */
  onQuickPatch?: (productId: string | number, patch: Partial<Product>) => void;
}

const stop = (e: MouseEvent | React.ChangeEvent<any>) => {
  e.preventDefault?.();
  e.stopPropagation?.();
};

const ProductoAdminCard: React.FC<Props> = ({
  product,
  categorySlug,
  allData,
  onEdit,
  onUpdate,
  onQuickPatch,
}) => {
  // ====== Estado local para edición de precios ======
  const [price, setPrice] = useState(product.price.toString());
  const [offerPrice, setOfferPrice] = useState(product.offerPrice?.toString() ?? "");
  const [offerEnabled, setOfferEnabled] = useState(!!product.offerPrice);

  // ====== Estado local para accesos rápidos (optimista) ======
  const [exclusiveId, setExclusiveId] = useState<number | null>(
    (product as any).exclusiveId ?? null
  );
  const [featuredId, setFeaturedId] = useState<number | null>(
    (product as any).featuredId ?? null
  );
  const [sinStock, setSinStock] = useState<boolean>(Boolean(product.sinStock));

  // flags para evitar dobles clicks concurrentes en toggles
  const [togglingExclusive, setTogglingExclusive] = useState(false);
  const [togglingFeatured, setTogglingFeatured] = useState(false);
  const [togglingSinStock, setTogglingSinStock] = useState(false);

  const itemRef = useMemo(
    () => doc(db, "productos", categorySlug, "items", product.id.toString()),
    [categorySlug, product.id]
  );

  const handleUpdate = async () => {
    const parsedPrice = parseFloat(price);
    const parsedOffer = offerPrice ? parseFloat(offerPrice) : null;

    if (isNaN(parsedPrice)) {
      alert("❌ El precio no es válido.");
      return;
    }
    if (offerEnabled && (parsedOffer === null || isNaN(parsedOffer))) {
      alert("❌ El precio en oferta no es válido.");
      return;
    }

    try {
      await updateDoc(itemRef, {
        price: parsedPrice,
        offerPrice: offerEnabled ? parsedOffer : null,
      });

      await bumpCatalogVersion("update price/offer");
      alert("✅ Precios actualizados");
      onUpdate(); // si preferís evitar refetch general, podés comentar esto
    } catch (err) {
      console.error("❌ Error al guardar:", err);
      alert("❌ Hubo un error al guardar.");
    }
  };

  // Siguiente ID disponible para featured/exclusive
  const getNextAvailableId = (type: "featured" | "exclusive") => {
    const ids: number[] = [];
    for (const category of allData) {
      for (const prod of category.products) {
        const val = type === "featured" ? (prod as any).featuredId : (prod as any).exclusiveId;
        if (typeof val === "number") ids.push(val);
      }
    }
    return ids.length ? Math.max(...ids) + 1 : 1;
  };

  // ========= Toggles con patch optimista + rollback =========
  const onToggleExclusive = async (e: React.ChangeEvent<HTMLInputElement>) => {
    stop(e);
    if (togglingExclusive) return;
    setTogglingExclusive(true);

    const prev = exclusiveId;
    const next = e.target.checked ? getNextAvailableId("exclusive") : null;

    // optimista
    setExclusiveId(next);
    onQuickPatch?.(product.id, { exclusiveId: next as any });
    try {
      await updateDoc(itemRef, { exclusiveId: next });
      await bumpCatalogVersion("toggle exclusive");
    } catch (err) {
      console.error("❌ Error al actualizar exclusivo:", err);
      setExclusiveId(prev); // rollback local
      onQuickPatch?.(product.id, { exclusiveId: prev as any }); // rollback listado
      alert("❌ Hubo un error al actualizar Exclusivo.");
    } finally {
      setTogglingExclusive(false);
    }
  };

  const onToggleFeatured = async (e: React.ChangeEvent<HTMLInputElement>) => {
    stop(e);
    if (togglingFeatured) return;
    setTogglingFeatured(true);

    const prev = featuredId;
    const next = e.target.checked ? getNextAvailableId("featured") : null;

    setFeaturedId(next);
    onQuickPatch?.(product.id, { featuredId: next as any });
    try {
      await updateDoc(itemRef, { featuredId: next });
      await bumpCatalogVersion("toggle featured");
    } catch (err) {
      console.error("❌ Error al actualizar destacado:", err);
      setFeaturedId(prev);
      onQuickPatch?.(product.id, { featuredId: prev as any });
      alert("❌ Hubo un error al actualizar Destacado.");
    } finally {
      setTogglingFeatured(false);
    }
  };

  const onToggleSinStock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    stop(e);
    if (togglingSinStock) return;
    setTogglingSinStock(true);

    const prev = sinStock;
    const next = e.target.checked;

    setSinStock(next);
    onQuickPatch?.(product.id, { sinStock: next });
    try {
      await updateDoc(itemRef, { sinStock: next });
      await bumpCatalogVersion("toggle sinStock");
    } catch (err) {
      console.error("❌ Error al actualizar sinStock:", err);
      setSinStock(prev);
      onQuickPatch?.(product.id, { sinStock: prev });
      alert("❌ Hubo un error al actualizar Sin stock.");
    } finally {
      setTogglingSinStock(false);
    }
  };

  // Evitar que inputs abran el modal
  const stopClickOpenModal = (e: MouseEvent) => stop(e);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(e) => (e.key === "Enter" ? onEdit() : undefined)}
      className={`border rounded p-4 shadow flex flex-col ${
        sinStock ? "bg-gray-200 opacity-70" : "bg-white"
      }`}
    >
      <div className="h-28 mb-2 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.title}
          className="h-full object-contain"
          draggable={false}
          onClick={stopClickOpenModal}
        />
      </div>

      <h3 className="font-semibold text-sm">{product.title}</h3>

      {product.sabores && product.sabores.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1 mb-1" onClick={stopClickOpenModal}>
          {product.sabores.map((sabor, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full"
            >
              {sabor}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500" onClick={stopClickOpenModal}>
        {categorySlug}
      </p>

      <label className="text-sm mt-2 mb-1" onClick={stopClickOpenModal}>
        Precio:
      </label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-1 text-sm rounded w-full mb-2"
        onClick={stopClickOpenModal}
      />

      <label className="text-sm flex items-center gap-2 mb-1" onClick={stopClickOpenModal}>
        <input
          type="checkbox"
          checked={offerEnabled}
          onChange={(e) => {
            setOfferEnabled(e.target.checked);
            if (!e.target.checked) setOfferPrice("");
          }}
          onClick={stopClickOpenModal}
        />
        Precio de Oferta
      </label>

      <input
        type="number"
        step="0.01"
        placeholder="Precio en oferta"
        value={offerPrice}
        onChange={(e) => setOfferPrice(e.target.value)}
        disabled={!offerEnabled}
        className={`border p-1 text-sm rounded w-full mb-2 ${
          !offerEnabled ? "bg-gray-100 text-gray-400" : ""
        }`}
        onClick={stopClickOpenModal}
      />

      <label className="text-sm flex items-center gap-2" onClick={stopClickOpenModal}>
        <input
          type="checkbox"
          checked={exclusiveId != null}
          onChange={onToggleExclusive}
          onClick={stopClickOpenModal}
          disabled={togglingExclusive}
        />
        Producto Exclusivo
        {exclusiveId != null && (
          <span className="text-xs text-gray-500 ml-1">#{exclusiveId}</span>
        )}
      </label>

      <label className="text-sm flex items-center gap-2" onClick={stopClickOpenModal}>
        <input
          type="checkbox"
          checked={featuredId != null}
          onChange={onToggleFeatured}
          onClick={stopClickOpenModal}
          disabled={togglingFeatured}
        />
        Producto Destacado
        {featuredId != null && (
          <span className="text-xs text-gray-500 ml-1">#{featuredId}</span>
        )}
      </label>

      <label className="text-sm flex items-center gap-2 mb-1" onClick={stopClickOpenModal}>
        <input
          type="checkbox"
          checked={sinStock}
          onChange={onToggleSinStock}
          onClick={stopClickOpenModal}
          disabled={togglingSinStock}
        />
        Sin stock
      </label>

      <button
        onClick={(e) => {
          stop(e);
          handleUpdate();
        }}
        className="my-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded"
      >
        Guardar
      </button>

      <button
        onClick={(e) => {
          stop(e);
          onEdit();
        }}
        className="bg-gray-200 hover:bg-gray-300 text-black text-sm px-2 py-1 rounded flex items-center justify-center gap-1"
      >
        <FaEye /> Ver
      </button>
    </div>
  );
};

export default ProductoAdminCard;
