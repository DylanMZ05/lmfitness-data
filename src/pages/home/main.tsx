import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    bg: "assets/images/SLIDER/HOME/01.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "bottom-70 left-1/2 -translate-x-1/2", // centrado abajo
    },
  },
  {
    id: 2,
    bg: "assets/images/SLIDER/HOME/02.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "bottom-15 left-1/2 -translate-x-1/2", // arriba derecha
    },
  },
  {
    id: 3,
    bg: "assets/images/SLIDER/HOME/03.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", // centro absoluto
    },
  },
];

const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full overflow-hidden max-w-screen">
      <div className="relative w-full">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.bg}
              alt=""
              className="w-full h-auto object-cover object-bottom flex-shrink-0 block"
              style={{ minWidth: "100%" }}
            />
          ))}
        </div>

        {/* Botón con posición individual */}
        <div className={`absolute z-10 transform ${slides[index].button.position}`}>
          <Link
            to={slides[index].button.link}
            className="bg-amber-50 text-black font-semibold py-3 px-8 rounded-full text-lg shadow-lg"
          >
            {slides[index].button.text}
          </Link>
        </div>

        {/* Flechas */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/0 p-2 rounded-full hover:bg-black/60"
        >
          <ChevronLeft className="text-white/20" size={30} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/0 p-2 rounded-full hover:bg-black/60"
        >
          <ChevronRight className="text-white/20" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Main;