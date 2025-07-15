// src/admin/AdminOrdenPopup.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  featuredId?: number;
  exclusiveId?: number;
  slug: string;
}

interface Props {
  onClose: () => void;
}

const AdminOrdenPopup: React.FC<Props> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [type, setType] = useState<"featured" | "exclusive">("featured");

  const fetchAll = async () => {
    const categoriasSnap = await getDocs(collection(db, "productos"));
    const loaded: Product[] = [];

    for (const cat of categoriasSnap.docs) {
      const itemsSnap = await getDocs(collection(cat.ref, "items"));
      itemsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.featuredId || data.exclusiveId) {
          loaded.push({
            id: docSnap.id,
            title: data.title,
            featuredId: data.featuredId,
            exclusiveId: data.exclusiveId,
            slug: cat.id,
          });
        }
      });
    }

    setProducts(loaded);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const sorted = [...products]
    .filter((p) => type === "featured" ? p.featuredId != null : p.exclusiveId != null)
    .sort((a, b) => (type === "featured" ? a.featuredId! - b.featuredId! : a.exclusiveId! - b.exclusiveId!));

  const move = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const newList = [...sorted];
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];

    // Reasignar los IDs secuenciales
    newList.forEach((p, i) => {
      const id = i + 1;
      const ref = doc(db, "productos", p.slug, "items", p.id);
      updateDoc(ref, type === "featured" ? { featuredId: id } : { exclusiveId: id });
    });

    setProducts((prev) =>
      prev.map((p) => {
        const found = newList.find((x) => x.id === p.id);
        return found ? { ...p, [type === "featured" ? "featuredId" : "exclusiveId"]: newList.indexOf(found) + 1 } : p;
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Administrar {type === "featured" ? "Destacados" : "Exclusivos"}</h2>
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${type === "featured" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setType("featured")}
          >
            Destacados
          </button>
          <button
            className={`px-4 py-2 rounded ${type === "exclusive" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setType("exclusive")}
          >
            Exclusivos
          </button>
        </div>

        <ul>
          {sorted.map((product, i) => (
            <li key={product.id} className="flex justify-between items-center border-b py-2">
              <span>
                #{type === "featured" ? product.featuredId : product.exclusiveId} - {product.title}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={i === 0}
                  onClick={() => move(i, "up")}
                  className="text-sm px-2 py-2 w-8 h-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                >
                  ↑
                </button>
                <button
                  disabled={i === sorted.length - 1}
                  onClick={() => move(i, "down")}
                  className="text-sm px-2 py-2 w-8 h-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminOrdenPopup;
