// src/pages/main.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShippingMarquee from "../../components/ShippingMarquee";

// Hook para detectar si es desktop
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

const slides = [
  {
    id: 1,
    bgMobile: "assets/images/SLIDER/HOME/01.webp",
    bgDesktop: "assets/images/SLIDER/HOME/01-desktop.webp",
    alt: "Entrenamiento personalizado en Exentra",
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
                    <source
                      media="(min-width: 768px)"
                      srcSet={slide.bgDesktop}
                    />
                    <img
                      src={slide.bgMobile}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-auto object-contain block"
                      loading={slideIndex === 0 ? "eager" : "lazy"}
                      decoding="async"
                      {...({ fetchpriority: slideIndex === 0 ? "high" : "auto" } as any)}
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
