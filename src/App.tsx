import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./pages/home/main";
import HowBuy from "./pages/home/HowBuy";
import Products from "./pages/home/products-home/products";
import AboutUs from "./pages/home/AboutUs";
import Footer from "./components/footer";
import Catalogo from "./pages/products/Catalogo";
import ProductoDetalle from "./pages/products/ProductoDetalle";
import { productData } from "./data/products";
import FeaturedSlider from "./components/FeaturedSlider";
import { CartProvider } from "./context/CartContext";
import ParallaxSlider from "./components/Slider";
import { FaTag, FaBolt, FaGift } from "react-icons/fa";

// 🛒 Slider de Ofertas
const offerSlides = [
  {
    imageUrl: "/assets/images/oferta1.jpg",
    text: "🔥 30% OFF en productos seleccionados",
    icon: <FaTag size={40} color="white" />,
  },
  {
    imageUrl: "/assets/images/oferta2.jpg",
    text: "⚡ Envío gratis por 48hs",
    icon: <FaBolt size={40} color="white" />,
  },
  {
    imageUrl: "/assets/images/oferta3.jpg",
    text: "🎁 Llevá 3 y pagá 2 en toda la tienda",
    icon: <FaGift size={40} color="white" />,
  },
];

function App() {
  return (
    <CartProvider>
      <Router basename="/lmfitness">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
                <HowBuy />
                <section className="my-10 px-4">
                  <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Ofertas Especiales
                  </h2>
                  <ParallaxSlider slides={offerSlides} width="w-full" />
                </section>
                <hr className="text-black/20"/>
                <FeaturedSlider
                  title="PRODUCTOS DESTACADOS"
                  categories={productData}
                  bgColor="bg-white"
                />
                <hr className="text-black/20"/>
                <Products />
                <AboutUs />

              </>
            }
          />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;