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
  images: string[];
  description?: string;
  longDescription?: string;
  sinStock?: boolean;
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categoriasSnap = await getDocs(collection(db, "productos"));
        for (const catDoc of categoriasSnap.docs) {
          const itemRef = doc(db, "productos", catDoc.id, "items", id || "");
          const itemSnap = await getDoc(itemRef);
          if (itemSnap.exists()) {
            const data = itemSnap.data();
            setFoundProduct({
              id: itemSnap.id,
              title: data.title,
              price: Number(data.price),
              offerPrice: data.offerPrice ? Number(data.offerPrice) : undefined,
              images: Array.isArray(data.images)
                ? data.images.map((img: string) =>
                    img.startsWith("/") ? img : `/${img}`
                  )
                : [],
              description: data.description,
              longDescription: data.longDescription,
              sinStock: data.sinStock ?? false,
            });
            break;
          }
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
  const isSinStock = foundProduct.sinStock;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const openZoom = () => setZoomOpen(true);
  const closeZoom = () => setZoomOpen(false);

  const handleAddToCart = () => {
    const productToAdd = {
      ...foundProduct,
      images: [images[currentSlide], ...foundProduct.images.filter(img => img !== images[currentSlide])]
    };
    addToCart(productToAdd, quantity);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const finalDescription = foundProduct.longDescription || foundProduct.description || "";

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
              className={`object-contain w-full h-64 cursor-pointer ${
                isSinStock ? "opacity-50 grayscale" : ""
              }`}
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
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                SIN STOCK
              </span>
            )}
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full" onClick={prevSlide}>
              <FaArrowLeft />
            </button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full" onClick={nextSlide}>
              <FaArrowRight />
            </button>
          </div>

          <div className="w-full md:w-1/2 px-5">
            <h1 className="text-2xl font-bold mb-2">{foundProduct.title}</h1>
            <div
              className="text-gray-600 mb-2 text-sm"
              dangerouslySetInnerHTML={{
                __html: parseFormattedText(finalDescription),
              }}
            />
            {foundProduct.offerPrice ? (
              <div className="mb-4">
                <p className="text-sm text-gray-500 line-through">
                  $ {foundProduct.price.toLocaleString("es-AR")}
                </p>
                <p className="text-xl font-semibold text-red-600">
                  $ {foundProduct.offerPrice.toLocaleString("es-AR")}
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold mb-4">
                $ {foundProduct.price.toLocaleString("es-AR")}
              </p>
            )}

            {!isSinStock && (
              <>
                <div className="flex items-center mb-4">
                  <button className="px-4 py-2 bg-gray-200 rounded-l-lg cursor-pointer" onClick={() => adjustQuantity(-1)}>-</button>
                  <span className="px-4 border-y-2 border-gray-200 h-10 flex justify-center items-center">{quantity}</span>
                  <button className="px-4 py-2 bg-gray-200 rounded-r-lg cursor-pointer" onClick={() => adjustQuantity(1)}>+</button>
                </div>

                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  onClick={handleAddToCart}
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
    </>
  );
};

export default ProductoDetalle;
