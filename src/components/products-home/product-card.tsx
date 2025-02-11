import React from "react";

interface ProductCardProps {
    title: string;
    spacing?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, spacing = "mt-4" }) => {
    return (
        <div
            className="w-[90vw] max-w-80 h-80 flex flex-col items-center justify-center rounded-lg personal-sw p-4 bg-[url('/assets/fondo-1.jpeg')]"
        >
            <div className="h-[200px] flex flex-col items-center justify-center">
                <h3 className="text-[46px] leading-[1] text-white text-center font-rubik">{title}</h3>
                <button className={`h-max bg-blue-500 text-white px-4 py-1 rounded-md ${spacing}`}>
                    VER MÁS
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
