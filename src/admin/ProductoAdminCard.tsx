import { useState } from "react";
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
}

const ProductoAdminCard: React.FC<Props> = ({
  product,
  categorySlug,
  allData,
  onEdit,
  onUpdate,
}) => {
  const [price, setPrice] = useState(product.price.toString());
  const [offerPrice, setOfferPrice] = useState(product.offerPrice?.toString() ?? "");
  const [offerEnabled, setOfferEnabled] = useState(!!product.offerPrice);

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
      const ref = doc(db, "productos", categorySlug, "items", product.id.toString());
      await updateDoc(ref, {
        price: parsedPrice,
        offerPrice: offerEnabled ? parsedOffer : null,
      });

      await bumpCatalogVersion("update price/offer");

      alert("✅ Precios actualizados");
      onUpdate();
    } catch (err) {
      console.error("❌ Error al guardar:", err);
      alert("❌ Hubo un error al guardar.");
    }
  };

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

  return (
    <div
      className={`border rounded p-4 shadow flex flex-col ${
        product.sinStock ? "bg-gray-200 opacity-70" : "bg-white"
      }`}
    >
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.title}
        className="h-28 object-contain mb-2"
      />

      <h3 className="font-semibold text-sm">{product.title}</h3>

      {product.sabores && product.sabores.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1 mb-1">
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

      <p className="text-xs text-gray-500">{categorySlug}</p>

      <label className="text-sm mt-2 mb-1">Precio:</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-1 text-sm rounded w-full mb-2"
      />

      <label className="text-sm flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={offerEnabled}
          onChange={(e) => {
            setOfferEnabled(e.target.checked);
            if (!e.target.checked) setOfferPrice("");
          }}
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
      />

      <label className="text-sm flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={(product as any).exclusiveId != null}
          onChange={async (e) => {
            try {
              const ref = doc(db, "productos", categorySlug, "items", product.id.toString());
              if (e.target.checked) {
                const nextId = getNextAvailableId("exclusive");
                await updateDoc(ref, { exclusiveId: nextId });
              } else {
                await updateDoc(ref, { exclusiveId: null });
              }
              await bumpCatalogVersion("toggle exclusive");
              onUpdate();
            } catch (err) {
              console.error("❌ Error al actualizar exclusivo:", err);
              alert("❌ Hubo un error al actualizar Exclusivo.");
            }
          }}
        />
        Producto Exclusivo
        {(product as any).exclusiveId != null && (
          <span className="text-xs text-gray-500 ml-1">#{(product as any).exclusiveId}</span>
        )}
      </label>

      <label className="text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={(product as any).featuredId != null}
          onChange={async (e) => {
            try {
              const ref = doc(db, "productos", categorySlug, "items", product.id.toString());
              if (e.target.checked) {
                const nextId = getNextAvailableId("featured");
                await updateDoc(ref, { featuredId: nextId });
              } else {
                await updateDoc(ref, { featuredId: null });
              }
              await bumpCatalogVersion("toggle featured");
              onUpdate();
            } catch (err) {
              console.error("❌ Error al actualizar destacado:", err);
              alert("❌ Hubo un error al actualizar Destacado.");
            }
          }}
        />
        Producto Destacado
        {(product as any).featuredId != null && (
          <span className="text-xs text-gray-500 ml-1">#{(product as any).featuredId}</span>
        )}
      </label>

      <label className="text-sm flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={product.sinStock || false}
          onChange={async (e) => {
            try {
              const ref = doc(db, "productos", categorySlug, "items", product.id.toString());
              await updateDoc(ref, { sinStock: e.target.checked });
              await bumpCatalogVersion("toggle sinStock");
              onUpdate();
            } catch (err) {
              console.error("❌ Error al actualizar sinStock:", err);
              alert("❌ Hubo un error al actualizar Sin stock.");
            }
          }}
        />
        Sin stock
      </label>

      <button
        onClick={handleUpdate}
        className="my-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded"
      >
        Guardar
      </button>

      <button
        onClick={onEdit}
        className="bg-gray-200 hover:bg-gray-300 text-black text-sm px-2 py-1 rounded flex items-center justify-center gap-1"
      >
        <FaEye /> Ver
      </button>
    </div>
  );
};

export default ProductoAdminCard;
