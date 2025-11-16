import React from "react";
import ProductCard from "./ProductCard";

type HomeProduct = {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
};

const products: HomeProduct[] = [
  {
    id: "home-pre-entrenos",
    title: "",
    imageUrl: "/assets/images/HOME-CARDS/01.webp",
    link: "/catalogo#pre-entrenos",
  },
  {
    id: "home-proteinas",
    title: "",
    imageUrl: "/assets/images/HOME-CARDS/02.webp",
    link: "/catalogo#proteinas",
  },
  {
    id: "home-creatinas",
    title: "",
    imageUrl: "/assets/images/HOME-CARDS/03.webp",
    link: "/catalogo#creatinas",
  },
];

const Products: React.FC = () => {
  return (
    <section
      id="productos"
      className="h-max flex justify-center items-center gap-6 flex-wrap py-15 shadow-2xl"
      aria-label="Categorías destacadas de suplementos"
    >
      <div className="flex flex-wrap justify-center gap-6 w-full px-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
