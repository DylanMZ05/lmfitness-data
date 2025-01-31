import { useState, useEffect, useRef } from 'react';

const useActiveSection = (sectionIds: string[]): [string, (id: string) => void] => {
  const [activeSection, setActiveSection] = useState<string>('');
  const isClicking = useRef(false);

  const setActiveSectionManually = (id: string) => {
    isClicking.current = true;
    setActiveSection(id);
    setTimeout(() => {
      isClicking.current = false;
    }, 800);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isClicking.current) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 5) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const currentSection = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return [activeSection, setActiveSectionManually];
};

export default useActiveSection;