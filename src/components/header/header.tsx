import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import useActiveSection from './useActiveSection';
import { useCart } from '../../context/useCart';
import { Link, useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import useScroll from './useScroll';
import { productData } from "../../data/products";

const Header: React.FC = () => {
    const { isScrolled, isScrollingUp } = useScroll(50);
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
    const [productosDropdownOpen, setProductosDropdownOpen] = useState(false);

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
        if (!isScrollingUp && menuOpen) {
          setMenuOpen(false);
        }
    }, [isScrollingUp, menuOpen]);

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
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <header
                className={`w-screen h-auto py-3 fixed z-50 transition-all duration-300
                    ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}
                    ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className="flex justify-between items-center text-white p-4">
                    {/* Hamburguesa */}
                    <button
                        className="w-[70px] ml-2 text-white focus:outline-none z-50 lg:hidden cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </button>

                    {/* Logo */}
                    <Link to="//" onClick={scrollToTop} className="flex items-center justify-center z-50 mx-5 w-[70px] xl:ml-15">
                        <img src="assets/logo.jpeg" alt="Logo" className="h-13 img-shadow" />
                    </Link>

                    {/* Carrito móvil */}
                    <div className="right-24 text-white z-50 mr-2 flex w-[70px] justify-between lg:hidden">
                        <button onClick={() => setCartOpen(!cartOpen)} className="relative cursor-pointer">
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
                    <ul className="flex justify-between items-center w-150 mr-10 font-medium text-xl xl:mr-20 relative z-50">
  {sectionIds.map((id) => (
    <li key={id} className="relative group">
      {id === 'productos' ? (
        <>
          <button
            className={`font-medium hover:text-red-500 transition-all duration-100 ${
              activeSection === id ? 'text-red-500 underline underline-offset-5 decoration-2 scale-105' : ''
            }`}
          >
            Productos
          </button>
          <div className="absolute left-0 top-full mt-2 w-60 bg-white text-black rounded-lg shadow-lg hidden group-hover:flex flex-col z-50">
            {productData.map((category) => (
              <Link
                key={category.slug}
                to={`/catalogo#${category.slug}`}
                onClick={scrollToTop}
                className="px-4 py-2 hover:bg-gray-200"
              >
                {category.name}
              </Link>
            ))}
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
                    </div>
                </div>

                {/* Menú móvil */}
                <div className={`lg:hidden fixed z-20 top-0 left-0 w-full min-h-screen bg-black text-white flex flex-col items-center pt-32 pb-10 overflow-y-auto transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    {sectionIds.map((id) => (
                        <div key={id} className="flex flex-col items-center w-full">
                        {id === 'productos' ? (
                            <>
                            <button
                                onClick={() => setProductosDropdownOpen(prev => !prev)}
                                className={`text-2xl cursor-pointer ${activeSection === id ? 'text-red-500 underline' : ''}`}
                            >
                                Productos {productosDropdownOpen ? "▲" : "▼"}
                            </button>

                            {productosDropdownOpen && (
                                <div className="flex flex-col items-start w-full mt-2 px-6 space-y-2 max-h-[50vh] overflow-y-auto animate-fade-in">
                                {productData.map((category) => (
                                    <Link
                                    key={category.slug}
                                    to={`/catalogo#${category.slug}`}
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setProductosDropdownOpen(false);
                                    }}
                                    className="text-base hover:text-red-500 flex items-center gap-2"
                                    >
                                    <span className="text-red-500 text-lg">•</span>
                                    {category.name}
                                    </Link>
                                ))}
                                </div>
                            )}
                            </>
                        ) : (
                            <button
                            onClick={() => handleClick(id)}
                            className={`text-2xl cursor-pointer mt-4 ${activeSection === id ? 'text-red-500 underline' : ''}`}
                            >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        )}
                        </div>
                    ))}
                </div>

                {/* Aquí sigue tu carrito y tu checkout, igual que lo tenías */}
                {/* ... */}
            </header>
        </>
    );
};

export default Header;