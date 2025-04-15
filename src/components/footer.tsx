import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white w-full">
      <section className="flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center text-center md:text-left">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="assets/logo.jpeg"
              alt="Logo"
              className="h-20 mb-2 img-shadow"
            />
            <p className="text-2xl font-bold tracking-wider">LMFITNESS</p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categorías</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/catalogo" className="hover:underline">Proteínas</Link></li>
              <li><Link to="/catalogo" className="hover:underline">Pre entrenos</Link></li>
              <li><Link to="/catalogo" className="hover:underline">Creatinas</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contactános</h3>
            <div className="flex flex-col items-center md:items-start gap-3 text-sm">
              <a
                href="https://wa.me/5492257531656"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaWhatsapp className="text-xl" /> +54 9 2257 531656
              </a>
              <a
                href="https://www.instagram.com/lm.fitness_1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <FaInstagram className="text-xl" /> @lm.fitness_1
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-center text-xs py-4 border-t border-white/10">
        © {new Date().getFullYear()} LMFITNESS. Todos los derechos reservados.
      </div>
    </footer>

  );
};

export default Footer;