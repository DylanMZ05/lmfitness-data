// src/pages/main.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ShippingMarquee from "../../components/ShippingMarquee";

/* =========================
   Hook: desktop breakpoint
   Sincronizado a 768px para coincidir con Tailwind 'md'
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
   Slides data
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
   Preload de LCP Inteligente
   Añade el atributo media para que el navegador sepa qué priorizar
======================================== */
const PreloadLCPLinks: React.FC = () => {
  useLayoutEffect(() => {
    const first = slides[0];
    
    // Función auxiliar para inyectar preload
    const addPreload = (href: string, media?: string, fetchPriority: "high" | "auto" = "auto") => {
      if (!href) return;
      // Evitar duplicados
      if (document.head.querySelector(`link[rel="preload"][href="${href}"]`)) return;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      if (media) link.media = media;
      link.setAttribute("fetchpriority", fetchPriority);
      document.head.appendChild(link);
    };

    // 1. Preload Desktop (Solo si la pantalla es >= 768px)
    addPreload(first.bgDesktop, "(min-width: 768px)", "high");

    // 2. Preload Mobile (Solo si la pantalla es < 768px)
    addPreload(first.bgMobile, "(max-width: 767.98px)", "high");

    // Opcional: Preload del segundo slide (baja prioridad)
    const second = slides[1];
    if (second) {
      addPreload(second.bgDesktop, "(min-width: 768px)", "auto");
      addPreload(second.bgMobile, "(max-width: 767.98px)", "auto");
    }
  }, []);

  return null;
};

/* ========================================
   Componente Slide Individual
   Usa <picture> correctamente para Art Direction
======================================== */
const Slide: React.FC<{
  slide: (typeof slides)[number];
  slideIndex: number;
  current: number;
  isDesktop: boolean;
}> = ({ slide, slideIndex, current, isDesktop }) => (
  <div className="relative w-full flex-shrink-0" style={{ minWidth: "100%" }}>
    <div className="relative w-full">
      <picture>
        {/* FUENTE DESKTOP: 
          Se activa SOLO si el ancho es >= 768px.
        */}
        <source
          media="(min-width: 768px)"
          srcSet={slide.bgDesktop}
          type="image/webp"
        />
        
        {/* FUENTE MOBILE (Default/Fallback):
          Aquí está el arreglo: NO ponemos bgDesktop en el srcSet de la img.
          Esto fuerza al móvil a usar bgMobile, sin importar su densidad de píxeles.
        */}
        <img
          src={slide.bgMobile}
          alt={slide.alt}
          width={slide.width}
          height={slide.height}
          // sizes="100vw" ayuda al navegador a calcular el espacio ocupado
          sizes="100vw"
          className="w-full h-auto object-contain block"
          
          // Optimización para Lighthouse (Solo el primero es eager/high)
          loading={slideIndex === 0 ? "eager" : "lazy"}
          decoding="async"
          {...({
            fetchpriority: slideIndex === 0 ? "high" : "auto",
          } as any)}
        />
      </picture>

      {/* Lógica del botón (posicionamiento condicional) */}
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

/* ========================================
   Componente Main (Carrusel)
======================================== */
const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false); 
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDesktop = useIsDesktop();

  // Hidratación progresiva
  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lógica del intervalo automático
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
      {/* Preload Links se maneja independiente de isDesktop ahora */}
      <PreloadLCPLinks />

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