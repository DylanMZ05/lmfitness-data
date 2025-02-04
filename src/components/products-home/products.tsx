import React from "react";
import ProductCard from "./product-card";

const Products: React.FC = () => {
    const products = [
        { title: "Proteínas", bgGradient: "linear-gradient(225deg, #000000, #a4a4a4)" },
        { title: "Vitaminas", bgGradient: "linear-gradient(225deg, #42e695, #3bb2b8)" },
        { title: "Creatinas", bgGradient: "linear-gradient(225deg, #ff9966, #ff5e62)" }
    ];

    return (
        <section className="h-max flex justify-center items-center gap-6 flex-wrap py-[50px]">
            <h3>NUESTROS PRODUCTOS</h3>
            {products.map((product, index) => (
                <ProductCard key={index} title={product.title} bgGradient={product.bgGradient} />
            ))}
        </section>
    );
}

export default Products;