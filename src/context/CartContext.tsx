import React, { createContext, useState, useContext } from "react";
import { Product } from "../data/products";

// ✅ CartItem ahora incluye 'sabor' como campo obligatorio
interface CartItem {
  product: Product;
  quantity: number;
  sabor: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, sabor: string) => void;
  removeFromCart: (productId: number | string, sabor: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, sabor: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && item.sabor === sabor
      );

      if (existingItem) {
        // Si ya existe el producto con ese sabor, actualiza cantidad
        return prevCart.map((item) =>
          item.product.id === product.id && item.sabor === sabor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si no existe ese producto con ese sabor, lo agrega nuevo
      return [...prevCart, { product, quantity, sabor }];
    });
  };

  const removeFromCart = (productId: number | string, sabor: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.sabor === sabor)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook para consumir el contexto del carrito
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
