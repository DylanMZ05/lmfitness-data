import React, { useRef, useEffect, useState } from "react";
import { Category } from "../data/products";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title: string;
  categories: Category[];
}

const FeaturedSlider: React.FC<Props> = ({ title, categories }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const featuredProducts = categories
    .flatMap((cat) => cat.products)
    .filter((p) => p.featuredId !== undefined)
    .sort((a, b) => (a.featuredId ?? 0) - (b.featuredId ?? 0));

  useEffect(() => {
    const updateCardWidth = () => {
      if (itemRef.current) {
        const width = itemRef.current.offsetWidth;
        const gap = 16; // Tailwind gap-4 = 1rem = 16px
        setCardWidth(width + gap);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current && cardWidth > 0) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      {/* ⚙️ Ancho dinámico según pantalla */}
      <div className="w-full mx-auto max-w-[600px] sm:max-w-[880px] lg:max-w-[1140px]">
        <div className="flex items-center justify-between gap-4">
          {/* Flecha IZQ */}
          <button
            onClick={() => scroll("left")}
            className="bg-black/70 hover:bg-black text-white p-2 rounded-full shrink-0"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carrusel */}
          <div ref={scrollRef} className="overflow-hidden flex-1">
            <div className="flex gap-4 transition-all duration-300">
              {featuredProducts.map((product, i) => (
                <div
                  key={product.featuredId}
                  ref={i === 0 ? itemRef : null}
                  className="w-[250px] h-[400px] flex-shrink-0 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="font-semibold text-sm mb-1 break-words">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold mt-2">{product.price}</p>
                  </div>
                  <Link
                    to="/catalogo"
                    className="mt-4 text-center bg-black text-white py-2 rounded-md text-sm"
                  >
                    Ver producto
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Flecha DER */}
          <button
            onClick={() => scroll("right")}
            className="bg-black/70 hover:bg-black text-white p-2 rounded-full shrink-0"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;