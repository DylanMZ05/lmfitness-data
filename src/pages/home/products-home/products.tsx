import React from "react";
import ProductCard from "./product-card";
import ParallaxSlider from "../../../components/Slider";

import { FaShoppingCart, FaCheckCircle, FaBoxOpen, FaClipboardList } from "react-icons/fa";


interface Product {
    title: string;
    spacing?: string;
}

const slidesData = [
    {
        imageUrl: "",
        text: "Comprá tus productos en tres simples pasos",
        icon: <FaClipboardList className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "Paso 1: Selecciona tus productos",
        icon: <FaShoppingCart className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "Paso 2: Agrega al carrito y procede al pago",
        icon: <FaCheckCircle className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "Paso 3: Recibe tu pedido y disfruta",
        icon: <FaBoxOpen className="text-5xl text-white" />,
    },
];

const Products: React.FC = () => {
    const products: Product[] = [
        { title: "PROTEÍNAS" },
        { title: "CREATINAS" },
        { title: "PRE ENTRENOS" },
        { title: "COMBOS LMFITNESS" },
        { title: "TODOS NUESTROS PRODUCTOS"  }
    ];

    return (
        <section id="productos" className="h-max flex justify-center items-center gap-6 flex-wrap pb-[75px]">
            <div className="mt-4 mx-3 shadow-lg">
                <ParallaxSlider slides={slidesData} width="w-[96vw]" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 w-full px-4">
                <div className="w-full text-center">
                    <h3 className="text-[36px] font-semibold">CATÁLOGO</h3>
                    <div className="w-[50px] h-[2px] bg-red-500 mb-2 rounded-2xl mx-auto"></div>
                    <h4 className="text-[24px] font-semibold opacity-95">NUESTROS PRODUCTOS</h4>
                </div>

                {products.map((product, index) => (
                    <ProductCard key={index} title={product.title} spacing={product.spacing} />
                ))}
            </div>
        </section>
    );
};

export default Products;