// src/pages/main.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
========================= */
const slides = [
  {
    id: 1,
    bgMobile: "assets/images/SLIDER/HOME/01.webp",
    bgDesktop: "assets/images/SLIDER/HOME/01-desktop.webp",
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
    bgMobile: "assets/images/SLIDER/HOME/02.webp",
    bgDesktop: "assets/images/SLIDER/HOME/02-desktop.webp",
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
    bgMobile: "assets/images/SLIDER/HOME/03.webp",
    bgDesktop: "assets/images/SLIDER/HOME/03-desktop.webp",
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
   - Inserta <link rel="preload" as="image"> en <head>
   - Útil como backup en SPA; el preload temprano está en index.html
======================================== */
const PreloadLCPLinks: React.FC<{ isDesktop: boolean }> = ({ isDesktop }) => {
  useLayoutEffect(() => {
    const ensurePreload = (href: string, fetchPriority?: "high" | "auto") => {
      if (!href) return;

      // Evitar duplicados: comparamos por atributo href exacto o sufijo del .href
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
      // Si servís imágenes desde CDN/dominio distinto:
      // link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    };

    // LCP (primer slide) con prioridad alta
    const first = slides[0];
    ensurePreload(isDesktop ? first.bgDesktop : first.bgMobile, "high");

    // Siguiente slide para transición más suave
    const second = slides[1];
    if (second) ensurePreload(isDesktop ? second.bgDesktop : second.bgMobile, "auto");
  }, [isDesktop]);

  return null;
};

const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDesktop = useIsDesktop();

  const handleNext = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetInterval();
  };

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

  return (
    <>
      {/* Backup SPA: inyecta preloads también desde React */}
      <PreloadLCPLinks isDesktop={isDesktop} />

      <div className="relative w-full overflow-hidden max-w-screen">
        <div className="relative w-full">
          {/* Slider */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slide.id}
                className="relative w-full flex-shrink-0"
                style={{ minWidth: "100%" }}
              >
                <div className="relative w-full">
                  <picture>
                    {/* (Opcional) AVIF primero si lo tenés generado
                    <source
                      media="(min-width: 768px)"
                      type="image/avif"
                      srcSet={`${slide.bgDesktop.replace('.webp','.avif')} 1440w, ${slide.bgMobile.replace('.webp','.avif')} 720w`}
                      sizes="100vw"
                    /> */}
                    <source
                      media="(min-width: 768px)"
                      type="image/webp"
                      srcSet={`${slide.bgDesktop} 1440w, ${slide.bgMobile} 720w`}
                      sizes="100vw"
                    />
                    <img
                      src={slide.bgMobile}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-auto object-contain block"
                      // LCP = el primer slide debe ser eager + fetchpriority=high
                      loading={slideIndex === 0 ? "eager" : "lazy"}
                      decoding="async"
                      {...({
                        fetchpriority: slideIndex === 0 ? "high" : "auto",
                      } as any)}
                      // Si usás CDN/dominio distinto:
                      // crossOrigin="anonymous"
                    />
                  </picture>

                  <AnimatePresence mode="wait">
                    {index === slideIndex && (
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
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas */}
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
