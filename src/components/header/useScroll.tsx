import { useState, useEffect } from 'react';

const useScroll = (threshold: number = 50, scrollDeltaDown: number = 700) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > threshold);

            // Mostrar inmediatamente si está subiendo
            if (currentScrollY < lastScrollY) {
                setIsScrollingUp(true);
                setLastScrollY(currentScrollY);
            }

            // Ocultar solo si bajó más de `scrollDeltaDown`
            if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > scrollDeltaDown) {
                setIsScrollingUp(false);
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold, lastScrollY, scrollDeltaDown]);

    return { isScrolled, isScrollingUp };
};

export default useScroll;