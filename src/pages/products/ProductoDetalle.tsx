// ProductoDetalle.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

// Importamos tipos y data
import { productData, Product, Category } from "../../data/products";

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { addToCart } = useCart();

  // Estados para cantidad y slider
  const [quantity, setQuantity] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Estado para controlar el modal de zoom
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);

  // Buscar el producto
  const foundProduct: Product | undefined = productData
    .flatMap((category: Category) => category.products)
    .find((p: Product) => p.id === productId);

  // Log para depuración
  useEffect(() => {
    console.log("Producto encontrado:", foundProduct);
    if (foundProduct) {
      console.log("Array de imágenes:", foundProduct.images);
    }
  }, [foundProduct]);

  if (!foundProduct) {
    return (
      <div className="p-4">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  // Función para ajustar cantidad
  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Array de imágenes del producto
  const images = foundProduct.images;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handler para abrir y cerrar el zoom
  const openZoom = () => setZoomOpen(true);
  const closeZoom = () => setZoomOpen(false);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-30">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Slider de imágenes */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <motion.img
            key={currentSlide}
            src={`../${images[currentSlide]}`}
            alt={foundProduct.title}
            className="object-contain w-full h-64 cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={openZoom}
            onError={(e) => {
              console.error("Error cargando imagen:", images[currentSlide]);
              (e.target as HTMLImageElement).src = "../assets/fallback.png";
            }}
          />
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

        {/* Información del producto */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{foundProduct.title}</h1>
          <p className="text-gray-600 mb-2">{foundProduct.description}</p>
          <p className="text-xl font-semibold mb-4">{foundProduct.price}</p>

          {/* Controles de cantidad */}
          <div className="flex items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-l-lg"
              onClick={() => adjustQuantity(-1)}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded-r-lg"
              onClick={() => adjustQuantity(1)}
            >
              +
            </button>
          </div>

          {/* Botón para agregar al carrito */}
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={() => addToCart(foundProduct, quantity)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Modal de zoom */}
      {zoomOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-70 flex items-center justify-center z-[2000] p-25"
          onClick={closeZoom}
        >
          <div className="relative">
            {/* Botón "X" para cerrar */}
            <button
              className="absolute top-0 right-0 m-4 bg-black/70 p-2 rounded-full text-white text-xl hover:text-red-500"
              onClick={closeZoom}
            >
              <FaTimes />
            </button>
            <img
              src={`../${images[currentSlide]}`}
              alt={foundProduct.title}
              className="max-w-full max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;