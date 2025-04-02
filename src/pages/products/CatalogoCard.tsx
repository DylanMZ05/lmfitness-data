// CatalogoCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useCart } from "../../context/useCart";

import useScrollToTop from "../../hooks/useScrollToTop";

// Importamos el array de datos y los tipos
import { productData, Category, Product } from "../../data/products";

const CatalogoCard: React.FC = () => {
  const { addToCart } = useCart();
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const scrollToTop = useScrollToTop();

  // Expandir/colapsar categorías
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  // Abrir popup
  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  // Ajustar cantidad
  const adjustQuantity = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Añadir al carrito
  const addToCartHandler = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {productData.map((category: Category) => (
        <div key={category.name} className="mb-4 shadow-lg">
          {/* Encabezado de la categoría */}
          <div
            className="flex justify-between items-center p-4 rounded-lg bg-gray-200 cursor-pointer"
            onClick={() => toggleCategory(category.name)}
          >
            <div className="flex items-center gap-2">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-10 w-10 object-contain"
                />
              )}
              <h2 className="text-lg font-bold">{category.name}</h2>
            </div>
            <button className="text-xl">
              {openCategories[category.name] ? "➖" : "➕"}
            </button>
          </div>

          {/* Lista de productos con animación */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={
              openCategories[category.name]
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {category.products.map((product: Product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={
                    openCategories[category.name]
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center border-b pb-4 last:border-b-0"
                >
                  {/* Imagen (solo la primera del array) */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden flex justify-center">
                    <img
                      src={product.images[0]} // Muestra SOLO la primera
                      alt={product.title}
                      className="h-full object-cover p-1"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-md font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold">{product.price}</p>
                  </div>

                  {/* Botón para abrir popup (selección de cantidad) */}
                  <button
                    className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                    onClick={() => openPopup(product)}
                  >
                    Añadir
                  </button>

                  {/* Botón/Ícono para ver detalles en otra ruta */}
                  <Link
                    to={`/producto/${product.id}`}
                    onClick={scrollToTop}
                    className="ml-2 border border-black rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition"
                    title="Ver detalles"
                  >
                    <FaEye />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}

      {/* Popup para seleccionar la cantidad */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center px-4 z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
            <p className="text-gray-600">{selectedProduct.description}</p>
            <p className="text-lg font-bold">{selectedProduct.price}</p>

            {/* Controles de cantidad */}
            <div className="flex items-center justify-center my-4">
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

            {/* Botón para añadir al carrito */}
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full"
              onClick={addToCartHandler}
            >
              Añadir al carrito
            </button>

            {/* Botón para cerrar */}
            <button
              className="mt-2 w-full text-gray-600 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setSelectedProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogoCard;
