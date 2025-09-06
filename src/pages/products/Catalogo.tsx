// pages/Catalogo.tsx
import React, { Suspense, lazy } from "react";
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
  return (
    <>
      <FullSlider slides={slides} />
      <ShippingMarquee />
      <div id="productos" className="pt-8 bg-white pb-8">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <h2 className="w-full mx-auto text-center text-4xl font-bold text-black">
            NUESTRO CATÁLOGO
          </h2>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-orange-500 mb-4" />
              <p className="text-gray-700 font-medium">Cargando catálogo...</p>
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
