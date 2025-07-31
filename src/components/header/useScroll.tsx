import { useState, useEffect, useRef } from "react";

const useScroll = (threshold: number = 50, scrollDeltaDown: number = 700) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true; 

        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Solo actualiza si cambia el estado (evita renders extra)
          if (currentScrollY > threshold !== isScrolled) {
            setIsScrolled(currentScrollY > threshold);
          }

          if (currentScrollY < lastScrollY.current) {
            if (!isScrollingUp) setIsScrollingUp(true);
          } else if (
            currentScrollY > lastScrollY.current &&
            currentScrollY - lastScrollY.current > scrollDeltaDown
          ) {
            if (isScrollingUp) setIsScrollingUp(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, scrollDeltaDown, isScrolled, isScrollingUp]);

  return { isScrolled, isScrollingUp };
};

export default useScroll;
