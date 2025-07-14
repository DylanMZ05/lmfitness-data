import React from "react";
import FeaturedSlider from "./FeaturedSlider";
import { Category } from "../data/products";
import { SkeletonCard } from "./SkeletonCard";

interface Props {
  categorias: Category[];
  loading: boolean;
}

const SliderDestacado: React.FC<Props> = ({ categorias, loading }) => {
  return (
    <section className="w-full py-10 px-4 bg-neutral-100">
      <h2 className="text-4xl font-bold text-center">PRODUCTOS DESTACADOS</h2>
      <div className="w-40 h-[3px] bg-red-600 my-3 mx-auto rounded-full"></div>

      {loading ? (
        <div className="flex gap-4 justify-center min-h-[420px]">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <FeaturedSlider title="" categories={categorias} mode="featured" />
      )}
    </section>
  );
};

export default SliderDestacado;
