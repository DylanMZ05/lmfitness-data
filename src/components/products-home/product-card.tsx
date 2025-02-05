import React from "react";

interface ProductCardProps {
    title: string;
    bgGradient: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, bgGradient }) => {
    return (
        <div
            className="w-[90vw] max-w-80 h-80 flex flex-col items-center justify-end rounded-lg personal-sw p-4 text-center"
            style={{ background: bgGradient }}
        >
            <h3 className="mb-21 text-3xl font-bold text-white">{title}</h3>
            <button className="h-max bg-blue-500 text-white px-4 py-1 rounded-md mb-5">
                VER MÁS
            </button>
        </div>
    );
};

export default ProductCard;