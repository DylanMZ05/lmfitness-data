import React from "react";
import ProductCard from "./product-card";
import ParallaxBanner from "../Slider";

interface Product {
    title: string;
    spacing?: string;
}

const Products: React.FC = () => {
    const products: Product[] = [
        { title: "PROTEÍNAS", spacing: "mt-15" },
        { title: "CREATINAS", spacing: "mt-15" },
        { title: "PRE ENTRENOS", spacing: "mt-10" },
        { title: "COMBOS LMFITNESS", spacing: "mt-10" },
        { title: "TODOS NUESTROS PRODUCTOS", spacing: "mt-5" }
    ];

    return (
        <section className="h-max flex justify-center items-center gap-6 flex-wrap pb-[75px]">
            <div className="mt-4 mx-3 shadow-lg">
                <ParallaxBanner />
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