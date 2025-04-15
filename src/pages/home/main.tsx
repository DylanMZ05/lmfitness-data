import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    bg: "assets/images/SLIDER/HOME/01.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "top-[53%] left-1/2 -translate-x-1/2", // proporcional al alto
    },
  },
  {
    id: 2,
    bg: "assets/images/SLIDER/HOME/02.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "top-[87%] left-1/2 -translate-x-1/2",
    },
  },
  {
    id: 3,
    bg: "assets/images/SLIDER/HOME/03.webp",
    button: {
      text: "VER CATÁLOGO",
      link: "/catalogo",
      position: "top-[58%] left-1/2 -translate-x-1/2",
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
  
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
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
                <img
                  src={slide.bg}
                  alt=""
                  className="w-full h-auto object-contain block"
                />

                <AnimatePresence mode="wait">
                  {index === slideIndex && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute z-10 transform ${slide.button.position} w-full px-2`}
                    >
                      <div className="flex justify-center">
                        <Link
                          to={slide.button.link}
                          className="bg-amber-50 text-black font-semibold py-2 px-4 rounded-full text-md shadow-lg whitespace-nowrap min-w-[140px] text-center md:text-lg"
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