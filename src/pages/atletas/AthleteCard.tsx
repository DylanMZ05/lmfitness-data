import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Athlete = {
  name: string;
  photo: string;
  sport: string;
  achievements: string[];
  description: string;
  /** URL del perfil de Instagram, ej: "https://instagram.com/usuario" */
  instagram?: string;
  /** Foco de la imagen en CSS (object-position), ej: "50% 20%" */
  focal?: string;
};

const AthleteCard: React.FC<{ athlete: Athlete }> = ({ athlete }) => {
  const [showMore, setShowMore] = useState(false);

  const firstAchievements = athlete.achievements.slice(0, 3);
  const extraAchievements = athlete.achievements.slice(3);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
      {/* Imagen (responsive, con aspect-ratio y overlay) */}
      <div className="relative aspect-square">
        <img
          src={athlete.photo}
          alt={athlete.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: athlete.focal || "50% 50%" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-xl font-bold text-white drop-shadow">{athlete.name}</h3>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <p className="text-red-400 text-sm font-semibold mb-3">{athlete.sport}</p>

        {/* Logros siempre visibles */}
        <ul className="text-sm text-gray-200 list-disc list-inside space-y-1 mb-2">
          {firstAchievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>

        {/* Logros extra con animación */}
        <AnimatePresence>
          {showMore && (
            <motion.ul
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-200 list-disc list-inside space-y-1 overflow-hidden mb-2"
            >
              {extraAchievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Botón Ver más / Ver menos */}
        {extraAchievements.length > 0 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-red-400 text-sm hover:underline cursor-pointer"
          >
            {showMore ? "Ver menos ▲" : "Ver más ▼"}
          </button>
        )}

        {/* Descripción */}
        <p className="mt-4 text-gray-300 text-sm">{athlete.description}</p>

        {/* Instagram (opcional) */}
        {athlete.instagram && (
          <div className="mt-4">
            <a
              href={athlete.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-semibold shadow hover:opacity-90 transition"
              aria-label={`Instagram de ${athlete.name}`}
            >
              {/* Ícono Instagram (SVG) */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM18 6.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"/>
              </svg>
              Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteCard;
