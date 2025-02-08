import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import useScroll from './useScroll';
import useActiveSection from './useActiveSection';

const Header: React.FC = () => {
    const isScrolled = useScroll(50);
    const sectionIds = ['inicio', 'productos', 'sobrenosotros'];
    const [activeSection, setActiveSectionManually] = useActiveSection(sectionIds);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (id: string) => {
        setActiveSectionManually(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <header
            className={`w-screen h-auto fixed z-50 transition-colors duration-300 ${
                isScrolled ? 'bg-neutral-950' : 'bg-gradient-to-b from-black to-transparent'
            }`}
        >
            <div className="flex justify-between items-center text-white p-4">
                {/* Botón Hamburguesa */}
                <button
                    className="w-[70px] ml-2 text-white focus:outline-none z-50 lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                    <div className={`w-8 h-1 bg-white my-1.5 rounded transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                </button>

                {/* Logo */}
                <div className="flex items-center justify-center z-50 mx-5 w-[70px] xl:ml-15">
                    <img src="assets/logo.jpeg" alt="Logo" className="h-13 img-shadow" />
                </div>

                {/* Carrito en menú móvil */}
                <div className="right-24 text-white z-50 mr-2 flex w-[70px] justify-between lg:hidden">
                <button>
                    <Search size={26} />
                </button>
                <button>
                    <ShoppingCart size={26} />
                </button>
                </div>

                {/* Menú principal */}
                <div className="hidden lg:flex items-center">
                    <ul className="flex justify-between items-center w-150 mr-10 font-medium ts-xl xl:mr-20 ">
                        <li className={`relative font-medium hover:text-red-500 transition-all duration-100 ${activeSection === 'inicio' ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''}`}>
                            <a href="/lmfitness/#inicio" onClick={() => handleClick('inicio')}>Inicio</a>
                        </li>
                        <li className={`relative font-medium hover:text-red-500 transition-all duration-100 ${activeSection === 'inspiracion' ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''}`}>
                            <a href="/lmfitness/#inspiracion" onClick={() => handleClick('inspiracion')}>Productos</a>
                        </li>
                        <li className={`relative font-medium hover:text-red-500 transition-all duration-100 ${activeSection === 'ubicaciones' ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''}`}>
                            <a href="/lmfitness/#ubicaciones" onClick={() => handleClick('ubicaciones')}>Sobre Nosotros</a>
                        </li>
                        <li className={`relative font-medium hover:text-red-500 transition-all duration-100 ${activeSection === 'contacto' ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''}`}>
                            <a href="/lmfitness/#contacto" onClick={() => handleClick('contacto')}>Contacto</a>
                        </li>
                    </ul>

                    {/* Carrito en escritorio */}
                    <button className="mr-7 text-white">
                        <ShoppingCart size={24} />
                    </button>
                </div>

                {/* Menú móvil */}
                <div className={`lg:hidden fixed z-20 top-0 left-0 w-full h-90 bg-black text-white flex flex-col items-center justify-end space-y-8 pb-10 transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500`}>
                    <a href="/lmfitness/#inicio" className={`text-2xl ${activeSection === 'inicio' ? 'text-red-500 underline' : ''}`} onClick={() => handleClick('inicio')}>
                        Inicio
                    </a>
                    <a href="/lmfitness/#inspiracion" className={`text-2xl ${activeSection === 'inspiracion' ? 'text-red-500 underline' : ''}`} onClick={() => handleClick('inspiracion')}>
                        Productos
                    </a>
                    <a href="/lmfitness/#precios" className={`text-2xl ${activeSection === 'precios' ? 'text-red-500 underline' : ''}`} onClick={() => handleClick('precios')}>
                        Sobre Nosotros
                    </a>
                    <a href="/lmfitness/#ubicaciones" className={`text-2xl ${activeSection === 'ubicaciones' ? 'text-red-500 underline' : ''}`} onClick={() => handleClick('ubicaciones')}>
                        Contacto
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;