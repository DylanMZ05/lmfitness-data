// src/components/FeaturedSlider.tsx
import React, { useRef, useEffect, useMemo, useState } from "react";
import { Category } from "../data/products";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";

interface Props {
  title?: string;
  categories: Category[];
  bgColor?: string;
  mode?: "featured" | "exclusive";
  /** Si true, el carrusel se monta recién al ser visible (mejor Mobile). */
  deferUntilVisible?: boolean;
}

const CARD_WIDTH = 250;
const GAP = 16;
const SIDE_PADDING = GAP / 2;

const FeaturedSlider: React.FC<Props> = ({
  title,
  categories,
  bgColor = "bg-white",
  mode = "featured",
  deferUntilVisible = true,
}) => {
  const scrollToTop = useScrollToTop();

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [scrollAmount, setScrollAmount] = useState(CARD_WIDTH + GAP);
  const [totalCarouselWidth, setTotalCarouselWidth] = useState(266); // default 1 card

  // ---- Defer mount until visible (reduce JS inicial en mobile)
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(!deferUntilVisible);

  useEffect(() => {
    if (!deferUntilVisible) return;
    if (visible) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [deferUntilVisible, visible]);

  // ---- Helper para rutas absolutas y fallback
  const toAbs = (p?: string) => {
    const src = (p && p.trim()) || "assets/fallback.png";
    // aseguro prefijo base y quito dobles slashes
    return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
  };

  // ---- Filtrado + orden memoizado
  const filteredProducts = useMemo(() => {
    return categories
      .flatMap((cat) => cat.products)
      .filter((p) => (mode === "exclusive" ? typeof p.exclusiveId === "number" : typeof p.featuredId === "number"))
      .sort((a, b) => {
        const idA = mode === "exclusive" ? a.exclusiveId ?? 0 : a.featuredId ?? 0;
        const idB = mode === "exclusive" ? b.exclusiveId ?? 0 : b.featuredId ?? 0;
        return idA - idB;
      });
  }, [categories, mode]);

  // ---- Layout responsive (cuántas cards entran)
  const updateLayout = () => {
    const screenWidth = window.innerWidth;
    let cardsThatFit = 1;
    if (screenWidth >= 1280) cardsThatFit = 4;
    else if (screenWidth >= 1024) cardsThatFit = 3;
    else if (screenWidth >= 768) cardsThatFit = 2;

    const totalWidth =
      cardsThatFit * CARD_WIDTH +
      (cardsThatFit - 1) * GAP +
      SIDE_PADDING * 2;

    setTotalCarouselWidth(totalWidth);
    setScrollAmount(CARD_WIDTH + GAP);
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // ---- Scroll helpers
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const left = direction === "left" ? -scrollAmount : scrollAmount;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollRef.current.scrollBy({
        left,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      ref={(el) => (rootRef.current = el)}
      className={`w-full flex flex-col items-center pb-10 px-4 ${bgColor}`}
      aria-label={title || (mode === "exclusive" ? "Productos exclusivos" : "Productos destacados")}
    >
      {title && <h2 className="text-4xl font-bold text-center">{title}</h2>}

      {/* Si aún no es visible y deferUntilVisible=true, reservo espacio y no monto el carrusel */}
      {!visible ? (
        <div style={{ height: 420, width: "100%", maxWidth: totalCarouselWidth }} aria-hidden="true" />
      ) : (
        <div className="w-full flex justify-center">
          <div
            className="relative flex items-center"
            style={{ maxWidth: totalCarouselWidth, width: "100%" }}
            role="region"
            aria-roledescription="carousel"
          >
            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute -left-11 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
              aria-label="Desplazar carrusel a la izquierda"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Carrusel */}
            <div ref={scrollRef} className="overflow-hidden flex-1 py-2">
              <div
                className="flex transition-all duration-300"
                style={{
                  gap: `${GAP}px`,
                  paddingLeft: `${SIDE_PADDING}px`,
                  paddingRight: `${SIDE_PADDING}px`,
                  // scroll-snap ayuda a UX en mobile (opcional)
                  scrollSnapType: "x mandatory",
                } as React.CSSProperties}
              >
                {filteredProducts.map((product, i) => (
                  <div
                    key={`${product.id}-${mode}`}
                    ref={i === 0 ? itemRef : null}
                    className="w-[250px] h-[400px] flex-shrink-0 bg-white border border-black/10 shadow-md rounded-lg p-4 flex flex-col justify-between"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <img
                      src={toAbs(product.images?.[0])}
                      alt={product.title}
                      className="w-full h-40 object-contain mb-4"
                      loading="lazy"
                      decoding="async"
                      width={250}
                      height={160}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = toAbs("assets/fallback.png");
                      }}
                    />

                    <div className="flex-1 flex flex-col justify-start">
                      <h3 className="font-semibold text-sm mb-1 break-words">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-gray-600 line-clamp-3">{product.description}</p>
                      )}

                      {product.offerPrice ? (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 line-through">$ {product.price}</p>
                          <p className="text-lg font-bold text-red-600">$ {product.offerPrice}</p>
                        </div>
                      ) : (
                        <p className="text-lg font-bold mt-2">$ {product.price}</p>
                      )}
                    </div>

                    <Link
                      to={`/producto/${product.id}`}
                      onClick={scrollToTop}
                      className="mt-4 text-center bg-black text-white py-2 rounded-md text-sm"
                    >
                      Ver producto
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute -right-11 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
              aria-label="Desplazar carrusel a la derecha"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedSlider;
