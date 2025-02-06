import { useEffect, useState, useCallback } from "react";
import { FaShoppingCart, FaCheckCircle, FaBoxOpen, FaClipboardList, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
  imageUrl: string;
  text: string;
  icon: JSX.Element;
}

const slides: Slide[] = [
  {
    imageUrl: "/images/step1.jpg",
    text: "Comprá tus productos en tres simples pasos",
    icon: <FaClipboardList className="text-5xl text-white" />,
  },
  {
    imageUrl: "/images/step1.jpg",
    text: "Paso 1: Selecciona tus productos",
    icon: <FaShoppingCart className="text-5xl text-white" />,
  },
  {
    imageUrl: "/images/step2.jpg",
    text: "Paso 2: Agrega al carrito y procede al pago",
    icon: <FaCheckCircle className="text-5xl text-white" />,
  },
  {
    imageUrl: "/images/step3.jpg",
    text: "Paso 3: Recibe tu pedido y disfruta",
    icon: <FaBoxOpen className="text-5xl text-white" />,
  },
];

const ParallaxSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideDelay = 7000;
  let autoSlideTimeout: ReturnType<typeof setTimeout>;

  const resetAutoSlide = useCallback(() => {
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoSlideDelay);
  }, [currentIndex]);

  useEffect(() => {
    resetAutoSlide();
    return () => clearTimeout(autoSlideTimeout);
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
    <div className="relative w-[96vw] overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-64">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
              {slide.icon}
              <h1 className="text-white text-3xl font-bold text-center mt-4 px-20">
                {slide.text}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
        onClick={prevSlide}
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
        onClick={nextSlide}
      >
        <FaChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxSlider;