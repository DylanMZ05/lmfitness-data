import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/useCart";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Category, loadCatalogWithCache } from "../../hooks/useCatalog";

interface Product {
  id: string;
  title: string;
  price: string;
  offerPrice?: string;
  description?: string;
  images: string[];
  sinStock?: boolean;
  selectedSabor?: string;
  sabores?: string[];
  sabor?: string;
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

  // Función de scroll reutilizable con offset para el Header
  const executeScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // Ajuste para que el Header no tape el título
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Bloquear scroll del body cuando hay popup abierto
  useEffect(() => {
    if (!selectedProduct) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedProduct]);

  // Carga de catálogo con apertura automática y SCROLL GARANTIZADO
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: catalogData } = await loadCatalogWithCache({
        fallbackTtlMs: 6 * 60 * 60 * 1000,
      });
      if (!alive) return;
      
      setData(catalogData);
      setLoading(false);

      const hash = location.hash.replace("#", "");
      if (hash) {
        // 1. Abrimos la categoría inmediatamente
        setOpenCategory(hash);
        
        // 2. Esperamos a que el DOM se renderice y la animación de apertura progrese
        // Usamos un tiempo ligeramente superior a la duración de la animación (0.3s)
        setTimeout(() => {
          executeScroll(hash);
        }, 350); 
      }
    })();
    return () => {
      alive = false;
    };
  }, [location.hash]);

  const toggleCategory = (slug: string) => {
    if (openCategory === slug) {
      setOpenCategory(null);
      return;
    }
    
    setOpenCategory(slug);

    // Solo scrolleamos manualmente si el usuario hace click.
    // Esperamos a que se expanda el acordeón para calcular la posición real.
    setTimeout(() => {
      executeScroll(slug);
    }, 350);
  };

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const addToCartHandler = () => {
    if (!selectedProduct) return;
    const priceStr = (selectedProduct.offerPrice || selectedProduct.price) as string;
    const priceNumber = Number(priceStr.toString().replace(/[^\d.-]/g, ""));
    const sabor = selectedProduct.selectedSabor || "";
    addToCart({ ...selectedProduct, price: priceNumber }, quantity, sabor);

    setSelectedProduct(null);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
    window.dispatchEvent(new CustomEvent("producto-agregado"));
  };

  const onKeyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedProduct) return;
      if (e.key === "Escape") setSelectedProduct(null);
      if (e.key === "Enter") {
        const needsFlavor =
          Array.isArray(selectedProduct.sabores) &&
          selectedProduct.sabores.length > 0;
        if (!needsFlavor || selectedProduct.selectedSabor) {
          addToCartHandler();
        }
      }
    },
    [selectedProduct]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyHandler);
    return () => window.removeEventListener("keydown", onKeyHandler);
  }, [onKeyHandler]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500 mb-4" />
        <p className="text-gray-700 font-medium">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 min-h-[80vh]">
      {data.map((category) => {
        const isOpen = openCategory === category.slug;
        return (
          <div key={category.slug} id={category.slug} className="mb-4 shadow-lg scroll-mt-[120px]">
            <div
              className={`flex justify-between items-center p-4 bg-white cursor-pointer border border-black/20 ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
              onClick={() => toggleCategory(category.slug)}
              aria-expanded={isOpen}
              role="button"
            >
              <div className="flex items-center gap-2">
                {category.image && (
                  <img src={category.image} alt={category.name} className="h-10 w-10 object-contain" loading="lazy" />
                )}
                <h2 className="text-lg font-bold">{category.name}</h2>
              </div>
              <span className="text-xl select-none">{isOpen ? "➖" : "➕"}</span>
            </div>

            <motion.div
              initial={false}
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
                      className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-black/30 relative ${isSinStock ? "opacity-50 grayscale" : ""}`}
                    >
                      {isSinStock && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          SIN STOCK
                        </span>
                      )}

                      <Link
                        to={`/producto/${product.id}`}
                        onClick={scrollToTop}
                        title="Ver detalle"
                        className="h-32 w-full overflow-hidden flex justify-center items-center bg-neutral-200"
                      >
                        <img
                          src={product.images?.[0] || "assets/fallback.png"}
                          alt={product.title}
                          className="h-full object-contain p-2"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "assets/fallback.png";
                          }}
                        />
                      </Link>

                      <div className="p-3 flex flex-col flex-1 justify-between">
                        <div className="flex-1">
                          <Link to={`/producto/${product.id}`} onClick={scrollToTop} title="Ver detalle" className="block">
                            <h3 className="text-sm font-semibold mb-1">{product.title}</h3>
                          </Link>

                          {product.offerPrice ? (
                            <div className="mb-1">
                              <p className="text-xs text-gray-500 line-through">${product.price}</p>
                              <p className="text-base font-bold text-red-600">${product.offerPrice}</p>
                            </div>
                          ) : (
                            <p className="text-base font-bold mb-1">${product.price}</p>
                          )}
                        </div>

                        <div className="flex justify-between mt-2 items-center">
                          {!isSinStock && (
                            <button
                              className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition cursor-pointer flex items-center justify-center"
                              onClick={() => openPopup(product)}
                              title="Añadir al carrito"
                              type="button"
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
                            <span className="sr-only">Ver detalles</span>
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/>
                            </svg>
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

      <AnimatePresence>
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

              {Array.isArray(selectedProduct.sabores) && selectedProduct.sabores.length > 0 && (
                <div className="mb-4">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Elegí un sabor:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sabores.map((s) => {
                      const value = s.trim();
                      const active = selectedProduct.selectedSabor === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setSelectedProduct((prev) =>
                              prev ? { ...prev, selectedSabor: value } : prev
                            )
                          }
                          className={[
                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer",
                            "ring-1",
                            active
                              ? "bg-rose-600 text-white ring-rose-600"
                              : "bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100",
                          ].join(" ")}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center my-4">
                <button className="px-4 py-2 bg-gray-200 rounded-l-lg" onClick={() => adjustQuantity(-1)} type="button">-</button>
                <span className="px-4">{quantity}</span>
                <button className="px-4 py-2 bg-gray-200 rounded-r-lg" onClick={() => adjustQuantity(1)} type="button">+</button>
              </div>

              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={addToCartHandler}
                disabled={
                  Array.isArray(selectedProduct.sabores) &&
                  selectedProduct.sabores.length > 0 &&
                  !selectedProduct.selectedSabor
                }
                type="button"
              >
                Añadir al carrito
              </button>

              <button
                className="mt-2 w-full text-gray-600 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setSelectedProduct(null)}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

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