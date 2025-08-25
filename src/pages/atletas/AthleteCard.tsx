import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Athlete = {
  name: string;
  photo: string;
  sport: string;
  achievements: string[];
  description: string;
};

const AthleteCard: React.FC<{ athlete: Athlete }> = ({ athlete }) => {
  const [showMore, setShowMore] = useState(false);

  const firstAchievements = athlete.achievements.slice(0, 3);
  const extraAchievements = athlete.achievements.slice(3);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
      {/* Imagen */}
      <div className="relative">
        <img
          src={athlete.photo}
          alt={athlete.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-4">
          <h3 className="text-xl font-bold text-white drop-shadow">
            {athlete.name}
          </h3>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <p className="text-red-400 text-sm font-semibold mb-3">
          {athlete.sport}
        </p>

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
      </div>
    </div>
  );
};

export default AthleteCard;
