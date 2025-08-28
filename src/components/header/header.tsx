// ==============================
// 📦 BLOQUE 1: IMPORTACIONES Y SETUP INICIAL
// ==============================

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import useActiveSection from './useActiveSection';
import { useCart } from '../../context/useCart';
import { Link, useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import useScroll from './useScroll';
import { productData } from "../../data/products";
import { AnimatePresence, motion } from "framer-motion";

// 🔧 Función utilitaria para mejorar las búsquedas (ignora tildes y mayúsculas)
const normalizarTexto = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .toLowerCase()
    .trim();

// ==============================
// 🎯 INICIO DEL COMPONENTE
// ==============================

const Header: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const { isScrolled, isScrollingUp } = useScroll(50);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);

  // ✅ Agregamos 'atletas-lm' al header
  const sectionIds = ['inicio', 'productos', 'atletas-lm', 'sobre-nosotros', 'contacto'];

  const [activeSection, setActiveSectionManually] = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia' | 'debito' | 'credito'>('transferencia');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [locality, setLocality] = useState('');
  const [otherCity, setOtherCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [betweenStreets, setBetweenStreets] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [forceShowHeader, setForceShowHeader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToTop = useScrollToTop();
  const navigate = useNavigate();

  // ✅ useMemo para evitar cálculos en cada render
  const envio = useMemo(() => {
    if (location === "Otro") return 8000;
    if (["Mar de Ajó", "San Bernardo", "Costa Azul", "La Lucila"].includes(locality)) return 1000;
    if (["Nueva Atlantis"].includes(locality)) return 1500;
    if (location === "Partido de La Costa" && locality !== "") return 3500;
    return 0;
  }, [location, locality]);

  const sectionLabels: Record<string, string> = {
    'inicio': 'Inicio',
    'productos': 'Productos',
    'atletas-lm': 'Atletas LMFITNESS',
    'sobre-nosotros': 'Sobre nosotros',
    'contacto': 'Contacto',
  };

  // Cerrar buscador al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  // Evitar scroll en body cuando se abre el checkout
  useEffect(() => {
    document.body.style.overflow = showCheckout ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCheckout]);

  // ✅ cálculo del total optimizado
  const total = useMemo(() =>
    cart.reduce((acc, item) => {
      const rawPrice = item.product.offerPrice || item.product.price;
      const price = parseFloat(String(rawPrice).replace(/[^0-9.-]+/g, ""));
      return acc + item.quantity * price;
    }, 0),
    [cart]
  );

  const handleClick = (id: string) => {
    setActiveSectionManually(id);

    if (id === "productos") {
      navigate("/catalogo");
      scrollToTop();
    } else if (id === "atletas-lm") {
      navigate("/atletas-lm");
      scrollToTop();
    } else if (window.location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    setMenuOpen(false);
    setShowProductsMobile(false);
  };



  const totalToPay = useMemo(() => {
    const factor =
      paymentMethod === "credito" ? 1.1 : paymentMethod === "efectivo" ? 1 : 1;
    return (total + envio) * factor;
  }, [total, envio, paymentMethod]);

  const handleConfirmPurchase = () => {
    if (
      !fullName.trim() ||
      !location ||
      (location === "Partido de La Costa" && !locality) ||
      (location === "Otro" && (!otherCity.trim() || !postalCode.trim())) ||
      !street.trim()
    ) {
      window.alert("Por favor, completá todos los campos obligatorios.");
      return;
    }

    const productList = cart
      .map((item) => {
        const titleWithSabor = item.sabor
          ? `${item.product.title} - ${item.sabor}`
          : item.product.title;
        const unitPrice = Number(item.product.offerPrice || item.product.price);
        const subtotal = unitPrice * item.quantity;
        return `* ${titleWithSabor} (${item.quantity}x) - $${subtotal.toLocaleString("es-AR")}`;
      })
      .join("\n");

    const message = [
      "Hola LMFITNESS. Quisiera realizar la compra",
      "",
      `*Nombre completo:* ${fullName}`,
      `*Localidad:* ${location === "Partido de La Costa" ? locality : otherCity}`,
      `*Código Postal:* ${location === "Otro" ? postalCode : "N/A"}`,
      `*Calle:* ${street}`,
      `*Entre calles:* ${betweenStreets || "N/A"}`,
      "",
      "*Productos elegidos:*",
      productList,
      "",
      `*Método de pago:* ${paymentMethod}`,
      `*Envío:* $${envio}`,
      `*Total a pagar:* $${totalToPay.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`
    ].join("\n");

    const whatsappURL = `https://wa.me/+5492257531656?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  // ✅ Un solo listener para cerrar buscadores al click fuera
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  // ✅ Cerrar menús si se hace scroll hacia abajo
  useEffect(() => {
    if (!isScrollingUp) {
      if (menuOpen) {
        setMenuOpen(false);
        setShowProductsMobile(false);
      }
      if (showSearch) setShowSearch(false);
      if (showMobileSearch) setShowMobileSearch(false);
    }
  }, [isScrollingUp, menuOpen, showSearch, showMobileSearch]);

  // ✅ Mostrar header tras agregar producto (sin CLS brusco)
  useEffect(() => {
    const handleProductoAgregado = () => {
      requestAnimationFrame(() => {
        setForceShowHeader(true);
        setTimeout(() => setForceShowHeader(false), 2000);
      });
    };

    window.addEventListener("producto-agregado", handleProductoAgregado);
    return () => {
      window.removeEventListener("producto-agregado", handleProductoAgregado);
    };
  }, []);

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

      <header
        className={`w-screen h-auto py-3 fixed z-50 transition-all duration-300
          ${(isScrolled || isHoveringProducts) ? "bg-black" : "bg-gradient-to-b from-black to-transparent"}
          ${isScrollingUp || forceShowHeader ? "translate-y-0" : "-translate-y-full"}
        `}
        role="banner"
      >
        <div className="flex justify-between items-center text-white p-4">
          {/* Hamburguesa */}
          <button
            className="w-[70px] ml-2 text-white focus:outline-none z-70 xl:hidden cursor-pointer"
            onClick={() => {
              if (menuOpen) {
                setMenuOpen(false);
                setShowProductsMobile(false);
              } else {
                setMenuOpen(true);
              }
            }}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
          >
            <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <div className={`w-8 h-1 bg-white my-1.5 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-8 h-1 bg-white my-1.5 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>

          {/* Logo (CLS fix) */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center justify-center z-50 mx-5 w-[70px] xl:ml-15"
          >
            <img
              src="assets/logo.webp"
              alt="Logo de LM Fitness"
              width={70}
              height={52}
              className="h-[52px] w-auto object-contain img-shadow"
              loading="eager"
              decoding="async"
              {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
            />
          </Link>

          {/* Carrito + Buscador móvil */}
          <div className="right-24 text-white z-50 mr-4 flex w-[70px] justify-between items-center xl:hidden">
            {/* Lupa Mobile */}
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="relative cursor-pointer"
              aria-label="Abrir buscador en móvil"
            >
              <Search size={26} />
            </button>

            {/* Carrito Mobile */}
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="relative cursor-pointer ml-4"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart size={26} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Menú Desktop */}
          <div className="hidden xl:flex items-center">
            {/* Buscador Desktop */}
            <div
              ref={searchRef}
              className="relative hidden xl:flex items-center w-80 bg-gray-600 rounded-full px-1 py-1 mr-10"
              role="search"
            >
              <div className="flex items-center justify-center w-6 h-6 mx-2">
                <Search size={22} className="text-white" />
              </div>

              <input
                type="text"
                placeholder="Buscar tu producto"
                className="bg-white text-black rounded-full w-full h-8 px-3 outline-none border-none"
                aria-label="Buscar productos"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
              />
              
              {showSearch && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto z-40 text-black">
                  {/* Resultados del buscador Desktop, agrupados por categoría */}
                  {productData.some(category =>
                    category.products.some(product => {
                      const query = normalizarTexto(searchQuery);
                      const textoProducto = normalizarTexto(product.title);
                      const textoCategoria = normalizarTexto(category.name);
                      const palabras = query.split(" ");
                      return palabras.every(palabra =>
                        textoProducto.includes(palabra) || textoCategoria.includes(palabra)
                      );
                    })
                  ) ? (
                    productData.map((category) => {
                      const matchingProducts = category.products.filter(product => {
                        const query = normalizarTexto(searchQuery);
                        const textoProducto = normalizarTexto(product.title);
                        const textoCategoria = normalizarTexto(category.name);
                        const palabras = query.split(" ");
                        return palabras.every(palabra =>
                          textoProducto.includes(palabra) || textoCategoria.includes(palabra)
                        );
                      });

                      if (matchingProducts.length === 0) return null;

                      return (
                        <div key={category.slug} className="px-4 py-2">
                          <h3 className="text-sm font-bold text-gray-800 uppercase mb-2 border-b border-gray-300 pb-1">
                            {category.name}
                          </h3>

                          {matchingProducts.map((product) => (
                            <Link
                              key={product.id}
                              to={`/producto/${product.id}`}
                              onClick={() => {
                                setShowSearch(false);
                                setShowMobileSearch(false);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{product.title}</span>
                                <span className="text-xs text-gray-600">{product.price}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No se encontraron productos.</div>
                  )}
                </div>
              )}

            </div>

            {/* Lupa y carrito Mobile (ocultos en desktop, pero el bloque quedó) */}
            <div className="flex items-center xl:hidden">
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
              <div className="xl:hidden w-full px-4 mt-2">
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

                {/* HASTA ACÁ */}

                {searchQuery && (
                  <div className="absolute mt-2 w-80 bg-white rounded-md shadow-lg text-black max-h-80 overflow-y-auto z-50">
                    {productData
                      .map((category) => {
                        const matchingProducts = category.products.filter((product) => {
                          const query = normalizarTexto(searchQuery);
                          const textoProducto = normalizarTexto(product.title);
                          const textoCategoria = normalizarTexto(category.name);
                          const palabras = query.split(" ");
                          return palabras.every(palabra =>
                            textoProducto.includes(palabra) || textoCategoria.includes(palabra)
                          );
                        });

                        if (matchingProducts.length === 0) return null;

                        return (
                          <div key={category.slug} className="px-4 py-2">
                            <h3 className="text-sm font-bold text-gray-800 uppercase mb-2 border-b border-gray-300 pb-1">
                              {category.name}
                            </h3>
                            {matchingProducts.map((product) => (
                              <Link
                                key={product.id}
                                to={`/producto/${product.id}`}
                                onClick={() => {
                                  setSearchQuery('');
                                  setShowSearch(false);
                                  setShowMobileSearch(false);
                                }}
                                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md"
                              >
                                <img
                                  src={product.images[0]}
                                  alt={product.title}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium text-sm">{product.title}</span>
                                  <span className="text-xs text-gray-600">{product.price}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        );
                      })
                      .filter(Boolean)}
                  </div>
                )}

              </div>
            )}

            <ul className="flex justify-between items-center w-170 mr-10 font-medium text-xl xl:mr-8">
              {sectionIds.map((id) => (
                <li key={id} className="relative">
                  {id === "productos" ? (
                    // ✅ Solo "Productos" controla el hover del dropdown
                    <div
                      className="relative"
                      onMouseEnter={() => setIsHoveringProducts(true)}
                      onMouseLeave={() => setIsHoveringProducts(false)}
                      // accesibilidad por teclado (opcional)
                      onFocus={() => setIsHoveringProducts(true)}
                      onBlur={() => setIsHoveringProducts(false)}
                    >
                      <button
                        className="font-medium flex items-center gap-1 hover:text-red-500 transition-all duration-100 cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={isHoveringProducts}
                      >
                        {/* Texto 'Productos' */}
                        <span
                          className={`${
                            activeSection === "productos"
                              ? "underline underline-offset-5 decoration-2 scale-105 text-red-500"
                              : ""
                          }`}
                        >
                          Productos
                        </span>

                        {/* Flechita separada */}
                        <span
                          className={`transition-transform duration-300 group-hover:rotate-180 text-2xl mt-1 ${
                            activeSection === "productos" ? "text-red-500" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {/* Dropdown Desktop */}
                      <div
                        className={`fixed left-0 top-[108px] w-screen bg-black text-white transition-all duration-300 z-40 py-10
                          ${isHoveringProducts ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}
                        `}
                        // mantener abierto al mover el mouse dentro del dropdown
                        onMouseEnter={() => setIsHoveringProducts(true)}
                        onMouseLeave={() => setIsHoveringProducts(false)}
                      >
                        <div className="max-w-7xl px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
                          {productData
                            .filter((category) => category.slug !== "sin-stock")
                            .map((category) => (
                              <Link
                                key={category.slug}
                                to={`/catalogo#${category.slug}`}
                                onClick={scrollToTop}
                                className="flex items-center gap-2 hover:text-red-500 text-lg"
                              >
                                <span className="text-red-500">•</span>
                                <span>{category.name}</span>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 🔹 El resto de los ítems NO modifican isHoveringProducts
                    <button
                      onClick={() => handleClick(id)}
                      className={`font-medium hover:text-red-500 transition-all duration-100 ${
                        activeSection === id
                          ? "text-red-500 underline underline-offset-5 decoration-2 scale-105"
                          : ""
                      } focus:outline-none cursor-pointer`}
                    >
                      {sectionLabels[id] || id}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            
            <button onClick={() => setCartOpen(!cartOpen)} className="mr-10 relative text-white cursor-pointer">
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
        <div className={`xl:hidden fixed z-60 top-0 left-0 h-screen w-[80%] bg-black text-white flex flex-col items-start pt-20 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div ref={scrollRef} className="flex flex-col items-start w-full overflow-y-auto max-h-[calc(100vh-100px)] mt-10 pb-10">
            {sectionIds.map((id) => (
              <div key={id} className="flex flex-col items-start w-full">
                {id === 'productos' ? (
                  <>
                    <button
                      onClick={() => setShowProductsMobile(prev => !prev)}
                      className={`text-2xl cursor-pointer mb-4 pl-7 ${activeSection === id ? 'text-red-500 underline' : ''}`}
                    >
                      Productos {showProductsMobile ? '▲' : '▼'}
                    </button>

                    <div
                      className={`w-full bg-gray-800 overflow-hidden transition-all duration-500 ease-in-out ${showProductsMobile ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}
                      style={{ transitionProperty: 'max-height, opacity' }}
                    >
                      {/* Este div interno solo tiene padding */}
                      <div className="flex flex-col px-4 py-3">
                        {productData
                          .filter((category) => category.slug !== "sin-stock")
                          .map((category) => (
                            <Link
                              key={category.slug}
                              to={`/catalogo#${category.slug}`}
                              onClick={() => {
                                setMenuOpen(false);
                                setShowProductsMobile(false); // <<< cerramos también el dropdown al hacer click
                              }}
                              className="text-lg flex items-center gap-2 py-2 hover:text-red-500"
                            >
                              <span>•</span>
                              <span>{category.name}</span>
                            </Link>
                          ))}
                      </div>

                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleClick(id)}
                    className={`text-2xl cursor-pointer mb-4 pl-7 ${activeSection === id ? 'text-red-500 underline' : ''}`}
                  >
                    {sectionLabels[id] || id}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div
            className="fixed inset-0 h-screen bg-black/70 z-50 xl:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Carrito */}
        <AnimatePresence>
          {cartOpen && (
            <>
              {/* Fondo oscuro animado */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 h-screen bg-black z-150"
                onClick={() => setCartOpen(false)}
              />

              {/* Carrito deslizante animado */}
              <motion.div
                key="cart"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 w-85 max-w-screen h-screen bg-white shadow-lg p-4 px-7 text-black z-160 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setCartOpen(false)}
                  className="absolute top-4 right-8 text-black text-2xl font-bold cursor-pointer"
                >
                  ✖
                </button>

                <h2 className="text-xl font-bold mb-4">Carrito</h2>

                {cart.length === 0 ? (
                  <p className="text-gray-500">El carrito está vacío.</p>
                ) : (
                  <div>
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.sabor || 'default'}`}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div className="w-[300px]">
                          <h3 className="text-sm font-semibold">
                            {item.product.title}
                            {item.sabor ? ` - ${item.sabor}` : ""}
                          </h3>
                          <p className="text-sm">
                            {item.quantity} x ${item.product.offerPrice || item.product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(String(item.product.id), item.sabor)} // 👈 sin Number(...)
                          className="text-red-500 cursor-pointer"
                        >
                          ❌
                        </button>
                      </div>
                    ))}

                    <div className="flex justify-between items-center font-bold mt-4">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={clearCart}
                      className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg cursor-pointer"
                    >
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
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout */}
        {showCheckout && (
          <div
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center w-screen h-screen"
            onClick={() => setShowCheckout(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90vw] max-w-md h-[80%] max-h-183 overflow-y-auto rounded-xl shadow-xl p-6 relative"
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-3 right-4 text-2xl text-black font-bold cursor-pointer"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">Finalizar Compra</h2>

              <form className="space-y-3">
                {/* Nombre completo */}
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  className="w-full border p-2 px-4 rounded-full"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                {/* Zona */}
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocality('');
                    setOtherCity('');
                    setPostalCode('');
                  }}
                  className="w-full border p-2 px-4 rounded-full mb-3"
                >
                  <option value="">Seleccioná tu zona</option>
                  <option value="Partido de La Costa">Partido de La Costa</option>
                  <option value="Otro">Otro</option>
                </select>

                {/* Localidad o ciudad */}
                {location === "Partido de La Costa" && (
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full border p-2 px-4 rounded-full mb-3"
                  >
                    <option value="">Seleccioná tu localidad</option>
                    <option value="Nueva Atlantis">Nueva Atlantis</option>
                    <option value="Mar de Ajó">Mar de Ajó</option>
                    <option value="San Bernardo">San Bernardo</option>
                    <option value="Costa Azul">Costa Azul</option>
                    <option value="La Lucila">La Lucila</option>
                    <option value="Aguas Verdes">Aguas Verdes</option>
                    <option value="Costa del Este">Costa del Este</option>
                    <option value="Mar del Tuyú">Mar del Tuyú</option>
                    <option value="Santa Teresita">Santa Teresita</option>
                    <option value="Las Toninas">Las Toninas</option>
                    <option value="San Clemente">San Clemente</option>
                  </select>
                )}

                {location === "Otro" && (
                  <>
                    <input
                      type="text"
                      placeholder="Ciudad"
                      className="w-full border p-2 px-4 rounded-full mb-3"
                      value={otherCity}
                      onChange={(e) => setOtherCity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Código Postal"
                      className="w-full border p-2 px-4 rounded-full mb-3"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </>
                )}

                {/* Dirección */}
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
                      className={`text-center w-full px-4 py-2 rounded-full cursor-pointer transition-colors 
                      ${paymentMethod === 'efectivo' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                      onClick={() => setPaymentMethod('efectivo')}
                    >
                      Efectivo (sin recargo)
                    </label>

                    <label
                      className={`w-full text-center px-4 py-2 rounded-full cursor-pointer transition-colors 
                      ${paymentMethod === 'transferencia' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                      onClick={() => setPaymentMethod('transferencia')}
                    >
                      Transferencia (sin recargo)
                    </label>

                    <label
                      className={`w-full text-center px-4 py-2 rounded-full cursor-pointer transition-colors 
                      ${paymentMethod === 'debito' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                      onClick={() => setPaymentMethod('debito')}
                    >
                      Tarjeta de Débito (sin recargo)
                    </label>

                    <label
                      className={`w-full text-center px-4 py-2 rounded-full cursor-pointer transition-colors 
                      ${paymentMethod === 'credito' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-black'}`}
                      onClick={() => setPaymentMethod('credito')}
                    >
                      Crédito en 1 pago (+10%)
                    </label>
                    <p className='text-black/70 text-center text-[16px]'>5% de descuento en efectivo retirando por el local</p>
                  </div>
                </div>

                {/* Totales */}
                <div className="mt-4 font-bold">
                  <p>Envío: <span className="text-blue-500">${envio}</span></p>
                  <p>Total Productos: <span className="text-blue-500">${total.toFixed(2)}</span></p>
                  <p>Total a Pagar: <span className="text-green-700">${totalToPay.toFixed(2)}</span></p>
                </div>

                {/* Confirmar */}
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
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
          className="fixed top-23 left-1/2 transform -translate-x-1/2 w-11/12 bg-white rounded-lg shadow-lg p-4 z-100 xl:hidden">
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
            {productData.some(category =>
              category.products.some(product => {
                const query = normalizarTexto(searchQuery);
                const textoProducto = normalizarTexto(product.title);
                const textoCategoria = normalizarTexto(category.name);
                const palabras = query.split(" ");
                return palabras.every(palabra =>
                  textoProducto.includes(palabra) || textoCategoria.includes(palabra)
                );
              })
            ) ? (
              productData.map((category) => {
                const matchingProducts = category.products.filter(product => {
                  const query = normalizarTexto(searchQuery);
                  const textoProducto = normalizarTexto(product.title);
                  const textoCategoria = normalizarTexto(category.name);
                  const palabras = query.split(" ");
                  return palabras.every(palabra =>
                    textoProducto.includes(palabra) || textoCategoria.includes(palabra)
                  );
                });

                if (matchingProducts.length === 0) return null;

                return (
                  <div key={category.slug} className="px-4 py-2">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2 border-b border-gray-300 pb-1">
                      {category.name}
                    </h3>
                    {matchingProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/producto/${product.id}`}
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
                    ))}
                  </div>
                );
              })
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
