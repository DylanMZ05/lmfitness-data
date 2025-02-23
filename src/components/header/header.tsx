import React, { useState } from 'react';
import { ShoppingCart, Search, X } from 'lucide-react';
import useScroll from './useScroll';
import useActiveSection from './useActiveSection';
import { useCart } from '../../context/useCart';

const Header: React.FC = () => {
    const isScrolled = useScroll(50);
    const sectionIds = ['inicio', 'productos', 'about', 'contacto'];
    const [activeSection, setActiveSectionManually] = useActiveSection(sectionIds);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cart, removeFromCart, clearCart } = useCart();

    const handleClick = (id: string) => {
        setActiveSectionManually(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    // Calcular el total a pagar
    const totalPrice = cart.reduce((acc, item) => {
        // Convertimos el precio a número eliminando el signo "$" y los puntos si existen
        const price = parseFloat(item.product.price.replace("$", "").replace(".", ""));
        return acc + price * item.quantity;
    }, 0);

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
                    <img src="/assets/logo.jpeg" alt="Logo" className="h-13 img-shadow" />
                </div>

                {/* Carrito en menú móvil */}
                <div className="right-24 text-white z-50 mr-2 flex w-[70px] justify-between lg:hidden">
                    <button>
                        <Search size={26} />
                    </button>
                    <button onClick={() => setCartOpen(!cartOpen)} className="relative">
                        <ShoppingCart size={26} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Menú principal */}
                <div className="hidden lg:flex items-center">
                    <ul className="flex justify-between items-center w-150 mr-10 font-medium text-xl xl:mr-20">
                        {sectionIds.map((id) => (
                            <li
                                key={id}
                                className={`relative font-medium hover:text-red-500 transition-all duration-100 ${
                                    activeSection === id ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''
                                }`}
                            >
                                <a href={`/lmfitness/#${id}`} onClick={() => handleClick(id)}>
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Botón de búsqueda y carrito */}
                    <button>
                        <Search size={26} />
                    </button>
                    <button onClick={() => setCartOpen(!cartOpen)} className="ml-7 mr-3 relative text-white">
                        <ShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Modal del carrito */}
            {cartOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 text-black flex flex-col">
                    {/* Botón de cierre (X) */}
                    <button 
                        className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
                        onClick={() => setCartOpen(false)}
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-xl font-bold">Carrito</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">El carrito está vacío.</p>
                    ) : (
                        <div className="mt-4 flex-grow">
                            {cart.map((item) => (
                                <div key={item.product.id} className="flex justify-between items-center border-b py-2">
                                    <div className='flex'>
                                        <div className='w-12 flex items-center justify-center'>
                                            <img src={item.product.image} alt={item.product.title} className="h-12 object-cover" />
                                        </div>
                                        <div className='w-[222px]'>
                                            <h3 className="text-sm font-semibold">{item.product.title}</h3>
                                            <p className="text-sm">{item.quantity} x {item.product.price}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-500">❌</button>
                                </div>
                            ))}

                            {/* Total a pagar */}
                            <div className="mt-4 border-t pt-4">
                                <h3 className="text-lg font-bold">Total: ${totalPrice.toLocaleString()}</h3>
                            </div>

                            {/* Botones de acción */}
                            <button onClick={clearCart} className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg">
                                Vaciar carrito
                            </button>
                            <button className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg">
                                Comprar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;