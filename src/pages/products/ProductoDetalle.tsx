import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { parseFormattedText } from "../../data/products";
import FeaturedSliderContainer from "../home/FeaturedSliderContainer";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

interface Product {
  id: string;
  title: string;
  price: number;
  offerPrice?: number;
  description?: string;
  longDescription?: string;
  images: string[];
  sinStock?: boolean;
  selectedSabor?: string;
  sabores?: string[];
}

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Popup estilo catálogo
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSabor, setSelectedSabor] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categoriasSnap = await getDocs(collection(db, "productos"));
        let productoEncontrado: Product | null = null;

        for (const catDoc of categoriasSnap.docs) {
          const itemRef = doc(db, "productos", catDoc.id, "items", id || "");
          const itemSnap = await getDoc(itemRef);

          if (itemSnap.exists()) {
            const data = itemSnap.data();
            const sinStock = Boolean(data.sinStock);

            const productoFormateado: Product = {
              id: itemSnap.id,
              title: data.title,
              price: Number(data.price),
              offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
              images: Array.isArray(data.images)
                ? data.images.map((img: string) => (img.startsWith("/") ? img : `/${img}`))
                : [],
              description: data.description,
              longDescription: data.longDescription,
              sinStock,
              sabores: Array.isArray(data.sabores) ? data.sabores.map((s: string) => s.trim()) : undefined, // ✅ Traemos sabores
            };

            if (!productoEncontrado) {
              productoEncontrado = productoFormateado;
            }
            if (sinStock) {
              setFoundProduct(productoFormateado);
              return;
            }
          }
        }

        if (productoEncontrado) {
          setFoundProduct(productoEncontrado);
        }
      } catch (err) {
        console.error("Error al cargar producto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 h-[calc(100vh-216px)] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!foundProduct) {
    return (
      <div className="p-4 h-[calc(100vh-216px)] flex justify-center items-center">
        <h2 className="font-bold text-2xl">Producto no encontrado</h2>
      </div>
    );
  }

  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const images = foundProduct.images;
  const isSinStock = foundProduct?.sinStock === true;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  const openZoom = () => setZoomOpen(true);
  const closeZoom = () => setZoomOpen(false);

  const openAddToCartModal = () => {
    setSelectedSabor("");      // reset
    setQuantity(1);            // reset
    setModalOpen(true);        // abre el popup igual que en catálogo
  };

  const addToCartFromModal = () => {
    if (!foundProduct) return;

    const price = (foundProduct.offerPrice ?? foundProduct.price) as number;

    // Reordenamos imágenes para que la actual vaya primero (igual que antes)
    const productToAdd = {
      ...foundProduct,
      price,
      images: [images[currentSlide], ...foundProduct.images.filter((img) => img !== images[currentSlide])],
    };

    // Si tiene sabores, requerimos selección
    const needsFlavor = Array.isArray(foundProduct.sabores) && foundProduct.sabores.length > 0;
    const sabor = needsFlavor ? selectedSabor : "";

    if (needsFlavor && !sabor) return; // botón ya se deshabilita, esto es de seguridad

    addToCart(productToAdd, quantity, sabor);
    setModalOpen(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const finalDescription = foundProduct.longDescription || foundProduct.description || "";
  const hasSabores = Array.isArray(foundProduct.sabores) && foundProduct.sabores.length > 0;

  return (
    <>
      <div className="max-w-4xl mx-auto pt-30 min-h-[calc(100vh-216px)] flex flex-col justify-center items-center">
        <header className="mb-6 w-full flex justify-center">
          <h2 className="font-bold text-4xl text-center px-3 mb-10">Detalle del producto</h2>
        </header>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-10">
          <div className="relative w-full md:w-1/2 flex items-center justify-center">
            <motion.img
              key={currentSlide}
              src={images[currentSlide]}
              alt={foundProduct.title}
              className={`object-contain w-full h-64 cursor-pointer ${isSinStock ? "grayscale opacity-50" : ""}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={openZoom}
              onError={(e) => {
                console.error("Error cargando imagen:", images[currentSlide]);
                (e.target as HTMLImageElement).src = "../assets/fallback.png";
              }}
            />

            {isSinStock && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                SIN STOCK
              </span>
            )}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
              onClick={prevSlide}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
              onClick={nextSlide}
            >
              <FaArrowRight />
            </button>
          </div>

          <div className="w-full md:w-1/2 px-5">
            <h1 className="text-2xl font-bold mb-2">{foundProduct.title}</h1>

            <div
              className="text-gray-600 mb-2 text-sm"
              dangerouslySetInnerHTML={{ __html: parseFormattedText(finalDescription) }}
            />

            {/* 🔎 Info de sabores debajo de la descripción */}
            {hasSabores && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Sabores disponibles</p>
              <div className="flex flex-wrap gap-2">
                {foundProduct.sabores!.map((s, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                              bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}



            {foundProduct.offerPrice ? (
              <div className="mb-2">
                <p className="text-sm text-gray-500 line-through">
                  $ {foundProduct.price.toLocaleString("es-AR")}
                </p>
                <p className="text-xl font-semibold text-red-600">
                  $ {foundProduct.offerPrice.toLocaleString("es-AR")}
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold mb-2">
                $ {foundProduct.price.toLocaleString("es-AR")}
              </p>
            )}

            {isSinStock ? (
              <>
                <p className="text-sm text-red-600 mb-4">Este producto no está disponible actualmente.</p>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  SIN STOCK
                </button>
              </>
            ) : (
              <>
                {/* En lugar de selector inline, abrimos el popup estilo Catálogo */}
                <div className="flex items-center mt-4 mb-4">
                  <button className="px-4 py-2 bg-gray-200 rounded-l-lg cursor-pointer" onClick={() => adjustQuantity(-1)}>-</button>
                  <span className="px-4 border-y-2 border-gray-200 h-10 flex justify-center items-center">{quantity}</span>
                  <button className="px-4 py-2 bg-gray-200 rounded-r-lg cursor-pointer" onClick={() => adjustQuantity(1)}>+</button>
                </div>

                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  onClick={openAddToCartModal}
                >
                  Agregar al carrito
                </button>
              </>
            )}
          </div>
        </div>

        {zoomOpen && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-70 flex items-center justify-center z-[2000]" onClick={closeZoom}>
            <div className="relative">
              <button className="absolute -top-15 -right-15 m-4 text-white text-3xl font-bold hover:text-red-500" onClick={closeZoom}>
                <FaTimes />
              </button>
              <img
                src={images[currentSlide]}
                alt={foundProduct.title}
                className="max-w-full max-h-screen object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        <hr className="text-black/20 mb-10" />
        <h2 className="text-4xl font-bold text-center">PRODUCTOS DESTACADOS</h2>
        <div className="w-50 h-[3px] bg-red-600 my-3 rounded-full mx-auto"></div>
        <FeaturedSliderContainer title="" bgColor="bg-white" mode="featured" />

        <hr className="text-black/20 mb-10" />
        <h2 className="text-4xl font-bold text-center">PRODUCTOS EXCLUSIVOS</h2>
        <div className="w-50 h-[3px] bg-red-600 my-3 rounded-full mx-auto"></div>
        <FeaturedSliderContainer title="" bgColor="bg-white" mode="exclusive" />
      </div>

      {/* 👉 Popup estilo Catálogo para sabor + cantidad */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center px-4 z-[2100]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
              <h2 className="text-lg font-bold">{foundProduct.title}</h2>
              <p className="text-gray-600">{foundProduct.description}</p>

              {foundProduct.offerPrice ? (
                <div className="mb-2">
                  <p className="text-sm text-gray-500 line-through">
                    $ {foundProduct.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    $ {foundProduct.offerPrice.toLocaleString("es-AR")}
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold">
                  $ {foundProduct.price.toLocaleString("es-AR")}
                </p>
              )}

              {hasSabores && (
              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">Elegí un sabor:</p>
                <div className="flex flex-wrap gap-2">
                  {foundProduct.sabores!.map((s) => {
                    const active = selectedSabor === s.trim();
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSabor(s.trim())}
                        className={[
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer",
                          "ring-1",
                          active
                            ? "bg-rose-600 text-white ring-rose-600"
                            : "bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100"
                        ].join(" ")}
                      >
                        {s.trim()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}


              <div className="flex items-center justify-center my-4">
                <button className="px-4 py-2 bg-gray-200 rounded-l-lg" onClick={() => adjustQuantity(-1)}>-</button>
                <span className="px-4">{quantity}</span>
                <button className="px-4 py-2 bg-gray-200 rounded-r-lg" onClick={() => adjustQuantity(1)}>+</button>
              </div>

              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={addToCartFromModal}
                disabled={hasSabores && !selectedSabor}
              >
                Añadir al carrito
              </button>

              <button
                className="mt-2 w-full text-gray-600 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast de añadido */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-[2200]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <span className="text-xl">✅</span>
            <span>Producto añadido</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductoDetalle;
