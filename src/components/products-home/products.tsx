import React from "react";
import ProductCard from "./product-card";
import ParallaxBanner from "../ParallaxBanner";

const Products: React.FC = () => {
    const products = [
        { title: "PROTEÍNAS", bgGradient: "linear-gradient(225deg, #001970, #00c4ff)" },
        { title: "CREATINAS", bgGradient: "linear-gradient(225deg, #2a09e6, #ff2fb2)" },
        { title: "PRE ENTRENOS", bgGradient: "linear-gradient(225deg, #17b617, #ffd643)" },
        { title: "COMBOS LMFITNESS", bgGradient: "linear-gradient(225deg, #ff0000, #ffa300)" },
        { title: "TODOS NUESTROS PRODUCTOS", bgGradient: "linear-gradient(225deg, #17b617, #ffd643)" }
    ];

    return (
        <section className="h-max flex justify-center items-center gap-6 flex-wrap pb-[75px]">
            <div className="mt-4 mx-3 shadow-lg">
                <ParallaxBanner imageUrl="assets/suplementos.jpg" text="TENEMOS ENVÍOS A TODO EL PAÍS" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h3 className="text-[36px] text-center font-semibold ">CATÁLOGO</h3>
                <div className="w-[50px] h-[2px] bg-red-500 mb-2 rounded-2xl"></div>
                <h4 className="text-[24px] text-center font-semibold opacity-95">NUESTROS PRODUCTOS</h4>
            </div>
            {products.map((product, index) => (
                <ProductCard key={index} title={product.title} bgGradient={product.bgGradient} />
            ))}
        </section>
    );
}

export default Products;