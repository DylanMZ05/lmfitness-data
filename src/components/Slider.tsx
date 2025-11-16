import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

interface Slide {
  imageDesktop: string;
  imageMobile: string;
  link?: string;
  alt?: string;
}

interface ParallaxSliderProps {
  slides: Slide[];
  width?: string;
}

const ParallaxSlider: React.FC<ParallaxSliderProps> = ({
  slides,
  width = "w-[96vw]",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSlideDelay = 7000;
  const scrollToTop = useScrollToTop();

  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // Si no hay slides, no renderizamos nada
  if (!slides || slides.length === 0) return null;

  const isSingle = slides.length === 1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetAutoSlide = useCallback(() => {
    if (isSingle) return; // no auto-slide si hay solo una imagen
    if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
    autoSlideTimeout.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoSlideDelay);
  }, [slides.length, isSingle]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
    };
  }, [currentIndex, resetAutoSlide]);

  useEffect(() => {
    if (currentIndex >= slides.length) setCurrentIndex(0);
  }, [slides.length, currentIndex]);

  const nextSlide = () => {
    if (isSingle) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    resetAutoSlide();
  };

  const prevSlide = () => {
    if (isSingle) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    resetAutoSlide();
  };

  const goToSlide = (index: number) => {
    if (isSingle) return;
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSingle) return;
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isSingle) return;
    if (!isDragging.current || startX.current === null) return;
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    isDragging.current = false;
    startX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSingle) return;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSingle) return;
    if (startX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    startX.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${width} max-w-325 mx-auto border-2 border-black/40 shadow-md`}
      onMouseDown={isSingle ? undefined : handleMouseDown}
      onMouseUp={isSingle ? undefined : handleMouseUp}
      onTouchStart={isSingle ? undefined : handleTouchStart}
      onTouchEnd={isSingle ? undefined : handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const imageUrlDesktop = slide.imageDesktop.startsWith("/")
            ? slide.imageDesktop
            : `/${slide.imageDesktop}`;
          const imageUrlMobile = slide.imageMobile.startsWith("/")
            ? slide.imageMobile
            : `/${slide.imageMobile}`;

          return (
            <div
              key={index}
              className="w-full aspect-[1/1] md:aspect-[16/7] flex-shrink-0 relative overflow-hidden group"
            >
              <Link
                to={slide.link || "#"}
                onClick={scrollToTop}
                className="absolute inset-0 block"
                aria-label={slide.alt ? `Ir a ${slide.alt}` : "Ver más detalles"}
              >
                <picture>
                  <source media="(min-width: 768px)" srcSet={imageUrlDesktop} />
                  <img
                    src={isMobile ? imageUrlMobile : imageUrlDesktop}
                    srcSet={`${imageUrlMobile} 768w, ${imageUrlDesktop} 1280w`}
                    sizes="(min-width: 1024px) 70vw, 96vw"
                    alt={slide.alt ?? ""}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </picture>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Arrows (solo si hay más de 1 slide) */}
      {slides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition cursor-pointer"
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            <FaChevronLeft size={15} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition cursor-pointer"
            onClick={nextSlide}
            aria-label="Slide siguiente"
          >
            <FaChevronRight size={15} />
          </button>
        </>
      )}

      {/* Dots (solo si hay más de 1 slide) */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-black/30"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParallaxSlider;
