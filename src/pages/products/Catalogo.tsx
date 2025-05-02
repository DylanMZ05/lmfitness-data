// pages/Catalogo.tsx
import React from "react";
import CatalogoCard from "./CatalogoCard";
import ShippingMarquee from "../../components/ShippingMarquee";
import FullSlider from "../../components/FullSlider";

const slides = [
  {
    id: 1,
    bgMobile: "assets/images/SLIDER/CATALOGO/01.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/01-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "#productos",
      positionMobile: "top-[90%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 2,
    bgMobile: "assets/images/SLIDER/CATALOGO/02.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/02-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "#productos",
      positionMobile: "top-[90%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 3,
    bgMobile: "assets/images/SLIDER/CATALOGO/03.webp",
    bgDesktop: "assets/images/SLIDER/CATALOGO/03-desktop-1.webp",
    button: {
      text: "VER COMBO",
      link: "#productos",
      positionMobile: "top-[90%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[81%] left-1/2 -translate-x-1/2",
    },
  },
];

const Catalogo: React.FC = () => {
  return (
    <>
      <FullSlider slides={slides} />
      <ShippingMarquee />
      <div id="productos" className="pt-8 productos-section">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <h2 className="w-full mx-auto text-center text-4xl font-bold text-white">NUESTRO CÁTALOGO</h2>
        </div>
        <CatalogoCard />
      </div>
      <ShippingMarquee />
    </>
  );
};

export default Catalogo;