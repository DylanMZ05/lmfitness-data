import React from "react";
import ProductCard from "./product-card";
import ParallaxBanner from "../ParallaxBanner";

const Products: React.FC = () => {
    const products = [
        { title: "Proteínas", bgGradient: "linear-gradient(225deg, #001970, #00c4ff)" },
        { title: "Creatinas", bgGradient: "linear-gradient(225deg, #2a09e6, #ff2fb2)" },
        { title: "Vitaminas", bgGradient: "linear-gradient(225deg, #ff0000, #ffa300)" },
        { title: "Pre-Entreno", bgGradient: "linear-gradient(225deg, #17b617, #ffd643)" }
    ];

    return (
        <section className="h-max flex justify-center items-center gap-6 flex-wrap pb-[50px]">
            <div className="p-4">
                <ParallaxBanner imageUrl="/images/banner.jpg" text="ENVIOS A TODO EL PAÍS" />
            </div>
            <h3 className="text-[36px] text-center font-semibold opacity-95">NUESTROS PRODUCTOS</h3>
            {products.map((product, index) => (
                <ProductCard key={index} title={product.title} bgGradient={product.bgGradient} />
            ))}
        </section>
    );
}

export default Products;