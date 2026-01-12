// pages/Catalogo.tsx
import React, { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShippingMarquee from "../../components/ShippingMarquee";
import FullSlider from "../../components/FullSlider";

const CatalogoCard = lazy(() => import("./CatalogoCard"));

type Slide = {
  id: number;
  bgMobile: string;
  bgDesktop: string;
  button: {
    text: string;
    link: string;
    positionMobile: string;
    positionDesktop: string;
  };
};

const slides: Slide[] = [
  {
    id: 1,
    bgMobile: "assets/images/SLIDER/CATALOGO/12-1.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/12-1-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/204",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 2,
    bgMobile: "assets/images/SLIDER/CATALOGO/11-1.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/11-1-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/207",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 3,
    bgMobile: "assets/images/SLIDER/CATALOGO/07.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/07-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/83",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 4,
    bgMobile: "assets/images/SLIDER/CATALOGO/02.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/02-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/70",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 5,
    bgMobile: "assets/images/SLIDER/CATALOGO/04.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/04-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/72",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 6,
    bgMobile: "assets/images/SLIDER/CATALOGO/01.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/01-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "/producto/69",
      positionMobile: "top-[61%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
];

const Catalogo: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");

      // Función interna para ejecutar el scroll
      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return true; // Encontrado
        }
        return false; // No encontrado aún
      };

      // 1. Intentamos scrollear de inmediato por si ya está cargado
      if (!attemptScroll()) {
        // 2. Si no está, usamos MutationObserver para detectar cuándo aparece el ID en el DOM
        const observer = new MutationObserver(() => {
          if (attemptScroll()) {
            observer.disconnect(); // Dejamos de observar cuando lo logramos
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        // Limpieza: si en 3 segundos no aparece, desconectamos para evitar fugas de memoria
        return () => observer.disconnect();
      }
    } else {
      // Si no hay hash, siempre arriba
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <FullSlider slides={slides} />
      <ShippingMarquee />

      <div id="productos" className="pt-8 bg-white pb-8">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <h2 className="w-full mx-auto text-center text-4xl font-bold text-black uppercase">
            Nuestro Catálogo
          </h2>
        </div>

        {/* Aumentamos min-h a [70vh] para que la página tenga cuerpo mientras carga 
          y el navegador pueda posicionar el scroll correctamente.
        */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-16 text-center min-h-[70vh]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500 mb-4" />
              <p className="text-gray-700 font-medium">Cargando productos...</p>
            </div>
          }
        >
          <CatalogoCard />
        </Suspense>
      </div>

      <ShippingMarquee />
    </>
  );
};

export default Catalogo;