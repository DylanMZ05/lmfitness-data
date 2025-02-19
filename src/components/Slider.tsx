import { useEffect, useState, useCallback, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

interface Slide {
  imageUrl: string;
  text: string;
  icon: JSX.Element;
}

interface ParallaxSliderProps {
  slides: Slide[];
  width?: string; // Permite personalizar el ancho
}

const ParallaxSlider: React.FC<ParallaxSliderProps> = ({ slides, width = "w-[96vw]" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSlideDelay = 7000;

  const resetAutoSlide = useCallback(() => {
    if (autoSlideTimeout.current) {
      clearTimeout(autoSlideTimeout.current);
    }
    autoSlideTimeout.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoSlideDelay);
  }, [autoSlideDelay, slides.length]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideTimeout.current) {
        clearTimeout(autoSlideTimeout.current);
      }
    };
  }, [currentIndex, resetAutoSlide]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    resetAutoSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    resetAutoSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${width}`}>
      {/* Contenedor deslizante */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full min-h-[250px] flex-shrink-0 relative h-64">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
              {slide.icon}
              <h1 className="text-white text-2xl font-bold text-center my-4 mx-15">
                {slide.text}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition cursor-pointer"
        onClick={prevSlide}
      >
        <FaChevronLeft size={15} />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition cursor-pointer"
        onClick={nextSlide}
      >
        <FaChevronRight size={15} />
      </button>

      {/* Controles del slider */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400 cursor-pointer"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxSlider;
