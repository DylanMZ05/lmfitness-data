import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../pages/home/main";
import HowBuy from "../pages/home/HowBuy";
import Products from "../pages/home/products-home/products";
import AboutUs from "../pages/home/AboutUs";
import ParallaxSlider from "../components/Slider";
import FeaturedSlider from "../components/FeaturedSlider";
import { productData } from "../data/products";

const offerSlides = [
  {
    imageDesktop: "assets/images/SLIDER/CATALOGO/01-desktop-1.webp",
    imageMobile: "assets/images/SLIDER/CATALOGO/01-mobile.webp",
    link: "/producto/69",
  },
  {
    imageDesktop: "assets/images/SLIDER/CATALOGO/02-desktop-1.webp",
    imageMobile: "assets/images/SLIDER/CATALOGO/02-mobile.webp",
    link: "/producto/70",
  },
  {
    imageDesktop: "assets/images/SLIDER/CATALOGO/03-desktop-1.webp",
    imageMobile: "assets/images/SLIDER/CATALOGO/03-mobile.webp",
    link: "/producto/71",
  },
  {
    imageDesktop: "assets/images/SLIDER/CATALOGO/04-desktop-1.webp",
    imageMobile: "assets/images/SLIDER/CATALOGO/04-mobile.webp",
    link: "/producto/72",
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
        <h2 className="text-4xl font-bold text-center mb-6 text-black">
          OFERTAS ESPECIALES
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
      <FeaturedSlider
        title="PRODUCTOS EXCLUSIVOS"
        categories={productData}
        mode="exclusive"
        bgColor="bg-white"
      />
      <hr className="text-black/20"/>
      <Products />
      <AboutUs />
    </>
  );
};

export default HomeWrapper;