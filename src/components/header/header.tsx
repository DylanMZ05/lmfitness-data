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
            `}</style>
            <header
                className={`w-screen h-auto py-3 fixed z-50 transition-all duration-300
                    ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}
                    ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}
                `}
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
                    <ul className="flex justify-between items-center w-150 mr-10 font-medium text-xl xl:mr-20">
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

          {/* Dropdown Desktop */}
          <div className="absolute left-0 top-full mt-2 w-60 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
            <ul className="flex flex-col">
              {productData.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/catalogo#${category.slug}`}
                    onClick={scrollToTop}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
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

                        {/* <button>
                            <Search size={26} />
                        </button> */}
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
                <div className={`lg:hidden fixed z-20 top-0 left-0 w-full h-90 bg-black text-white flex flex-col items-center justify-end space-y-8 pb-10 transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-500`}>
  {sectionIds.map((id) => (
    <div key={id} className="flex flex-col items-center w-full">
      {id === 'productos' ? (
        <>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`text-2xl cursor-pointer ${activeSection === id ? 'text-red-500 underline' : ''}`}
          >
            Productos ▼
          </button>

          {/* Dropdown Mobile */}
          {menuOpen && (
            <div className="flex flex-col items-center w-full mt-2">
              {productData.map((category) => (
                <Link
                  key={category.slug}
                  to={`/catalogo#${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg py-1 hover:text-red-500"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => handleClick(id)}
          className={`text-2xl cursor-pointer ${activeSection === id ? 'text-red-500 underline' : ''}`}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      )}
    </div>
  ))}
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
        </>
    );
};

export default Header;