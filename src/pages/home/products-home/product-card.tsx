import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
    title: string;
    spacing?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title }) => {
    return (
        <Link 
            to="/catalogo"
            className="w-[90vw] max-w-80 h-80 flex flex-col items-center justify-center rounded-lg personal-sw p-4 bg-[url('/assets/fondo-1.jpeg')] transform transition-transform duration-300 hover:scale-102"
        >
            <div className="h-[200px] flex flex-col items-center justify-center">
                <h3 className="text-[46px] leading-[1] text-white text-center font-rubik">{title}</h3>
            </div>
        </Link>
    );
};

export default ProductCard;
