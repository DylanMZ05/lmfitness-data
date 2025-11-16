// src/pages/main.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ShippingMarquee from "../../components/ShippingMarquee";

/* =========================
   Hook: desktop breakpoint
========================= */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
};

/* =========================
   Slides data (LCP = slide[0])
   RUTAS ABSOLUTAS para matchear preload del <head>
========================= */
const slides = [
  {
    id: 1,
    bgMobile: "/assets/images/SLIDER/HOME/01.webp",
    bgDesktop: "/assets/images/SLIDER/HOME/01-desktop.webp",
    alt: "Entrenamiento personalizado LM FITNESS",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      positionMobile: "top-[53%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[75%] left-1/2 -translate-x-1/2",
    },
    width: 720,
    height: 400,
  },
  {
    id: 2,
    bgMobile: "/assets/images/SLIDER/HOME/02.webp",
    bgDesktop: "/assets/images/SLIDER/HOME/02-desktop.webp",
    alt: "Suplementos deportivos y nutrición",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      positionMobile: "top-[87%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[75%] left-1/2 -translate-x-1/2",
    },
    width: 720,
    height: 400,
  },
  {
    id: 3,
    bgMobile: "/assets/images/SLIDER/HOME/03.webp",
    bgDesktop: "/assets/images/SLIDER/HOME/03-desktop.webp",
    alt: "Accesorios y equipamiento para fitness",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      positionMobile: "top-[58%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[75%] left-1/2 -translate-x-1/2",
    },
    width: 720,
    height: 400,
  },
];

/* ========================================
   Preload de LCP (y del siguiente slide)
   Útil como backup SPA (el temprano ya está en index.html)
======================================== */
const PreloadLCPLinks: React.FC<{ isDesktop: boolean }> = ({ isDesktop }) => {
  useLayoutEffect(() => {
    const ensurePreload = (href: string, fetchPriority?: "high" | "auto") => {
      if (!href) return;

      const already = Array.from(
        document.head.querySelectorAll('link[rel="preload"][as="image"]')
      ).some((n) => {
        const el = n as HTMLLinkElement;
        return (
          el.getAttribute("href") === href ||
          el.href.endsWith(href.replace(/^\.?\//, ""))
        );
      });

      if (already) return;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      if (fetchPriority) link.setAttribute("fetchpriority", fetchPriority);
      document.head.appendChild(link);
    };

    const first = slides[0];
    ensurePreload(isDesktop ? first.bgDesktop : first.bgMobile, "high");

    const second = slides[1];
    if (second) {
      ensurePreload(
        isDesktop ? second.bgDesktop : second.bgMobile,
        "auto"
      );
    }
  }, [isDesktop]);

  return null;
};

const Slide: React.FC<{
  slide: (typeof slides)[number];
  slideIndex: number;
  current: number;
  isDesktop: boolean;
}> = ({ slide, slideIndex, current, isDesktop }) => (
  <div className="relative w-full flex-shrink-0" style={{ minWidth: "100%" }}>
    <div className="relative w-full">
      <picture>
        {/* Versión desktop */}
        <source
          media="(min-width: 1024px)"
          type="image/webp"
          srcSet={`${slide.bgDesktop} 1440w`}
          sizes="(min-width: 1024px) 1440px, 100vw"
        />
        {/* Fallback + mobile/tabla */}
        <img
          src={slide.bgMobile} // ABSOLUTA
          srcSet={`${slide.bgMobile} 720w, ${slide.bgDesktop} 1440w`}
          sizes="(min-width: 1024px) 1440px, 100vw"
          alt={slide.alt}
          width={slide.width}
          height={slide.height}
          className="w-full h-auto object-contain block"
          loading={slideIndex === 0 ? "eager" : "lazy"}
          decoding="async"
          {...({
            fetchpriority: slideIndex === 0 ? "high" : "auto",
          } as any)}
        />
      </picture>

      {current === slideIndex && (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-10 w-full px-2 transform ${
            isDesktop
              ? slide.button.positionDesktop
              : slide.button.positionMobile
          }`}
        >
          <div className="flex justify-center">
            <Link
              to={slide.button.link}
              className="bg-amber-50 text-black font-semibold py-2 px-4 rounded-full text-md shadow-lg whitespace-nowrap min-w-[140px] text-center cursor-pointer hover:scale-102 transition-all md:text-lg"
            >
              {slide.button.text}
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false); // pinta primero solo el slide 0
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDesktop = useIsDesktop();

  // Hidratar el resto del carrusel después del primer frame
  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    setIndex((p) => (p === slides.length - 1 ? 0 : p + 1));
    resetInterval();
  };

  const handlePrev = () => {
    setIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
    resetInterval();
  };

  return (
    <>
      <PreloadLCPLinks isDesktop={isDesktop} />

      <div className="relative w-full overflow-hidden max-w-screen">
        <div className="relative w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {!hydrated ? (
              <Slide
                slide={slides[0]}
                slideIndex={0}
                current={0}
                isDesktop={isDesktop}
              />
            ) : (
              slides.map((s, i) => (
                <Slide
                  key={s.id}
                  slide={s}
                  slideIndex={i}
                  current={index}
                  isDesktop={isDesktop}
                />
              ))
            )}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/0 p-2 rounded-full transition-all hover:bg-black/30 cursor-pointer"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="text-white/80" size={30} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/0 p-2 rounded-full transition-all hover:bg-black/30 cursor-pointer"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="text-white/80" size={30} />
          </button>
        </div>
      </div>

      <ShippingMarquee />
    </>
  );
};

export default Main;
