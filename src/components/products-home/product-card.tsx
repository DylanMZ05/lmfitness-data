import React from "react";

interface ProductCardProps {
    title: string;
    bgGradient: string; // Nuevo prop para el fondo degradado
}

const ProductCard: React.FC<ProductCardProps> = ({ title, bgGradient }) => {
    return (
        <div
            className="w-[90vw] max-w-80 h-80 flex flex-col items-center justify-end rounded-lg shadow-lg p-4"
            style={{ background: bgGradient }}
        >
            <h3 className="mb-6 text-3xl font-bold text-white">{title}</h3>
            <button className="h-max bg-blue-500 text-white px-4 py-1 rounded-md mb-5">
                VER MÁS
            </button>
        </div>
    );
};

export default ProductCard;