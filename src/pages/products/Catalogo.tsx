// pages/Catalogo.tsx
import React from "react";
import CatalogoCard from "./CatalogoCard";
import FullSlider from "../../components/FullSlider";

const slides = [
  {
    id: 1,
    bgMobile: "assets/images/SLIDER/HOME/01.webp",
    bgDesktop: "assets/images/SLIDER/HOME/01-desktop.webp",
    button: {
      text: "VER PRODUCTOS",
      link: "#productos",
      positionMobile: "top-[75%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[75%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 2,
    bgMobile: "assets/images/SLIDER/HOME/02.webp",
    bgDesktop: "assets/images/SLIDER/HOME/02-desktop.webp",
    button: {
      text: "DESCUBRIR MÁS",
      link: "#productos",
      positionMobile: "top-[75%] left-1/2 -translate-x-1/2",
      positionDesktop: "top-[75%] left-1/2 -translate-x-1/2",
    },
  },
];

const Catalogo: React.FC = () => {
  return (
    <>
      <FullSlider slides={slides} />
      <div id="productos" className="pt-8">
        <CatalogoCard />
      </div>
    </>
  );
};

export default Catalogo;