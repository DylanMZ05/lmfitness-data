import { useState, useEffect, useRef } from "react";

const useActiveSection = (
  sectionIds: string[]
): [string, (id: string) => void] => {
  const [activeSection, setActiveSection] = useState<string>("");
  const isClicking = useRef(false);
  const frameRef = useRef<number | null>(null);

  const setActiveSectionManually = (id: string) => {
    isClicking.current = true;
    setActiveSection(id);
    setTimeout(() => {
      isClicking.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isClicking.current) return;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        // Si llegamos al final de la página → marcar la última sección
        if (scrollPosition >= documentHeight - 5) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
          return;
        }

        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const elementMid = rect.top + rect.height / 2;

          if (elementMid >= 0 && elementMid <= viewportHeight * 0.75) {
            setActiveSection(id);
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return [activeSection, setActiveSectionManually];
};

export default useActiveSection;
