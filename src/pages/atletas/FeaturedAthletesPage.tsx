import React from "react";
import AthletesGrid from "./AthletesGrid";

// Ejemplo de datos
const athletes = [
  {
    name: "Juan Pérez",
    photo: "/assets/images/ATLETAS/01.webp",
    sport: "Físicoculturismo",
    achievements: [
      "Campeón Nacional 2022",
      "Top 5 Sudamericano IFBB"
    ],
    description:
      "Atleta con más de 8 años de trayectoria en la categoría Men's Physique. Ejemplo de constancia y disciplina."
  },
  {
    name: "María López",
    photo: "/assets/images/ATLETAS/02.webp",
    sport: "Powerlifting",
    achievements: [
      "Récord nacional de sentadilla",
      "Campeón Argentino 2021"
    ],
    description:
      "Especialista en levantamiento de potencia, ejemplo de cómo la suplementación y el entrenamiento van de la mano."
  },
  {
    name: "Carlos Díaz",
    photo: "/assets/images/ATLETAS/03.webp",
    sport: "Runner",
    achievements: [
      "Triatleta con 10 maratones finalizados",
      "Campeón Maratón Mar del Plata 2023"
    ],
    description:
      "Con su energía inagotable y determinación, representa la disciplina y constancia que exige el running. Su estilo único y su pasión por superar cada kilómetro la convierten en una inspiración dentro y fuera de la pista."
  }
];

const FeaturedAthletesPage: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-20">
      {/* Título */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold border-b-4 border-red-600 inline-block pb-2">
          ATLETAS DESTACADOS
        </h2>
        <p className="text-gray-400 mt-3">
          Conocé a los atletas que representan la excelencia y disciplina en cada deporte.
        </p>
      </div>

      {/* Grid */}
      <AthletesGrid athletes={athletes} />
    </section>
  );
};

export default FeaturedAthletesPage;
