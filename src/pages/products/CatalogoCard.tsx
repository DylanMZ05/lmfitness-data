import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/useCart";

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    price: string;
}

interface Category {
    name: string;
    products: Product[];
}

const productData: Category[] = [
    {
        name: "PROTEÍNA",
        products: [
            { id: 1, image: "assets/prote-1.png", title: "STAR NUTRITION WHEY ISOLATE", description: "Proteína de alta calidad.", price: "$32.000" },
            { id: 2, image: "assets/prote-1.png", title: "STAR NUTRITION PLATINUM DOYPACK", description: "Proteína avanzada.", price: "$57.000" },
            { id: 3, image: "assets/prote-1.png", title: "ENA TRUE MADE", description: "Ideal para recuperación.", price: "$36.300" },
            { id: 4, image: "assets/prote-1.png", title: "PROTEINA WHEY ADVANCED XTRENGHT", description: "Para entrenamientos intensos.", price: "$29.800" }
        ]
    },
    {
        name: "CREATINA",
        products: [
            { id: 5, image: "assets/creatina-1.png", title: "CREATINA STAR NUTRITION POTE", description: "Mejora el rendimiento.", price: "$27.700" },
            { id: 6, image: "assets/creatina-1.png", title: "MAXI GAIN GENTECH", description: "Gana masa muscular.", price: "$28.200" },
            { id: 7, image: "assets/creatina-1.png", title: "NITROGAIN XTRENGHT", description: "Fuerza y resistencia.", price: "$27.500" },
            { id: 8, image: "assets/creatina-1.png", title: "CREATINA STAR NUTRITION DOYPACK", description: "Alta pureza.", price: "$20.000" }
        ]
    }
];

const CatalogoCard: React.FC = () => {
    const { addToCart } = useCart();
    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const openPopup = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    const adjustQuantity = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const addToCartHandler = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, quantity);
            setSelectedProduct(null);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {productData.map((category) => (
                <div key={category.name} className="mb-4 shadow-lg">
                    {/* Encabezado de la categoría */}
                    <div
                        className="flex justify-between items-center p-4 rounded-lg bg-gray-200 cursor-pointer"
                        onClick={() => toggleCategory(category.name)}
                    >
                        <h2 className="text-lg font-bold">{category.name}</h2>
                        <button className="text-xl">{openCategories[category.name] ? "➖" : "➕"}</button>
                    </div>

                    {/* Lista de productos con animación */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={openCategories[category.name] ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 space-y-4">
                            {category.products.map((product) => (
                                <motion.div 
                                    key={product.id} 
                                    initial={{ opacity: 0, y: -10 }} 
                                    animate={openCategories[category.name] ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="flex items-center border-b pb-4 last:border-b-0"
                                >
                                    <div className="h-20 flex-shrink-0 overflow-hidden flex justify-center">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-md font-semibold">{product.title}</h3>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <p className="text-lg font-bold">{product.price}</p>
                                    </div>
                                    <button 
                                        className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                                        onClick={() => openPopup(product)}
                                    >
                                        Añadir
                                    </button>
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
                        <div className="flex items-center justify-center my-4">
                            <button 
                                className="px-4 py-2 bg-gray-200 rounded-l-lg" 
                                onClick={() => adjustQuantity(-1)}
                            >-</button>
                            <span className="px-4">{quantity}</span>
                            <button 
                                className="px-4 py-2 bg-gray-200 rounded-r-lg" 
                                onClick={() => adjustQuantity(1)}
                            >+</button>
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
        </div>
    );
};

export default CatalogoCard;