import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../pages/home/main";
import HowBuy from "../pages/home/HowBuy";
import Products from "../pages/home/products-home/products";
import AboutUs from "../pages/home/AboutUs";
import ParallaxSlider from "../components/Slider";
import FeaturedSlider from "../components/FeaturedSlider";
import { productData } from "../data/products";
import { FaTag, FaBolt, FaGift } from "react-icons/fa";

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

const HomeWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const yOffset = -100; // ajustá según el alto de tu header fijo
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300); // espera para que se renderice todo
      }
    }
  }, [location]);

  return (
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
  );
};

export default HomeWrapper;