import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
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
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia'>('transferencia');
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [street, setStreet] = useState('');
    const [betweenStreets, setBetweenStreets] = useState('');
    

    // Calcular el total multiplicando la cantidad por el precio de cada producto
    const total = cart.reduce((acc: number, item) => {
        const price = parseFloat(item.product.price.toString().replace(/[^0-9.-]+/g, ""));
        const quantity = Number(item.quantity);
        return acc + quantity * price;
    }, 0);

    const handleClick = (id: string) => {
        setActiveSectionManually(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    const discount = paymentMethod === 'efectivo' ? 0.05 : 0;  
    const totalToPay = (total + 3000) * (1 - discount);

    const handleConfirmPurchase = () => {
        // Obtener los nombres de los productos
        const productList = cart.map(item => `- ${item.product.title} (${item.quantity}x)`).join("\n");
    
        // Construir el mensaje
        const message = `Hola! Me gustaría realizar una compra.%0A%0A`
            + `*Productos elegidos*: %0A${productList}%0A%0A`
            + `*Nombre completo*: ${fullName}%0A`
            + `*Localidad*: ${location}%0A`
            + `*Calle*: ${street}%0A`
            + `*Entre calles*: ${betweenStreets || 'N/A'}%0A%0A`
            + `*Método de pago*: ${paymentMethod}%0A`
            + `*Precio total*: $${totalToPay.toFixed(2)}`;
    
        // Número de WhatsApp (reemplaza con tu número en formato internacional sin "+")
        const phoneNumber = "+5492257531656"; // 📌 Reemplázalo con el número real
    
        // Crear enlace de WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
        // Abrir WhatsApp
        window.open(whatsappURL, "_blank");
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
                    <button onClick={() => setCartOpen(!cartOpen)} className="relative cursor-pointer">
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
            <div
                className={`lg:hidden fixed z-20 top-0 left-0 w-full h-90 bg-black text-white flex flex-col items-center justify-end space-y-8 pb-10 transform ${
                    menuOpen ? 'translate-y-0' : '-translate-y-full'
                } transition-transform duration-500`}
            >
                {sectionIds.map((id) => (
                    <a
                        key={id}
                        href={`/lmfitness/#${id}`}
                        className={`text-2xl ${activeSection === id ? 'text-red-500 underline' : ''}`}
                        onClick={() => handleClick(id)}
                    >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                ))}
            </div>

            {/* Modal del carrito */}
            {cartOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 text-black z-60">
                    {/* Botón para cerrar el carrito */}
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
                                    <div className='w-12 flex items-center justify-center mr-2'>
                                        <img src={item.product.image} alt={item.product.title} className="h-12 object-cover" />
                                    </div>
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

                            {/* Mostrar el total del carrito */}
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

            {showCheckout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-70">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {/* Botón para cerrar el popup */}
                        <button 
                            onClick={() => setShowCheckout(false)} 
                            className="absolute top-2 right-2 text-black text-2xl font-bold"
                        >
                            ✖
                        </button>
            
                        <h2 className="text-xl font-bold mb-4">Finalizar Compra</h2>
            
                        {/* Formulario */}
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
                            {/* Método de pago */}
                            <div className="mt-3">
                                <label className="block font-semibold">Método de Pago:</label>
                                <div className="flex flex-col items-center space-y-2">
                                    <label 
                                        className={`flex items-center w-[250px] px-4 py-2 rounded-full cursor-pointer transition-colors 
                                                    ${paymentMethod === 'efectivo' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                                        onClick={() => setPaymentMethod('efectivo')}
                                    >
                                        <input 
                                            type="radio" 
                                            name="pago" 
                                            value="efectivo" 
                                            className="hidden" 
                                        />
                                        Efectivo (5% de descuento)
                                    </label>
                                        
                                    <label 
                                        className={`flex items-center w-[250px] px-4 py-2 rounded-full cursor-pointer transition-colors 
                                                    ${paymentMethod === 'transferencia' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                                        onClick={() => setPaymentMethod('transferencia')}
                                    >
                                        <input 
                                            type="radio" 
                                            name="pago" 
                                            value="transferencia" 
                                            className="hidden" 
                                        />
                                        Transferencia
                                    </label>
                                </div>
                            </div>
            
                            {/* Resumen de precios */}
                            <div className="mt-4 font-bold">
                                <p>Envío: <span className="text-blue-500">$3000</span></p>
                                <p>Total Productos: <span className="text-blue-500">${total.toFixed(2)}</span></p>
                                <p>Total a Pagar: <span className="text-green-700">${totalToPay.toFixed(2)}</span></p>
                            </div>
            
                            {/* Botón de compra */}
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
    );
};

export default Header;
