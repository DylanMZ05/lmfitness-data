import React, { useState } from "react";
import { motion } from "framer-motion";

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
            { id: 1, image: "public/assets/prote-1.png", title: "STAR NUTRITION WHEY ISOLATE", description: "Proteína de alta calidad.", price: "$32.000" },
            { id: 2, image: "public/assets/prote-1.png", title: "STAR NUTRITION PLATINUM DOYPACK", description: "Proteína avanzada.", price: "$57.000" },
            { id: 3, image: "public/assets/prote-1.png", title: "ENA TRUE MADE", description: "Ideal para recuperación.", price: "$36.300" },
            { id: 4, image: "public/assets/prote-1.png", title: "PROTEINA WHEY ADVANCED XTRENGHT", description: "Para entrenamientos intensos.", price: "$29.800" }
        ]
    },
    {
        name: "CREATINA",
        products: [
            { id: 5, image: "public/assets/creatina-1.png", title: "CREATINA STAR NUTRITION POTE", description: "Mejora el rendimiento.", price: "$27.700" },
            { id: 6, image: "public/assets/creatina-1.png", title: "MAXI GAIN GENTECH", description: "Gana masa muscular.", price: "$28.200" },
            { id: 7, image: "public/assets/creatina-1.png", title: "NITROGAIN XTRENGHT", description: "Fuerza y resistencia.", price: "$27.500" },
            { id: 8, image: "public/assets/creatina-1.png", title: "CREATINA STAR NUTRITION DOYPACK", description: "Alta pureza.", price: "$20.000" }
        ]
    },
    {
        name: "PRE ENTRENO",
        products: [
            { id: 9, image: "public/assets/pre-1.png", title: "RELOAD BCAA ENA SPORT", description: "Recuperación rápida.", price: "$19.200" },
            { id: 10, image: "public/assets/pre-1.png", title: "PRE WAR ENA SPORT", description: "Energía explosiva.", price: "$27.000" },
            { id: 11, image: "public/assets/pre-1.png", title: "RIPPED X ENA SPORT", description: "Definición muscular.", price: "$21.100" },
            { id: 12, image: "public/assets/pre-1.png", title: "XTRENGHT CUTTER", description: "Más resistencia.", price: "$28.100" }
        ]
    }
];

const ProductList: React.FC = () => {
    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
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
                                    <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                                        Añadir
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;