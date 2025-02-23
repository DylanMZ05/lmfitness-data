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
    const [showCheckout, setShowCheckout] = useState(false); // Estado del popup de compra
    const { cart, removeFromCart, clearCart } = useCart();

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        localidad: '',
        direccion: '',
        entreCalles: '',
        metodoPago: 'transferencia', // Valor por defecto
    });

    const envio = 1500; // Costo del envío

    // Cálculo del total del carrito
    const totalPedido = cart.reduce((total, item) => 
        total + parseInt(item.product.price.replace(/[^0-9]/g, ""), 10) * item.quantity
    , 0);

    // Aplicar 5% de descuento si elige efectivo
    const descuento = formData.metodoPago === 'efectivo' ? totalPedido * 0.05 : 0;
    const totalFinal = totalPedido - descuento + envio;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <img src="/assets/logo.jpeg" alt="Logo" className="h-13 img-shadow" />
                </div>

                {/* Carrito */}
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
            </div>

            {/* Modal del carrito */}
{cartOpen && (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 text-black z-50">
        <button 
            className="absolute top-4 right-6 text-gray-600 hover:text-gray-900 z-50" 
            onClick={() => setCartOpen(false)}
        >
            <X size={26} />
        </button>

        <h2 className="text-xl font-bold text-center">Carrito</h2>

        {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">El carrito está vacío.</p>
        ) : (
            <div className="mt-6">
                {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center border-b py-2">
                        <img src={item.product.image} alt={item.product.title} className="h-12 w-12 object-cover" />
                        <div>
                            <h3 className="text-sm font-semibold">{item.product.title}</h3>
                            <p className="text-sm">{item.quantity} x {item.product.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500">❌</button>
                    </div>
                ))}

                {/* Total */}
                <div className="border-t mt-4 pt-4 text-lg font-bold flex justify-between">
                    <span>Total:</span>
                    <span>${totalPedido.toLocaleString("es-ES")},00</span>
                </div>

                {/* Botón "Comprar" actualizado */}
                <button 
                    onClick={() => {
                        setCartOpen(false); // Cierra el carrito
                        setShowCheckout(true); // Abre el popup de compra
                    }} 
                    className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg"
                >
                    Comprar
                </button>
            </div>
        )}
    </div>
)}

        {/* Popup de compra */}
        {showCheckout && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    {/* Botón "X" para cerrar */}
                    <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={() => setShowCheckout(false)}>
                        <X size={24} />
                    </button>
        
                    <h2 className="text-xl font-bold mb-4 text-center">Finalizar Compra</h2>
        
                    {/* Campos del formulario */}
                    <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} className="w-full border p-2 px-4 mb-2 rounded-full" />
                    <input type="text" name="localidad" placeholder="Localidad" value={formData.localidad} onChange={handleChange} className="w-full border p-2 px-4 mb-2 rounded-full" />
                    <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="w-full border p-2 px-4 mb-2 rounded-full" />
                    <input type="text" name="entreCalles" placeholder="Entre calles" value={formData.entreCalles} onChange={handleChange} className="w-full border p-2 px-4 mb-2 rounded-full" />
        
                    {/* Método de pago */}
                    <label className="block text-sm font-semibold mb-1">Método de Pago:</label>
                    <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} className="w-full border p-2 px-3 mb-2 rounded-full">
                        <option value="transferencia">Transferencia</option>
                        <option value="efectivo">Efectivo (5% de descuento)</option>
                    </select>
        
                    {/* Total a pagar */}
                    <p className="text-lg font-bold mt-4 text-center">
                        Total a pagar: <span className="text-green-600">${totalFinal.toLocaleString("es-ES")},00</span>
                    </p>
        
                    {/* Botones de acción */}
                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Enviar Pedido
                    </button>
        
                    {/* Botón "Cerrar" para salir del popup */}
                    <button 
                        className="w-full mt-2 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
                        onClick={() => setShowCheckout(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        )}

        </header>
    );
};

export default Header;
