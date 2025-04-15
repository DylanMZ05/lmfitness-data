import React from "react";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const products = [
    {
      title: "",
      imageUrl: "assets/images/HOME-CARDS/01.webp",
      link: "/catalogo#proteinas",
    },
    {
      title: "",
      imageUrl: "assets/images/HOME-CARDS/02.webp",
      link: "/catalogo#preentrenos",
    },
    {
      title: "",
      imageUrl: "assets/images/HOME-CARDS/03.webp",
      link: "/catalogo#creatinas",
    },
  ];

  return (
    <section id="productos" className="h-max flex justify-center items-center gap-6 flex-wrap py-15 shadow-2xl">
      <div className="flex flex-wrap justify-center gap-6 w-full px-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            imageUrl={product.imageUrl}
            link={product.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Products;