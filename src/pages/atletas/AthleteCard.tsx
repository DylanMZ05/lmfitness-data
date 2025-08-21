import React from "react";

type Athlete = {
  name: string;
  photo: string; // ruta a la imagen
  sport: string;
  achievements: string[];
  description: string;
};

const AthleteCard: React.FC<{ athlete: Athlete }> = ({ athlete }) => {
  return (
    <div className="bg-neutral-900 text-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Foto */}
      <img
        src={athlete.photo}
        alt={athlete.name}
        className="w-full h-64 object-cover"
      />

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{athlete.name}</h3>
        <p className="text-sm text-red-400 font-semibold mb-2">
          {athlete.sport}
        </p>

        {/* Logros */}
        <ul className="list-disc list-inside text-sm mb-3">
          {athlete.achievements.map((ach, idx) => (
            <li key={idx}>{ach}</li>
          ))}
        </ul>

        {/* Descripción */}
        <p className="text-gray-300 text-sm">{athlete.description}</p>
      </div>
    </div>
  );
};

export default AthleteCard;
