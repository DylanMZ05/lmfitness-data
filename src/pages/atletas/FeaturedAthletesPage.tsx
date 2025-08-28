import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

// ==========================
// Datos
// ==========================
export type Athlete = {
  name: string;
  photo: string;
  sport: string;
  achievements: string[];
  description: string;
  instagram?: string;     // opcional
  focal?: string;         // opcional: "50% 35%", "center top", etc.
};

export const athletes: Athlete[] = [
  {
    name: "Eduardo Thuot 🥋",
    photo: "/assets/images/ATLETAS/Eduardo-Thuot.jpeg",
    sport: "Jiu Jitsu",
    achievements: [
      "🏆 Campeón de la SBJJ",
      "🏆 3 veces Campeón Absoluto Adulto",
      "🏆 Campeón del Open Argentina",
      "🏆 Campeón del Open Ciudad de La Plata",
      "🏆 Campeón Absoluto Open Berisso",
      "🏆 Campeón Kimura Pro League",
      "🥈 Subcampeón Copa América de Jiu Jitsu",
      "🥇 Primero en el ranking anual bonaerense"
    ],
    description:
      "Atleta de 18 años de Mar del Tuyú. Faixa azul 2°, compite en alto nivel. Este año apunta al Mundial de Brasil representando a Argentina.",
    instagram: "https://www.instagram.com/_dudu._.bjj_", // reemplazar si cambia
    focal: "50% 40%"
  },
  {
    name: "Fernando Alcántara 💪",
    photo: "/assets/images/ATLETAS/Fernando-Alcantara.jpeg",
    sport: "Powerlifting",
    achievements: [
      "📅 2023 – Clasificatorio WRPF, Entre Ríos (-82.5 Master, Classic Raw) – 1° lugar",
      "🏆 Campeón Nacional Argentino WRPF 2023 (-82.5 Master) – Récord Bench Press y Deadlift",
      "🏆 Torneo Push Pull Miramar (APUA) – 1° lugar + Mejor Coeficiente Masculino",
      "🏆 Torneo Clausura Embalse, Córdoba WRPF – 1° lugar",
      "📅 2024 – Torneo Regional Miramar (APUA) – 1° lugar – Récord Deadlift y Bench Press",
      "🏆 Clasificatorio WRPF, Entre Ríos (-90 Master) – 1° lugar + Mejor Coeficiente Masculino",
      "🏆 Torneo Clasificatorio APL (-90 Master) – 1° lugar",
      "🏆 Nacional Argentino APL (-90 Master) – 1° lugar",
      "🏆 Nacional Argentino WRPF, Villa María Córdoba (-90 Master) – Campeón Nacional y Especialista Bench Press",
      "🌍 Iberoamericano IPL, Neuquén – Campeón y múltiples récords (Squat, Bench, Deadlift)",
      "🌍 X Championship World WRPF, Moscú (Rusia) – Campeón Mundial (-90 Master)",
      "📅 2025 – Clasificatorio WRPF, Entre Ríos (San Salvador, -90 Master) – 1° lugar + Mejor Coeficiente Masculino",
      "🏆 Nacional Argentino WRPF, Villa María Córdoba (-90 Master) – Campeón Nacional y récords Squat, Bench, Deadlift",
      "⏳ Iberoamericano WRPF – Medellín, Colombia (27-29 Sept 2025)",
      "⏳ Mundial APL/IPL – Buenos Aires, Argentina (30 Oct – 02 Nov 2025)",
      "⏳ XI Campeonato Mundial de Powerlifting – Moscú, Rusia (04-07 Dic 2025)"
    ],
    description:
      "Powerlifter profesional de 47 años con más de 10 años de trayectoria. Múltiple campeón nacional e internacional, con récords en squat, bench y deadlift. Representa a Argentina en competencias internacionales de máximo nivel.",
    instagram: "https://www.instagram.com/fernandopowerlifter",
    focal: "50% 40%"
  },
  {
    name: "Priscila Rodríguez 🥋",
    photo: "/assets/images/ATLETAS/Priscila-Rodriguez.jpeg",
    sport: "Taekwondo",
    achievements: [
      "🏆 Múltiple campeona provincial",
      "🥇 Múltiple campeona nacional, doble subcampeona argentina",
      "🌍 Triple campeona internacional",
      "🥈 Doble subcampeona internacional (Argentina)",
      "🥉 Bronce PATU12 con selección nacional (Chile)",
      "🏅 Subcampeona mundial en Brasil",
      "🏅 Medalla por deportista destacada"
    ],
    description:
      "Con 17 años y 13 de trayectoria, integra la selección nacional de taekwondo. Clasificada a los Juegos Argentinos de Alto Rendimiento (2025).",
    instagram: "https://www.instagram.com/prisss_rodrigues_",
    focal: "50% 35%"
  },
  {
    name: "Valentín Saganía 🏓",
    photo: "/assets/images/ATLETAS/Valentin-Sagania.jpeg",
    sport: "Pádel",
    achievements: [
      "🔥 Top 5 ranking APA 2024",
      "💪 Entrenamiento en la Academia de Sebastián Mocoroa",
      "🏆 Campeón en su primera competencia de menores",
      "🥈 Subcampeón nacional de menores",
      "🥈 Subcampeón provincial de menores",
      "🏆 Campeón 7ma categoría (Federal Mar del Plata)",
      "🥈 Subcampeón 5ta categoría (Nacional MDP)",
      "🏆 Campeón 4ta categoría (Provincial de menores)"
    ],
    description:
      "Promesa del pádel argentino, 16 años, con más de 10 en competencia. Entrenado en academias de elite y con múltiples podios nacionales.",
    instagram: "https://www.instagram.com/valen_saga",
    focal: "50% 40%"
  },
  {
    name: "Katia Gabotto 🎾",
    photo: "/assets/images/ATLETAS/Kathia-Gabotto.jpeg",
    sport: "Tenis",
    achievements: [
      "🏆 Torneos profesionales nacionales subiendo en el ranking",
      "🌍 Participación en torneos ITF internacionales",
      "💪 Interclubes para Racing",
      "🥇 Primera +19 mixto",
      "🥈 Intermedia +19 damas con ascenso a Primera"
    ],
    description:
      "Tenista de Mar de Ajó desde los 6 años, formada con Panchi Gabotto y Joaquín Gabotto. En 2023 ganó 8 de 12 torneos europeos y hoy compite en el ranking profesional nacional e internacional.",
    instagram: "https://www.instagram.com/katiaagabotto",
    focal: "50% 35%"
  },
  {
    name: "Matías Lema 🏋️",
    photo: "/assets/images/ATLETAS/Matias-Lema.jpeg",
    sport: "Weightlifting",
    achievements: [
      "🥇 4 oros y 🥉 3 bronces en torneos provinciales (Taekwondo)",
      "🥇 1 oro y 🥈 1 plata en torneos nacionales (Taekwondo)",
      "🌍 1 oro G2 y 1 oro G1 internacionales (Taekwondo)",
      "🔥 Preparando su primer torneo de Weightlifting"
    ],
    description:
      "Ex competidor de Taekwondo desde 2019. Descubierto como talento en Weightlifting, hoy proyecta una nueva carrera deportiva.",
    instagram: "https://www.instagram.com/matulema__",
    focal: "50% 35%"
  },
  {
    name: "Josefina Sequeira 🏃‍♀️🚴",
    photo: "/assets/images/ATLETAS/Josefina-Sequeira.jpeg",
    sport: "Running & Ciclismo",
    achievements: [
      "🥈 2° puesto 8K 'Diversamente Posibles' 2024",
      "🥈 2° puesto 10K 'Campeonato Cuatro Costas' 22/06/25",
      "🥈 2° puesto 10K 'Campeonato Cuatro Costas' 13/07/25",
      "🏅 4° puesto MTB Rally Costa del Este 2025",
      "🏆 Ganadora Duatlón Villa Gesell 2025 (1° general y categoría)"
    ],
    description:
      "Atleta de San Bernardo con trayectoria en tenis, running y ciclismo. Busca inspirar a otros con disciplina y pasión por superarse.",
    instagram: "https://www.instagram.com/sequeira.josefina",
    focal: "50% 20%" // sube el encuadre para evitar cortar cabezas en formatos anchos
  }
];

// ==========================
// Componentes
// ==========================
const AthleteCard: React.FC<{ athlete: Athlete }> = ({ athlete }) => {
  const [showMore, setShowMore] = useState(false);

  const firstAchievements = athlete.achievements.slice(0, 3);
  const extraAchievements = athlete.achievements.slice(3);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
      {/* Imagen (responsiva con aspect-ratio y overlay) */}
      <div className="relative aspect-[4/3]">
        <img
          src={athlete.photo}
          alt={athlete.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: athlete.focal || "50% 50%" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-xl font-bold text-white drop-shadow">
            {athlete.name}
          </h3>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <p className="text-red-400 text-sm font-semibold mb-3">{athlete.sport}</p>

        {/* Logros fijos */}
        <ul className="text-sm text-gray-200 list-disc list-inside space-y-1 mb-2">
          {firstAchievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>

        {/* Logros extra animados */}
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
          <div className="mt-4 flex justify-start">
            <a
              href={athlete.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label={`Instagram de ${athlete.name}`}
              title={`Instagram de ${athlete.name}`}
            >
              <FaInstagram className="text-[#E1306C] hover:text-[#e0779a] text-3xl" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const AthletesGrid: React.FC<{ athletes: Athlete[] }> = ({ athletes }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {athletes.map((athlete, idx) => (
        <AthleteCard key={idx} athlete={athlete} />
      ))}
    </div>
  );
};

// ==========================
// Página
// ==========================
const INTRO = `
En LMFITNESS creemos en el esfuerzo, la constancia y la pasión por superarse cada día. 
Por eso presentamos a nuestros atletas: personas que representan el deporte, la disciplina y el compromiso. 

Ellos nos inspiran a dar lo mejor de nosotros mismos y nos demuestran que, con dedicación y trabajo duro, todo es posible. 

Acompañamos su rendimiento con asesoramiento personalizado y la suplementación adecuada para potenciar cada logro. 

Desde nuestros comienzos apoyamos al deporte y a los deportistas de La Costa, apostando al crecimiento local y respaldando a quienes nos representan con orgullo.
`;

const FeaturedAthletesPage: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-20">
      {/* Título */}
      <div className="text-center mb-10 mt-16">
        <h2 className="inline-flex items-center gap-3 text-3xl md:text-4xl font-extrabold tracking-wide">
          <span className="text-sky-400">🛡️</span>
          <span>ATLETAS LMFITNESS</span>
        </h2>
        <div className="h-[3px] w-40 bg-red-600 mx-auto mt-3 rounded-full" />
        <p className="text-gray-300 mt-5 max-w-4xl mx-auto leading-relaxed md:text-lg whitespace-pre-line">
          {INTRO}
        </p>
      </div>

      {/* Grid */}
      <AthletesGrid athletes={athletes} />
    </section>
  );
};

export default FeaturedAthletesPage;
