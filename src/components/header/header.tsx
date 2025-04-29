import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import useActiveSection from './useActiveSection';
import { useCart } from '../../context/useCart';
import { Link, useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import useScroll from './useScroll';
import { productData } from "../../data/products";

const Header: React.FC = () => {
    const searchRef = useRef<HTMLDivElement>(null);
    const { isScrolled, isScrollingUp } = useScroll(50);
    const [isHoveringProducts, setIsHoveringProducts] = useState(false);
    const sectionIds = ['inicio', 'productos', 'about', 'contacto'];
    const [activeSection, setActiveSectionManually] = useActiveSection(sectionIds);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cart, removeFromCart, clearCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia'>('transferencia');
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [street, setStreet] = useState('');
    const [betweenStreets, setBetweenStreets] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Flatten de todos los productos en un solo array
    const allProducts = productData.flatMap(category =>
        category.products.map(product => ({
        ...product,
        slug: category.slug, // Así sabemos a qué categoría pertenece
        }))
    );
    
    // Filtrado de productos por nombre
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const scrollToTop = useScrollToTop();
    const navigate = useNavigate();

    const total = cart.reduce((acc: number, item) => {
        const price = parseFloat(item.product.price.toString().replace(/[^0-9.-]+/g, ""));
        const quantity = Number(item.quantity);
        return acc + quantity * price * 1000;
    }, 0);

    const handleClick = (id: string) => {
        setActiveSectionManually(id);
        if (id === 'productos') {
            navigate('/catalogo');
        } else {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = `/#${id}`;
            }
        }
        setMenuOpen(false);
    };

    const discount = paymentMethod === 'efectivo' ? 0.05 : 0;
    const totalToPay = (total + 3000) * (1 - discount);

    const handleConfirmPurchase = () => {
        const productList = cart.map(item => `- ${item.product.title} (${item.quantity}x)`).join("\n");

        const message = `Hola! Me gustaría realizar una compra.%0A%0A`
            + `*Productos elegidos*: %0A${productList}%0A%0A`
            + `*Nombre completo*: ${fullName}%0A`
            + `*Localidad*: ${location}%0A`
            + `*Calle*: ${street}%0A`
            + `*Entre calles*: ${betweenStreets || 'N/A'}%0A%0A`
            + `*Método de pago*: ${paymentMethod}%0A`
            + `*Precio total*: $${totalToPay.toFixed(2)}`;

        const phoneNumber = "+5492257531656";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, "_blank");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSearch(false);
        }
        if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
            setShowMobileSearch(false);
        }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isScrollingUp) {
            if (menuOpen) {
            setMenuOpen(false);
            setShowProductsMobile(false);
            }
            if (showSearch) {
            setShowSearch(false);
            }
            if (showMobileSearch) {
            setShowMobileSearch(false);
            }
        }
    }, [isScrollingUp, menuOpen, showSearch, showMobileSearch]);

    const [showProductsMobile, setShowProductsMobile] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <style>{`
                .header-transition {
                    transition: all 0.5s ease-in-out;
                }
                .header-hidden {
                    transform: translateY(-100%);
                }
                .header-visible {
                    transform: translateY(0);
                }
            `}</style>
            <header className={`w-screen h-auto py-3 fixed z-50 transition-all duration-300
                ${(isScrolled || isHoveringProducts) ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}
                ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}
            `}>
                <div className="flex justify-between items-center text-white p-4">
                    {/* Hamburguesa */}
                    <button
                        className="w-[70px] ml-2 text-white focus:outline-none z-50 lg:hidden cursor-pointer"
                        onClick={() => {
                            if (menuOpen) {
                              // Si el menú está abierto y lo estamos cerrando
                                setMenuOpen(false);
                                setShowProductsMobile(false); // <<< ahora sí, cerramos el desplegable al cerrar el menú
                                } else {
                                // Si el menú estaba cerrado, simplemente lo abrimos
                                setMenuOpen(true);
                                }
                            }}
                    >
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </button>

                    {/* Logo */}
                    <Link to="//" onClick={scrollToTop} className="flex items-center justify-center z-50 mx-5 w-[70px] xl:ml-15">
                        <img src="assets/logo.jpeg" alt="Logo" className="h-13 img-shadow" />
                    </Link>

                    {/* Carrito + Buscador móvil */}
                    <div className="right-24 text-white z-50 mr-2 flex w-[70px] justify-between items-center lg:hidden">
                    
                    {/* Lupa Mobile */}
                    <button onClick={() => setShowMobileSearch(prev => !prev)} className="relative cursor-pointer">
                        <Search size={26} />
                    </button>

                    {/* Carrito Mobile */}
                    <button onClick={() => setCartOpen(!cartOpen)} className="relative cursor-pointer ml-4">
                        <ShoppingCart size={26} />
                        {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                        )}
                    </button>
                    </div>

                    {/* Menú Desktop */}
                    <div className="hidden lg:flex items-center">
                    {/* Buscador Desktop */}
                    <div ref={searchRef} className="relative hidden lg:flex items-center w-80 bg-gray-600 rounded-full px-1 py-1 mr-10">
                    <div className="flex items-center justify-center w-6 h-6 mx-2">
                        <Search size={22} className="text-white" />
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar tu producto"
                        className="bg-white text-black rounded-full w-full h-8 px-3 outline-none border-none"
                        value={searchQuery}
                        onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearch(true);
                        }}
                        onFocus={() => setShowSearch(true)}
                    />

                    {showSearch && (
                        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto z-40 text-black">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                            <Link
                                to={`/producto/${product.id}`}
                                key={index}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 border-b border-gray-100"
                                onClick={() => setShowSearch(false)}
                            >
                                <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className="flex flex-col">
                                <span className="font-medium">{product.title}</span>
                                <span className="text-sm text-gray-600">{product.price}</span>
                                </div>
                            </Link>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No se encontraron productos.</div>
                        )}
                        </div>
                    )}
                    </div>

                        {/* Lupa y carrito Mobile */}
<div className="flex items-center lg:hidden">
  <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="relative cursor-pointer">
    <Search size={26} />
  </button>

  <button onClick={() => setCartOpen(!cartOpen)} className="relative cursor-pointer ml-4">
    <ShoppingCart size={26} />
    {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    )}
  </button>
</div>

                        {/* Buscador Mobile desplegado */}
                        {showSearch && (
                        <div className="lg:hidden w-full px-4 mt-2">
                            <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
                            <Search size={18} className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Busca tu producto..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="flex-1 bg-transparent outline-none text-black"
                            />
                            </div>
                            {searchQuery && (
                            <div className="absolute mt-2 w-80 bg-white rounded-md shadow-lg text-black max-h-80 overflow-y-auto z-50">
                                {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Link
                                    key={product.id}
                                    to={`/producto${product.id}`}
                                    onClick={() => {
                                        setSearchQuery('');
                                    }}
                                    className="flex items-center p-2 hover:bg-gray-100"
                                    >
                                    <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover rounded mr-3" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.title}</span>
                                        <span className="text-sm text-gray-600">{product.price}</span>
                                    </div>
                                    </Link>
                                ))
                                ) : (
                                <div className="p-2 text-gray-500">No se encontraron productos.</div>
                                )}
                            </div>
                            )}
                        </div>
                        )}

                        <ul className="flex justify-between items-center w-150 mr-10 font-medium text-xl xl:mr-20">
                            {sectionIds.map((id) => (
                                <li
                                key={id}
                                className="relative group"
                                onMouseEnter={() => setIsHoveringProducts(true)}
                                onMouseLeave={() => setIsHoveringProducts(false)}
                                >
                                {id === 'productos' ? (
                                    <>
                            <button
                            className="font-medium flex items-center gap-1 hover:text-red-500 transition-all duration-100 cursor-pointer"
                            >
                                {/* Texto 'Productos' */}
                                <span className={`${
                                    activeSection === 'productos' ? 'underline underline-offset-5 decoration-2 scale-105 text-red-500' : ''
                                }`}>
                                    Productos
                                </span>

                                {/* Flechita separada, cambia color si está activo, pero sin subrayado */}
                                <span className={`transition-transform duration-300 group-hover:rotate-180 text-2xl mt-1 ${
                                    activeSection === 'productos' ? 'text-red-500' : ''
                                }`}>
                                    ▼
                                </span>
                            </button>

                                {/* Dropdown Desktop */}
                                <div className={`fixed left-0 top-[108px] w-screen bg-black text-white transition-all duration-300 z-40 py-10
                                    ${isHoveringProducts ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                `}>
                                    <div className="max-w-7xl px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
                                    {productData.map((category) => (
                                        <Link
                                        key={category.slug}
                                        to={`/producto${category.slug}`}
                                        onClick={scrollToTop}
                                        className="flex items-center gap-2 hover:text-red-500 text-lg"
                                        >
                                        <span className="text-red-500">•</span>
                                        <span>{category.name}</span>
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                                </>
                                ) : (
                                    <button
                                    onClick={() => handleClick(id)}
                                    className={`font-medium hover:text-red-500 transition-all duration-100 ${
                                        activeSection === id ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''
                                    } focus:outline-none cursor-pointer`}
                                    >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                    </button>
                                )}
                                </li>
                            ))}
                        </ul>
                        
                        <button onClick={() => setCartOpen(!cartOpen)} className="ml-7 mr-3 relative text-white cursor-pointer">
                            <ShoppingCart size={24} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                        {(showSearch || searchQuery) && (
                            <div className="absolute mt-2 top-16 w-80 bg-white rounded-md shadow-lg text-black max-h-80 overflow-y-auto z-50">
                                {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Link
                                    key={product.id}
                                    to={`/producto${product.id}`}
                                    onClick={() => {
                                        setSearchQuery('');
                                        setShowSearch(false);
                                    }}
                                    className="flex items-center p-2 hover:bg-gray-100"
                                    >
                                    <img src={product.images[0]} alt={product.title} className="w-10 h-10 object-cover rounded mr-3" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.title}</span>
                                        <span className="text-sm text-gray-600">{product.price}</span>
                                    </div>
                                    </Link>
                                ))
                                ) : (
                                <div className="p-2 text-gray-500">No se encontraron productos.</div>
                                )}
                            </div>
                            )}
                        </div>
                    </div>

                {/* Menú móvil */}
                <div className={`lg:hidden fixed z-40 top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center pt-20 transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>

                <div ref={scrollRef} className="flex flex-col items-center w-full overflow-y-auto max-h-[calc(100vh-100px)] mt-10 pb-10">
                    {sectionIds.map((id) => (
                    <div key={id} className="flex flex-col items-center w-full">
                        {id === 'productos' ? (
                        <>
                            <button
                            onClick={() => setShowProductsMobile(prev => !prev)}
                            className={`text-2xl cursor-pointer mb-4 ${activeSection === id ? 'text-red-500 underline' : ''}`}
                            >
                            Productos {showProductsMobile ? '▲' : '▼'}
                            </button>

                            <div
                            className={`w-[45%] bg-neutral-800 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
                                showProductsMobile ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                            }`}
                            style={{ transitionProperty: 'max-height, opacity' }}
                            >
                            {/* Este div interno solo tiene padding */}
                            <div className="flex flex-col px-4 py-3">
                                {productData.map((category) => (
                                <Link
                                    key={category.slug}
                                    to={`/producto${category.slug}`}
                                    onClick={() => {
                                    setMenuOpen(false);
                                    setShowProductsMobile(false); // <<< cerramos también el dropdown al hacer click
                                    }}
                                    className="text-lg flex items-center gap-2 py-2 hover:text-red-500"
                                >
                                    <span className="text-red-500">•</span>
                                    <span>{category.name}</span>
                                </Link>
                                ))}
                            </div>
                            </div>
                        </>
                        ) : (
                        <button
                            onClick={() => handleClick(id)}
                            className={`text-2xl cursor-pointer mb-4 ${activeSection === id ? 'text-red-500 underline' : ''}`}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                        )}
                    </div>
                    ))}
                </div>

                </div>

                {/* Carrito */}
                {cartOpen && (
                    <div className="fixed top-0 right-0 w-80 h-screen bg-white shadow-lg p-4 text-black z-60 overflow-y-auto">
                        <button
                            onClick={() => setCartOpen(false)}
                            className="absolute top-4 right-4 text-black text-2xl font-bold cursor-pointer"
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold">Carrito</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500">El carrito está vacío.</p>
                        ) : (
                            <div>
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex justify-between items-center border-b py-2">
                                        <div className='w-[300px]'>
                                            <h3 className="text-sm font-semibold">{item.product.title}</h3>
                                            <p className="text-sm">
                                                {item.quantity} x ${item.product.price}
                                            </p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 cursor-pointer">
                                            ❌
                                        </button>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center font-bold mt-4">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button onClick={clearCart} className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg cursor-pointer">
                                    Vaciar carrito
                                </button>
                                <button 
                                    onClick={() => setShowCheckout(true)} 
                                    className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg cursor-pointer"
                                >
                                    Comprar
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Checkout */}
                {showCheckout && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center w-screen h-screen"
                    onClick={() => setShowCheckout(false)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto"
                    >
                    <button
                        onClick={() => setShowCheckout(false)}
                        className="absolute top-3 right-4 text-2xl text-black font-bold"
                    >
                        ✖
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-center">Finalizar Compra</h2>

                    <h2 className="text-xl font-bold mb-4 text-center">Finalizar Compra</h2>

                    <form className="space-y-3">
                        <input
                        type="text"
                        placeholder="Nombre Completo"
                        className="w-full border p-2 px-4 rounded-full"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        />
                        <input
                        type="text"
                        placeholder="Localidad"
                        className="w-full border p-2 px-4 rounded-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        />
                        <input
                        type="text"
                        placeholder="Calle"
                        className="w-full border p-2 px-4 rounded-full"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        />
                        <input
                        type="text"
                        placeholder="Entre calles"
                        className="w-full border p-2 px-4 rounded-full"
                        value={betweenStreets}
                        onChange={(e) => setBetweenStreets(e.target.value)}
                        />

                        <div className="mt-3">
                        <label className="block font-semibold">Método de Pago:</label>
                        <div className="flex flex-col items-center space-y-2">
                            <label
                            className={`flex items-center w-[250px] px-4 py-2 rounded-full cursor-pointer transition-colors 
                                ${paymentMethod === 'efectivo' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                            onClick={() => setPaymentMethod('efectivo')}
                            >
                            Efectivo (5% de descuento)
                            </label>

                            <label
                            className={`flex items-center w-[250px] px-4 py-2 rounded-full cursor-pointer transition-colors 
                                ${paymentMethod === 'transferencia' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                            onClick={() => setPaymentMethod('transferencia')}
                            >
                            Transferencia
                            </label>
                        </div>
                        </div>

                        <div className="mt-4 font-bold">
                        <p>Envío: <span className="text-blue-500">$3000</span></p>
                        <p>Total Productos: <span className="text-blue-500">${total.toFixed(2)}</span></p>
                        <p>Total a Pagar: <span className="text-green-700">${totalToPay.toFixed(2)}</span></p>
                        </div>

                        <button
                        type="button"
                        onClick={handleConfirmPurchase}
                        className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg"
                        >
                        Confirmar Compra
                        </button>
                    </form>
                    </div>
                </div>

                

                
                )}
            </header>
            {showMobileSearch && (
            <div 
            ref={mobileSearchRef}
            className="fixed top-23 left-1/2 transform -translate-x-1/2 w-11/12 bg-white rounded-lg shadow-lg p-4 z-100 lg:hidden">
                {/* Input Mobile */}
                <input
                type="text"
                placeholder="Buscar tu producto"
                className="w-full bg-gray-100 text-black rounded-full px-4 py-2 outline-none mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Listado productos Mobile */}
                <div className="max-h-64 overflow-y-auto text-black">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                    <Link
                        to={`/producto/${product.id}`}
                        key={index}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 border-b border-gray-100"
                        onClick={() => {
                        setShowMobileSearch(false);
                        setSearchQuery('');
                        }}
                    >
                        <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex flex-col">
                        <span className="font-medium">{product.title}</span>
                        <span className="text-sm text-gray-600">{product.price}</span>
                        </div>
                    </Link>
                    ))
                ) : (
                    <div className="px-4 py-2 text-gray-500">No se encontraron productos.</div>
                )}
                </div>
            </div>
            )}
        </>
    );
};

export default Header;