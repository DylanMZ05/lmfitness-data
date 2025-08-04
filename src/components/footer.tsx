import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si"; // <-- TikTok icon
import { productData } from "../data/products";

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-neutral-950 text-white w-full">
      <section className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-3 gap-15 justify-items-center text-center md:text-left">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="assets/logo.webp"
              alt="Logo"
              className="h-20 mb-2 img-shadow"
            />
            <p className="text-2xl font-bold tracking-wider">LMFITNESS</p>
          </div>

          {/* Categorías dinámicas */}
          <div>
            <h3 className="text-xl font-semibold mb-4 md:min-w-78 md:text-center">Categorías</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-sm text-start">
              {productData
                .filter((category) => category.name.toLowerCase() !== "sin stock")
                .map((category) => (
                  <li key={category.slug} className="flex items-start gap-2">
                    <span className="text-red-500 mt-[2px]">•</span>
                    <Link
                      to={`/catalogo#${category.slug}`}
                      className="hover:underline hover:text-red-500 transition-colors leading-snug"
                    >
                      {category.name}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Contactános</h3>
            <div className="flex items-center justify-center md:justify-start gap-4 text-2xl">
              <a
                href="https://wa.me/5492257531656"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <FaWhatsapp className="text-[#25D366] hover:text-[#74f3a3] text-3xl" />
              </a>
              <a
                href="https://www.instagram.com/lm.fitness_1/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <FaInstagram className="text-[#E1306C] hover:text-[#e0779a] text-3xl" />
              </a>
              <a
                href="https://www.tiktok.com/@lm.fitness_1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <SiTiktok className="text-white hover:text-gray-300 text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-xs py-4 border-t border-white/10">
        © {new Date().getFullYear()} LMFITNESS. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;