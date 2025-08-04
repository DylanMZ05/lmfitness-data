import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/useCart";
import useScrollToTop from "../../hooks/useScrollToTop";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Product {
  id: string;
  title: string;
  price: string;
  offerPrice?: string;
  description?: string;
  images: string[];
  sinStock?: boolean;
}

interface Category {
  name: string;
  slug: string;
  image?: string;
  orden?: number;
  products: Product[];
}

const CatalogoCard: React.FC = () => {
  const { addToCart } = useCart();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollToTop = useScrollToTop();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const categoriasSnap = await getDocs(collection(db, "productos"));
      const categorias: Category[] = [];

      for (const catDoc of categoriasSnap.docs) {
        const catData = catDoc.data();

        // Ocultar categoría SIN STOCK y las que tengan "oculta: true"
        if (catData.oculta || catData.name?.toUpperCase() === "SIN STOCK") continue;

        const itemsSnap = await getDocs(collection(catDoc.ref, "items"));
        const productos = itemsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        categorias.push({
          name: catData.name || "Sin nombre",
          image: catData.image,
          slug: catDoc.id,
          orden: parseInt(catData.orden ?? "999"),
          products: productos,
        });
      }


      categorias.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
      setData(categorias);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleCategory = (slug: string) => {
    if (openCategory === slug) {
      setOpenCategory(null);
    } else {
      setOpenCategory(null);
      setTimeout(() => {
        setOpenCategory(slug);
        setTimeout(() => {
          const el = document.getElementById(slug);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 300);
      }, 200);
    }
  };

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const addToCartHandler = () => {
    if (selectedProduct) {
      const price = selectedProduct.offerPrice || selectedProduct.price;
      addToCart({ ...selectedProduct, price }, quantity);
      setSelectedProduct(null);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
      window.dispatchEvent(new CustomEvent("producto-agregado"));
    }
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setOpenCategory(hash);
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - 115;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500 mb-4" />
        <p className="text-gray-700 font-medium">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {data.map((category) => {
        const isOpen = openCategory === category.slug;
        return (
          <div key={category.slug} id={category.slug} className="mb-4 shadow-lg">
            <div
              className={`flex justify-between items-center p-4 bg-white cursor-pointer border border-black/20 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
              onClick={() => toggleCategory(category.slug)}
            >
              <div className="flex items-center gap-2">
                {category.image && (
                  <img src={category.image} alt={category.name} className="h-10 w-10 object-contain" />
                )}
                <h2 className="text-lg font-bold">{category.name}</h2>
              </div>
              <button className="text-xl">{isOpen ? "➖" : "➕"}</button>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-gray-100 rounded-b-lg"
            >
              <div className="grid grid-cols-2 px-1 pt-2 pb-1 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 sm:px-2 bg-white rounded-b-lg">
                {category.products.map((product) => {
                  const isSinStock = product.sinStock === true;

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-black/30 relative ${
                        isSinStock ? "opacity-50 grayscale" : ""
                      }`}
                    >
                      {isSinStock && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          SIN STOCK
                        </span>
                      )}
                      <div className="h-32 w-full overflow-hidden flex justify-center items-center bg-neutral-200">
                        <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} className="h-full object-contain p-2" />
                      </div>
                      <div className="p-3 flex flex-col flex-1 justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold mb-1">{product.title}</h3>
                          {product.offerPrice ? (
                            <div className="mb-2">
                              <p className="text-sm text-gray-500 line-through">${product.price}</p>
                              <p className="text-base font-bold text-red-600">${product.offerPrice}</p>
                            </div>
                          ) : (
                            <p className="text-base font-bold mb-2">${product.price}</p>
                          )}
                        </div>
                        <div className="flex justify-between mt-2 items-center">
                          {!isSinStock && (
                            <button
                              className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition cursor-pointer flex items-center justify-center"
                              onClick={() => openPopup(product)}
                              title="Añadir al carrito"
                            >
                              <FaShoppingCart className="text-white text-lg" />
                            </button>
                          )}
                          <Link
                            to={`/producto/${product.id}`}
                            onClick={scrollToTop}
                            className="border border-black rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition"
                            title="Ver detalles"
                          >
                            <FaEye className="text-black" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        );
      })}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center px-4 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
            <p className="text-gray-600">{selectedProduct.description}</p>
            {selectedProduct.offerPrice ? (
              <div className="mb-2">
                <p className="text-sm text-gray-500 line-through">${selectedProduct.price}</p>
                <p className="text-lg font-bold text-red-600">${selectedProduct.offerPrice}</p>
              </div>
            ) : (
              <p className="text-lg font-bold">${selectedProduct.price}</p>
            )}
            <div className="flex items-center justify-center my-4">
              <button className="px-4 py-2 bg-gray-200 rounded-l-lg" onClick={() => adjustQuantity(-1)}>-</button>
              <span className="px-4">{quantity}</span>
              <button className="px-4 py-2 bg-gray-200 rounded-r-lg" onClick={() => adjustQuantity(1)}>+</button>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full"
              onClick={addToCartHandler}
            >
              Añadir al carrito
            </button>
            <button
              className="mt-2 w-full text-gray-600 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setSelectedProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-[9999]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <span className="text-xl">✅</span>
            <span>Producto añadido</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogoCard;
