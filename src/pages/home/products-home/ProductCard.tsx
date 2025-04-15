import React from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";

interface ProductCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, link }) => {
  const scrollToTop = useScrollToTop();

  return (
    <Link
      to={link}
      onClick={scrollToTop}
      className="w-[90vw] max-w-80 h-80 flex flex-col items-center justify-center rounded-lg personal-sw p-4 transform transition-transform duration-300 hover:scale-102 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="h-[200px] flex flex-col items-center justify-center">
        <h3 className="text-[46px] leading-[1] text-white text-center font-rubik">{title}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;