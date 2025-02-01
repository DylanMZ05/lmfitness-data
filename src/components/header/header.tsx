import React, { useState } from 'react';
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
            <div className="flex justify-between items-center text-white">
                {/* Logo */}
                <div className="flex z-50 items-center p-2 pl-0 ml-5 xl:ml-15">
                    <img
                        src="public/assets/logo.jpeg"
                        alt="Logo"
                        className="h-13 mr-2 img-shadow"
                    />
                    <p className="hidden sm:flex text-lg font-semibold crimsontext tracking-wider ts-xl">
                        LM <br />
                        FITNESS
                    </p>
                </div>

                {/* Botón Hamburguesa */}
                <button
                    className="lg:hidden mr-10 text-white focus:outline-none z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div
                        className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${
                            menuOpen ? 'rotate-45 translate-y-2.5' : ''
                        }`}
                    ></div>
                    <div
                        className={`w-8 h-1 bg-white my-1.5 rounded transition-opacity duration-300 ${
                            menuOpen ? 'opacity-0' : ''
                        }`}
                    ></div>
                    <div
                        className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${
                            menuOpen ? '-rotate-45 -translate-y-2.5' : ''
                        }`}
                    ></div>
                </button>

                {/* Menú principal */}
                <ul className="hidden lg:flex justify-between items-center w-150 mr-10 font-medium ts-xl xl:mr-20 xl:w-175">
                    <li
                        className={`relative font-medium hover:text-red-500 hover:scale-105 hover:underline hover:underline-offset-5 hover:decoration-2 transition-all duration-100 ${
                            activeSection === 'inicio'
                                ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105'
                                : ''
                        }`}
                    >
                        <a href="/lmfitness/#inicio" onClick={() => handleClick('inicio')}>
                            Inicio
                        </a>
                    </li>
                    <li
                        className={`relative font-medium hover:text-red-500 hover:scale-105 hover:underline hover:underline-offset-5 hover:decoration-2 transition-all duration-100 ${
                            activeSection === 'inspiracion'
                                ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105'
                                : ''
                        }`}
                    >
                        <a href="/lmfitness/#inspiracion" onClick={() => handleClick('inspiracion')}>
                            Productos
                        </a>
                    </li>
                    <li
                        className={`relative font-medium hover:text-red-500 hover:scale-105 hover:underline hover:underline-offset-5 hover:decoration-2 transition-all duration-100 ${
                            activeSection === 'ubicaciones'
                                ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105'
                                : ''
                        }`}
                    >
                        <a href="/lmfitness/#ubicaciones" onClick={() => handleClick('ubicaciones')}>
                            Sobre Nosotros
                        </a>
                    </li>
                    <li
                        className={`relative font-medium hover:text-red-500 hover:scale-105 hover:underline hover:underline-offset-5 hover:decoration-2 transition-all duration-100 ${
                            activeSection === 'contacto'
                                ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105'
                                : ''
                        }`}
                    >
                        <a href="/lmfitness/#contacto" onClick={() => handleClick('contacto')}>
                            Contacto
                        </a>
                    </li>
                </ul>

                {/* Menú móvil */}
                <div
                    className={`lg:hidden fixed z-20 top-0 left-0 w-full h-90 bg-black text-white flex flex-col items-center justify-end space-y-8 pb-10 transform ${
                        menuOpen ? 'translate-y-0' : '-translate-y-full'
                    } transition-transform duration-500`}
                >
                    <a
                        href="/lmfitness/#inicio"
                        className={`text-2xl ${
                            activeSection === 'inicio' ? 'text-red-500 underline' : ''
                        }`}
                        onClick={() => handleClick('inicio')}
                    >
                        Inicio
                    </a>
                    <a
                        href="/lmfitness/#inspiracion"
                        className={`text-2xl ${
                            activeSection === 'inspiracion' ? 'text-red-500 underline' : ''
                        }`}
                        onClick={() => handleClick('inspiracion')}
                    >
                        Productos
                    </a>
                    <a
                        href="/lmfitness/#precios"
                        className={`text-2xl ${
                            activeSection === 'precios' ? 'text-red-500 underline' : ''
                        }`}
                        onClick={() => handleClick('precios')}
                    >
                        Sobre Nostroso
                    </a>
                    <a
                        href="/lmfitness/#ubicaciones"
                        className={`text-2xl ${
                            activeSection === 'ubicaciones' ? 'text-red-500 underline' : ''
                        }`}
                        onClick={() => handleClick('ubicaciones')}
                    >
                        Contacto
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;