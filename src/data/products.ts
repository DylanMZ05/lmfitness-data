// data/products.ts
// ✅ Tipado real de los productos que vienen de Firestore
export interface Product {
  id: string | number;
  title: string;
  description?: string;
  longDescription?: string;
  price: number | string;
  offerPrice?: number | string;
  images: string[];
  featuredId?: number | null;
  exclusiveId?: number | null;
  sinStock?: boolean;
}

// ✅ Tipado de categorías que vienen de Firestore
export interface Category {
  name: string;
  slug: string;
  image?: string;
  orden?: number;
  products: Product[];
}

// ✅ Utilidad para formateo de textos enriquecidos en descripción
export function parseFormattedText(text: string) {
  const boldConverted = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const lineBreaks = boldConverted.replace(/\/\/\s*/g, "<br>");
  return lineBreaks;
}

export const productData: Category[] = [
  {
    name: "COMBOS EXCLUSIVOS",
    slug: "combos-exclusivos",
    image: "assets/images/COMBOS/combo-1.webp",
    orden: 1,
    products: [
      // {
      //   id: 73,
      //   images: ["assets/images/OFERTA-SEMANAL/01.webp"],
      //   title: "COMBO 2X CREATINA 100% - PUERZA ONE FIT",
      //   description: "COMBO 2 CREATINA 100% - PUERZA ONE FIT",
      //   price: "$36.000",
      //   offerPrice: "$30.000",
      // },
      {
        id: 69,
        images: ["assets/images/COMBOS/combo-1.webp"],
        title: "COMBO STAR NUTRITION",
        description: "Combo 1kg de PROTEÍNA + 300gr de CREATINA - STAR NUTRITION",
        price: "$74.000",
        offerPrice: "$66.600",
      },
      {
        id: 70,
        images: ["assets/images/COMBOS/combo-2.webp"],
        title: "COMBO GOLD NUTRITION",
        description: "Combo 1kg de PROTEÍNA + 300gr de CREATINA - GOLD NUTRITION",
        price: "$72.100",
        offerPrice: "$64.900",
      },
      // {
      //   id: 71,
      //   images: ["assets/images/COMBOS/combo-3.webp"],
      //   title: "COMBO XLL GENTECH - DURA 3 MESES",
      //   description: "Combo 1kg de PROTEÍNA + 250gr de CREATINA - GENTECH",
      //   price: "$6.000",
      // },
      {
        id: 72,
        images: ["assets/images/COMBOS/combo-4.webp"],
        title: "COMBO ONEFIT",
        description: "Combo 1kg de PROTEÍNA + 200gr de CREATINA - ONEFIT",
        price: "$43.000",
        offerPrice: "$35.000",
      },
    ],
  },
  {
  name: "PROTEÍNA",
  slug: "proteinas",
  image: "assets/images/PROTEINAS/PWI-2lb-Chocolate.webp",
  orden: 20,
  products: [
    {
      id: 1,
      images: [
        "assets/images/PROTEINAS/whey-2l-v1-24b723703b471838e216681759491174-640-0.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-PROTEIN-1KG-DOYPACK.webp"
      ],
      title: "PROTEINA – STAR NUTRITION PLATINUM DOYPACK",
      description: "Proteína avanzada.",
      price: "$42.500",
      featuredId: 5,
      longDescription: "Blend de proteína ultra concentrada, aislado de suero lácteo e hidrolizado de alta calidad. Ideal para ganar masa muscular, mejorar la recuperación y sumar proteína completa de forma práctica. Buena disolución, rico sabor y fácil digestión. // // **Cantidad:** 908 g // **Porción:** 30 g // **Servicios:** 30 // // **Información nutricional por porción (30 g):** // • Proteína: 25 g // • Carbohidratos: 2.6 g // • Grasas: 1.8 g // // **Modo de uso:** Mezclar 1 medida (30 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 2,
      images: [
        "assets/images/PROTEINAS/PWI-2lb-Chocolate.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-ISOLATE.webp"
      ],
      title: "PROTEINA – STAR NUTRITION WHEY ISOLATE",
      description: "Proteína aislada de altísima pureza.",
      price: "$87.500",
      longDescription: "Proteína de suero lácteo 100% aislada de altísima pureza, deslactosada y sin azúcar. Sin dudas una de las mejores proteínas en polvo si hablamos de calidad y pureza, ideal para aquellas personas exigentes. Ideal para etapas de definición y para dietas bajas en calorías. // // **Cantidad:** 908 g // **Porción:** 30 g // **Servicios:** 30 // // **Información nutricional por porción (30 g):** // • Proteína: 27 g // • Carbohidratos: ~1 g // • Grasas: ~1 g // // **Modo de uso:** Mezclar 1 medida (30 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de altísima calidad y pureza. // 4. Ideal para definición y dietas bajas en calorías. // 5. Fácil disolución y digestión."
    },
    {
      id: 3,
      images: [
        "assets/images/PROTEINAS/Truemade_vainilla_2lb.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-ENA-TRUE-MADE.webp"
      ],
      title: "PROTEINA – ENA TRUE MADE",
      description: "Ideal para recuperación.",
      featuredId: 4,
      price: "$44.700",
      exclusiveId: 1,
      longDescription: "Proteína de suero lácteo concentrada y aislada de alta calidad, diseñada para favorecer el desarrollo muscular, acelerar la recuperación y aportar un perfil completo de aminoácidos. Ideal para sumar proteína de forma rápida y eficiente a tu dieta diaria. // // **Cantidad:** 930 g // **Porción:** 31 g // **Servicios:** 30 // // **Información nutricional por porción (31 g):** // • Proteína: 25 g // • Carbohidratos: 1.9 g // • Grasas: 2.3 g // // **Modo de uso:** Mezclar 1 medida (31 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 4,
      images: [
        "assets/images/PROTEINAS/100__Whey_vainilla_1024x.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-ENA-100--WHEY.webp"
      ],
      title: "PROTEINA – ENA 100% WHEY",
      description: "Rendimiento y pureza.",
      price: "$39.600",
      longDescription: "Proteína concentrada de suero lácteo, ideal para acompañar entrenamientos, mejorar la recuperación y sumar proteína de forma práctica y efectiva en el día a día. // // **Cantidad:** 900 g // **Porción:** 36 g // **Servicios:** 25 // // **Información nutricional por porción (36 g):** // • Proteína: 20 g // • Carbohidratos: 12 g // • Grasas: 1.9 g // // **Modo de uso:** Mezclar 1 medida (36 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 5,
      images: [
        "assets/images/PROTEINAS/PULVER-SoyProtein-1kg-almendra-1-600x752.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-SOY-PROTEIN-VEGETAL-PULVER.webp"
      ],
      title: "PROTEINA – VEGETAL \"SOY PROTEIN\" PULVER",
      description: "Alternativa vegetal saludable.",
      price: "$40.800",
      exclusiveId: 3,
      offerPrice: "$36.400",
      longDescription: "Proteína de soja en polvo de alta calidad, con un perfil completo de aminoácidos esenciales. Es una excelente opción vegetal para quienes buscan aumentar su ingesta proteica, favorecer el desarrollo muscular y cuidar la salud. Ideal para dietas veganas y vegetarianas, además de ser libre de lactosa. // // **Cantidad:** 1 kg // **Porción:** 40 g // **Servicios:** 25 // // **Información nutricional por porción (40 g):** // • Proteína: 34 g // • Carbohidratos: 4 g // • Grasas: 0.5 g // // **Modo de uso:** Mezclar 1 medida (40 g) en 200-250 ml de agua. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Fuente vegana y libre de lactosa. // 2. Ayuda al desarrollo y mantenimiento de la masa muscular. // 3. Perfil completo de aminoácidos esenciales. // 4. Fácil digestión y rápida absorción. // 5. Ideal para complementar dietas veganas, vegetarianas o sin lactosa."
    },
    {
      id: 6,
      images: [
        "assets/images/PROTEINAS/images (6).webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-VEGETAL-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – VEGETAL GOLD NUTRITION",
      description: "Nutrición natural.",
      price: "$34.200",
      longDescription: "Proteína vegetal aislada de alta calidad, elaborada a partir de fuentes naturales como guisante y arroz. Ideal para quienes buscan una opción vegana, libre de lactosa y con un perfil completo de aminoácidos. Perfecta para apoyar el desarrollo muscular y la recuperación, con fácil digestión y absorción. // // **Cantidad:** 907 g // **Porción:** 35 g // **Servicios:** 26 // // **Información nutricional por porción (35 g):** // • Proteína: 30 g // • Carbohidratos: 1 g // • Grasas: 2.5 g // • Fibra: 1.5 g // • Vitamina B12 // // **Modo de uso:** Mezclar 1 medida (35 g) en 200-250 ml de agua. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Fuente vegana y libre de lactosa. // 2. Ayuda al desarrollo y mantenimiento de la masa muscular. // 3. Perfil completo de aminoácidos esenciales. // 4. Fácil digestión y rápida absorción. // 5. Ideal para complementar dietas veganas, vegetarianas o sin lactosa."
    },
    {
      id: 7,
      images: [
        "assets/images/PROTEINAS/Gold_xtrenght_advanced_chocolate_FINAL.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-XTRENGHT-ADVANCED.webp"
      ],
      title: "PROTEINA – WHEY ADVANCED XTRENGHT",
      description: "Para entrenamientos intensos.",
      price: "$44.200",
      longDescription: "Blend de proteína ultra concentrada e aislada con proceso de hidrolizado para mejorar su absorción. Diseñada para maximizar el crecimiento y la recuperación muscular. Con un perfil balanceado de aminoácidos, es ideal para quienes buscan potenciar su rendimiento y resultados en el entrenamiento. // // **Cantidad:** 907 g // **Porción:** 30 g // **Servicios:** 30 // // **Información nutricional por porción (30 g):** // • Proteína: 24 g // • Carbohidratos: 2.0 g // • Grasas: 1.7 g // // **Modo de uso:** Mezclar 1 medida (30 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 8,
      images: [
        "assets/images/PROTEINAS/whey-5lb-chocolate1.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-100--WHEY-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION 100% WHEY",
      description: "Proteína pura y efectiva.",
      price: "$41.600",
      longDescription: "Blend de proteína ultra concentrada, aislado de suero lácteo e hidrolizado de alta calidad. Ideal para ganar masa muscular, mejorar la recuperación y sumar proteína completa de forma práctica. Buena disolución, rico sabor y fácil digestión. // // **Cantidad:** 908 g // **Porción:** 35 g // **Servicios:** 26 // // **Información nutricional por porción (35 g):** // • Proteína: 28 g // • Carbohidratos: 4.8 g // • Grasas: 1.8 g // // **Modo de uso:** Mezclar 1 medida (35 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 9,
      images: [
        "assets/images/PROTEINAS/new-ripped1-.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-WHEY-RIPPED-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION WHEY RIPPED (CON QUEMADOR)",
      description: "Con quemadores para definición.",
      price: "$44.600",
      longDescription: "Proteína en polvo con quemador de grasa, diseñada para acompañar tus objetivos de definición y control de peso. Con alto contenido proteico, ayuda a mantener la masa muscular mientras favorece la pérdida de grasa. Ideal para dietas bajas en calorías y entrenamiento intenso. Fácil disolución y absorción. // // **Cantidad:** 910 g // **Porción:** 35 g // **Servicios:** 26 // // **Información nutricional por porción (35 g):** // • Proteína: 28 g // • Carbohidratos: 4.8 g // • Grasas: 1.5 g // // **Alto perfil de aminoácidos y quemadores como:** L-Carnitina, Garcinia Cambogia, Taurina, Cafeína. // // **Modo de uso:** Mezclar 1 medida (35 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica. // 6. Ayuda a la pérdida de porcentaje de grasa corporal."
    },
    {
      id: 10,
      images: [
        "assets/images/PROTEINAS/iso_gold_protein_gold_nutrition_isolate_isolatada.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-WHEY-ISOLATE-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION WHEY ISOLATE",
      description: "Aislado de proteína premium.",
      price: "$62.900",
      longDescription: "Proteína de suero lácteo 100% aislada de altísima pureza, deslactosada y sin azúcar. Sin dudas una de las mejores proteínas en polvo si hablamos de calidad y pureza, ideal para aquellas personas exigentes. Ideal para etapas de definición y para dietas bajas en calorías. // // **Cantidad:** 908 g // **Porción:** 35 g // **Servicios:** 26 // // **Información nutricional por porción (35 g):** // • Proteína: 29 g // • Carbohidratos: 3.3 g // • Grasas: 0.8 g // // **Modo de uso:** Mezclar 1 medida (35 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 11,
      images: [
        "assets/images/PROTEINAS/IMG_20220529_202931_665_2.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-BEST-WHEY-XTRENGHT.webp"
      ],
      title: "PROTEINA – CON CREATINA BEST WHEY XTRENGHT",
      description: "Fuerza y recuperación.",
      price: "$36.700",
      longDescription: "Proteína en polvo con una fórmula balanceada que suma creatina y taurina para potenciar el crecimiento muscular y acelerar la recuperación. Ideal para deportistas que buscan un suplemento eficiente con rápida absorción y alto valor biológico. // // **Cantidad:** 907 g // **Porción:** 35 g // **Servicios:** 26 // // **Información nutricional por porción (35 g):** // • Proteína: 24 g // • Carbohidratos: 4.8 g // • Grasas: 1.9 g // // **Modo de uso:** Mezclar 1 medida (35 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 13,
      images: [
        "assets/images/PROTEINAS/PROTEINA-WHEY-PROTEIN-7900-X-1KG.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-7900-GENTECH.webp"
      ],
      title: "PROTEINA – WHEY PROTEIN 7900 GENTECH",
      description: "Energía y rendimiento.",
      price: "$42.500",
      longDescription: "Proteína concentrada de suero lácteo de alta calidad, diseñada para favorecer el desarrollo muscular y mejorar la recuperación. Ideal para quienes buscan una opción efectiva y confiable para aumentar su ingesta diaria de proteínas. Buena absorción y excelente perfil de aminoácidos esenciales. // // **Cantidad:** 1 kg // **Porción:** 30 g // **Servicios:** 30 // // **Información nutricional por porción (30 g):** // • Proteína: 22 g // • Carbohidratos: 3.3 g // • Grasas: 2.9 g // // **Modo de uso:** Mezclar 1 medida (30 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 14,
      images: [
        "assets/images/PROTEINAS/Fit-Whey-Protein.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-FITWHEY-GENERATION-ON-FIT.webp"
      ],
      title: "PROTEINA – FITWHEY GENERATION FIT",
      description: "Rendimiento diario.",
      price: "$29.500",
      longDescription: "Blend de suero lácteo concentrado e isolado, con proceso de hidrolizado para mejorar su absorción. Ideal para favorecer el desarrollo muscular, mejorar la recuperación y sumar proteína completa de forma práctica y efectiva. // // **Cantidad:** 908 g // **Porción:** 30 g // **Servicios:** 30 // // **Información nutricional por porción (30 g):** // • Proteína: 20 g // • Carbohidratos: 5 g // • Grasas: 2 g // // **Modo de uso:** Mezclar 1 medida (30 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 15,
      images: ["assets/images/PROTEINAS/whey-protein-doypack1.webp"],
      title: "PROTEINA – CLASSIC WHEY ONEFIT",
      description: "Nutrición diaria accesible.",
      price: "$24.000",
      featuredId: 8,
      longDescription: "Proteína concentrada de suero lácteo, ideal para favorecer el desarrollo muscular y mejorar la recuperación. Excelente opción para quienes buscan sumar proteínas completas a su dieta diaria de manera práctica y efectiva. // // **Cantidad:** 1 kg // **Porción:** 40 g // **Servicios:** 30 // // **Información nutricional por porción (40 g):** // • Proteína: 24 g // • Carbohidratos: 4.5 g // • Grasas: 3.8 g // // **Modo de uso:** Mezclar 1 medida (40 g) en 200-250 ml de agua o leche. Consumir después del entrenamiento o en cualquier momento del día para aumentar tu ingesta de proteínas. Se recomienda tomar 1 o 2 porciones máximo al día. // // **Beneficios:** // 1. Favorece el desarrollo y mantenimiento de la masa muscular. // 2. Acelera la recuperación post-entrenamiento. // 3. Aporta proteína de alta calidad y rápida absorción. // 4. Uso fácil y rápido para sumar proteína de alto valor en tu día a día. // 5. Ideal para complementar tu dieta de forma práctica."
    },
    {
      id: 16,
      images: [
        "assets/images/PROTEINAS/diseno-sin-titulo-.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-MONSTER-7900-GENTECH-3KG.webp"
      ],
      title: "PROTEINA – GENTECH MONSTER WHEY",
      description: "Alto volumen para grandes resultados.",
      price: "$115.500",
    },
    {
      id: 17,
      images: [
        "assets/images/PROTEINAS/whey-2l-v1-24b723703b471838e216681759491174-640-0.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-PROTEIN-3KG-DOYPACK.webp"
      ],
      title: "PROTEINA – STAR NUTRITION PLATINUM",
      description: "Presentación de 3KG para máximo rendimiento.",
      price: "$134.000",
    },
  ],
},
  {
    name: "GANADORES DE PESO",
    slug: "ganadores-de-peso",
    image: "assets/images/GANADORES-DE-PESO/nitrogain-15-kg__1.webp",
    orden: 30,
    products: [
      {
        id: 18,
        images: [
          "assets/images/GANADORES-DE-PESO/UltraMass_kilo_vainilla_1024x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-ULTRA-MASS-ENA.webp"
        ],
        title: "GANADORES DE PESO - ULTRA MASS ENA SPORT 1.5KG",
        description: "Gana masa muscular rápidamente.",
        price: "$34.900",
        longDescription: "**Información nutricional (por 100 g – aprox. 3 scoops):** // • Valor energético: 402 kcal // • Proteínas: 25 g // • Carbohidratos: 70 g // // **Ingredientes principales:** // • Proteína concentrada de suero (Whey Protein Concentrate) // • Proteína de caseína // • Maltodextrina (fuente de carbohidratos) // • Azúcares simples // • Vitaminas y minerales (según fórmula específica) // // **Modo de uso:** // Mezclar 1 a 2 porciones (aprox. 100 a 150 g) en 300 a 400 ml de agua, leche o bebida vegetal. // Tomar 1 o 2 veces al día, preferentemente: // – Después del entrenamiento // – Entre comidas para aumentar la ingesta calórica // // **Beneficios principales:** // • Aporta calorías de calidad para favorecer el aumento de masa muscular // • Proporciona una mezcla de proteínas de rápida y lenta absorción // • Favorece la recuperación y el crecimiento muscular // • Mejora el rendimiento y la resistencia durante el entrenamiento // • Ayuda a reponer energía y glucógeno post-entrenamiento"
      },
      {
        id: 19,
        images: [
          "assets/images/GANADORES-DE-PESO/D_NQ_NP_885422-MLA49910744162_052022-O.webp"
          // No se encontró imagen nutricional para este
        ],
        title: "GANADORES DE PESO - MUTANT MASS STAR NUTRITION 1.5KG",
        description: "Fórmula potente para volumen.",
        price: "$34.500",
        longDescription: "**Información nutricional por 90 g (2 scoops):** // • Valor energético: 382 kcal // • Proteínas: 23 g // • Carbohidratos: 59 g // // **Ingredientes principales:** // • Proteínas: suero de leche (whey), caseína // • Carbohidratos: maltodextrina, dextrosa, almidón de maíz // • Aminoácidos añadidos: creatina, glutamina, BCAA, taurina // • Vitaminas y minerales: complejo multivitamínico // // **Modo de uso:** // Mezclar 90 g (aproximadamente 2 medidas) en 500 ml de agua o leche. // Consumir 1 a 2 veces por día, preferentemente después del entrenamiento y/o entre comidas. // Ajustar según los requerimientos calóricos individuales. // // **Beneficios principales:** // • Aporta calorías de calidad para favorecer el aumento de masa muscular // • Proporciona una mezcla de proteínas de rápida y lenta absorción // • Favorece la recuperación y el crecimiento muscular // • Mejora el rendimiento y la resistencia durante el entrenamiento // • Ayuda a reponer energía y glucógeno post-entrenamiento"
      },
      {
        id: 20,
        images: [
          "assets/images/GANADORES-DE-PESO/nitrogain-15-kg__1.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-NITROGAIN-XTRENGHT.webp"
        ],
        title: "GANADORES DE PESO - NITROGAIN XTRENGHT 1.5KG",
        description: "Aumenta peso y fuerza.",
        price: "$29.000",
        longDescription: "**Información nutricional por 100 g:** // • Valor energético: 394 kcal // • Proteínas: 22 g // • Carbohidratos: 72 g // // **Ingredientes principales:** // • Proteínas: concentrado de suero de leche (whey), caseína // • Carbohidratos: maltodextrina, dextrosa // • Aminoácidos añadidos: creatina, glutamina, BCAA // • Vitaminas y minerales: complejo multivitamínico // // **Modo de uso:** // Mezclar 100 g (aproximadamente 2 medidas) en 500-600 ml de agua o leche. // Consumir 1 a 2 veces por día, preferentemente después del entrenamiento y/o entre comidas. // Ajustar según los requerimientos calóricos individuales. // // **Beneficios principales:** // • Aporta calorías de calidad para favorecer el aumento de masa muscular // • Proporciona una mezcla de proteínas de rápida y lenta absorción // • Favorece la recuperación y el crecimiento muscular // • Mejora el rendimiento y la resistencia durante el entrenamiento // • Ayuda a reponer energía y glucógeno post-entrenamiento"
      },
      {
        id: 21,
        images: [
          "assets/images/GANADORES-DE-PESO/1201-4f03bb0a06a31abf3716580805730431-480-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-MAXI-GAIN-GENTECH.webp"
        ],
        title: "GANADORES DE PESO - MAXI GAIN GENTECH",
        description: "Ganador de peso económico y efectivo.",
        price: "$24.500",
        longDescription: "**Información nutricional por 100 g:** // • Valor energético: 394 kcal // • Proteínas: 20 g // • Carbohidratos: 73 g // // **Ingredientes principales:** // • Proteínas: concentrado de suero de leche (whey) // • Carbohidratos: maltodextrina, dextrosa // // **Modo de uso:** // Mezclar 100 g (aproximadamente 2 medidas) en 500-600 ml de agua o leche. // Consumir 1 a 2 veces por día, preferentemente después del entrenamiento y/o entre comidas. // Ajustar según los requerimientos calóricos individuales. // // **Beneficios principales:** // • Aporta calorías de calidad para favorecer el aumento de masa muscular // • Proporciona una mezcla de proteínas de rápida y lenta absorción // • Favorece la recuperación y el crecimiento muscular // • Mejora el rendimiento y la resistencia durante el entrenamiento // • Ayuda a reponer energía y glucógeno post-entrenamiento"
      },
    ],
  },
  {
    name: "CREATINAS MONOHIDRATO",
    slug: "creatinas",
    image: "assets/images/CREATINAS/creatina_monohidrato_gold_nutrition_doypack.webp",
    orden: 40,
    products: [
      {
        id: 23,
        images: [
          "assets/images/CREATINAS/creatina-of-5850132a403757eda316986845288405-1024-1024.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-ONEFIT.webp"
        ],
        title: "CREATINA - MICRONIZADA ONEFIT NEUTRA (200gr)",
        description: "200GR de creatina sin sabor.",
        price: "$20.000",
        longDescription: "**Cantidad:** 200g // **Sabor:** Sin sabor // **Porciones:** 40 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 24,
        images: [
          "assets/images/CREATINAS/CREATINA MONOHIDRATO.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GENTECH-250GR.webp"
        ],
        title: "CREATINA - GENTECH NEUTRA (250gr)",
        description: "250GR de creatina neutra.",
        price: "$26.500",
        longDescription: "**Cantidad:** 250g // **Sabor:** Sin sabor // **Porciones:** 50 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 25,
        images: [
          "assets/images/CREATINAS/CREATINA MONOHIDRATO.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GENTECH-250GR.webp"
        ],
        title: "CREATINA - GENTECH NEUTRA (500gr)",
        description: "500GR de creatina neutra.",
        price: "$44.600",
        longDescription: "**Cantidad:** 500g // **Sabor:** Sin sabor // **Porciones:** 100 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 26,
        images: [
          "assets/images/CREATINAS/1636989941475-cf5a19930779ebd04916373583067560-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREA-STAR-300GR-POTE.webp"
        ],
        title: "CREATINA - MICRONIZADA STAR NUTRITION POTE (300gr)",
        description: "300GR de creatina monohidratada.",
        price: "$34.800",
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 27,
        images: [
          "assets/images/CREATINAS/creatina-star-doypack-3bbb6b716a7db752cb17176158563300-1024-1024.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREA-STAR-300GR-DOYPACK.webp"
        ],
        title: "CREATINA - MICRONIZADA STAR NUTRITION DOYPACK (300gr)",
        description: "300GR en empaque doypack.",
        price: "$31.500",
        featuredId: 2,
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 28,
        images: [
          "assets/images/CREATINAS/0617395130818.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREA-STAR-500GR-POTE.webp"
        ],
        title: "CREATINA - MICRONIZADA STAR NUTRITION POTE (500gr)",
        description: "500GR de creatina monohidratada.",
        price: "$52.500",
        longDescription: "**Cantidad:** 500g // **Sabor:** Sin sabor // **Porciones:** 100 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 29,
        images: [
          "assets/images/CREATINAS/image_1920.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREA-STAR-1KG-POTE.webp"
        ],
        title: "CREATINA - MICRONIZADA STAR NUTRITION POTE (1kg)",
        description: "1KG de creatina monohidratada.",
        price: "$95.000",
        longDescription: "**Cantidad:** 1000g (1kg) // **Sabor:** Sin sabor // **Porciones:** 200 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 30,
        images: [
          "assets/images/CREATINAS/Creatina_Micronizada_neutra_1600x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-ENA-SPORT.webp"
        ],
        title: "CREATINA - MICRONIZADA ENA SPORT (300gr)",
        description: "300GR micronizada para mejor absorción.",
        price: "$32.600",
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 31,
        images: [
          "assets/images/CREATINAS/creatina_monohidrato_gold_nutrition_doypack.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GOLD-NUTRITION.webp"
        ],
        title: "CREATINA - MICRONIZADA GOLD NUTRITION (300gr)",
        description: "300GR de creatina de alta pureza.",
        price: "$30.500",
        featuredId: 1,
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
    ],
  },
  {
    name: "AMINOACIDOS Y BCAA",
    slug: "aminoacidos-bcaa",
    image: "assets/images/AMINOACIDOS-BCAA/1547749785269559737.webp",
    orden: 50,
    products: [
      {
        id: 32,
        images: [
          "assets/images/GLUTAMINA/GLUTA.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GLUTAMINA/INFO-GLUTAMINA-STAR-300GR-POTE.webp"
        ],
        title: "L-GLUTAMINA - STAR NUTRITION - 300g",
        description: "300GR para recuperación muscular.",
        price: "$30.000",
        longDescription: "**Cantidad:** 300 gr // **Porción:** 5 gramos (1 cucharadita) // **Servicios:** 60 porciones aprox. // // **Modo de uso:** Tomar 5 gramos después del entrenamiento o antes de dormir, mezclado con agua o bebida de tu preferencia. // // **Beneficios principales:** // • Acelera la recuperación muscular // • Refuerza el sistema inmunológico // • Contribuye a la salud intestinal // • Fácil absorción y mezcla"
      },
      {
        id: 35,
        images: [
          "assets/images/AMINOACIDOS-BCAA/Amino_4500_600x600_crop_center (1).webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-4500-ENA.webp"
        ],
        title: "AMINO - 4500 ENA SPORT",
        description: "150 comp. para recuperación muscular.",
        price: "$27.500",
        longDescription: "**Cantidad:** 150 comprimidos // **Porción mínima:** 6 comprimidos // **Porción máxima:** 10 comprimidos // **Servicios:** 25 a 15 por envase (según dosis) // // **Ingredientes:** L-Leucina, L-Isoleucina, L-Valina, L-Lisina, L-Metionina, L-Fenilalanina, L-Treonina, L-Arginina, Glicina, L-Prolina, L-Ácido glutámico. // // **Uso recomendado:** Consumir entre 6 y 10 comprimidos por día, distribuidos en 2 tomas: antes del entrenamiento (3 a 5 comprimidos) y después del entrenamiento (3 a 5 comprimidos). En días de descanso: tomar con el desayuno o entre comidas. // // **Beneficios:** // • Favorece la recuperación muscular. // • Previene la pérdida de masa muscular (catabolismo). // • Aporta aminoácidos esenciales de forma práctica. // • Mejora el rendimiento y la resistencia física. // • Ideal para entrenamientos intensos y dietas exigentes."
      },
      {
        id: 36,
        images: [
          "assets/images/AMINOACIDOS-BCAA/amino-75515be91f7f54a48117170086447119-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-9000-GENTECH.webp"
        ],
        title: "AMINO - 9000 GENTECH",
        description: "160 comp. de aminoácidos esenciales.",
        price: "$23.000",
        longDescription: "**Cantidad:** 160 comprimidos // **Porción mínima:** 4 comprimidos // **Porción máxima:** 9 comprimidos // **Servicios:** 40 a 18 por envase (según dosis) // // **Ingredientes:** L-Leucina, L-Isoleucina, L-Valina, L-Lisina, L-Metionina, L-Fenilalanina, L-Treonina, L-Histidina, L-Arginina, L-Ácido aspártico, L-Ácido glutámico, Glicina, L-Prolina, L-Serina, L-Tirosina, L-Alanina. // // **Uso recomendado:** Consumir entre 4 y 9 comprimidos por día. // – Dosis mínima (4 comprimidos): dividir en 2 tomas, antes y después del entrenamiento. // – Dosis máxima (9 comprimidos): dividir en 3 tomas de 3 comprimidos: una antes del entrenamiento, una después y otra entre comidas o al desayuno. En días de descanso: mantener las tomas repartidas durante el día (desayuno, almuerzo, merienda). // // **Beneficios:** // • Favorece la recuperación muscular. // • Previene la pérdida de masa muscular (catabolismo). // • Aporta aminoácidos esenciales de forma práctica. // • Mejora el rendimiento y la resistencia física. // • Ideal para entrenamientos intensos y dietas exigentes."
      },
      {
        id: 37,
        images: [
          "assets/images/AMINOACIDOS-BCAA/1547749785269559737.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-6400-NUTREMAX.webp"
        ],
        title: "AMINO - 6400 NUTREMAX",
        description: "200 comp. de alta potencia.",
        price: "$23.000",
        longDescription: "**Cantidad:** 200 comprimidos // **Porción:** 8 comprimidos // **Servicios:** 25 por envase // // **Ingredientes:** L-Leucina, L-Isoleucina, L-Valina, L-Lisina, L-Metionina, L-Fenilalanina, L-Treonina, L-Arginina, L-Histidina, L-Alanina, Glicina, L-Prolina, L-Serina, L-Ácido aspártico, L-Ácido glutámico. // // **Uso recomendado:** Consumir 8 comprimidos por día, divididos en 2 tomas: // – 4 comprimidos antes del entrenamiento // – 4 comprimidos después del entrenamiento // En días de descanso: puede tomarse 4 con el desayuno y 4 con la merienda. // // **Beneficios:** // • Favorece la recuperación muscular. // • Previene la pérdida de masa muscular (catabolismo). // • Aporta aminoácidos esenciales de forma práctica. // • Mejora el rendimiento y la resistencia física. // • Ideal para entrenamientos intensos y dietas exigentes."
      },
      {
        id: 38,
        images: [
          "assets/images/AMINOACIDOS-BCAA/1901_800.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-BCAA-2000-STAR.webp"
        ],
        title: "BCAA - 2000 STAR NUTRITION",
        description: "120 comp. de BCAA 8:1:1.",
        price: "$16.000",
        longDescription: "**Cantidad:** 120 cápsulas // **Porción:** 4 cápsulas // **Servicios:** 30 // **Ratio:** 8:1:1 // // **Ingredientes:** L-Leucina, L-Isoleucina, L-Valina // // **Modo de uso:** Dividir 4 cápsulas diarias en 2 tomas: // – 2 cápsulas antes del entrenamiento // – 2 cápsulas después del entrenamiento // // **Beneficios:** // • Estimulan la síntesis de proteínas musculares. // • Aceleran la recuperación post-entreno. // • Ayudan a reducir el catabolismo muscular. // • Mejoran el rendimiento y la resistencia. // • Disminuyen la fatiga durante el ejercicio. // // **Información adicional:** // El ratio 8:1:1 indica la proporción de leucina frente a isoleucina y valina. Esto significa que por cada 8 porciones de leucina, hay 1 de isoleucina y 1 de valina. La leucina es clave porque activa la síntesis proteica muscular, siendo el aminoácido más importante para el crecimiento y recuperación muscular."
      },
      {
        id: 39,
        images: [
          "assets/images/AMINOACIDOS-BCAA/ena_reload_bcaa_2_1_1_post_entrenamiento_thumb1.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-RELOAD-BCAA-ENA-SPORT.webp"
        ],
        title: "BCAA - RELOAD ENA SPORT",
        description: "220GR de BCAA en polvo.",
        price: "$23.000",
        exclusiveId: 4,
        offerPrice: "$19.400",
        longDescription: "**Cantidad:** 200 g // **Porción:** 11 g (2 scoops) // **Servicios:** 20 // **Ratio:** 2:1:1 // // **Ingredientes:** L-Leucina, L-Isoleucina, L-Valina, Magnesio, Potasio, Sodio, Cloruro, Carbohidratos // // **Modo de uso:** Tomar 2 porciones diarias disueltas en agua, distribuidas en alguna de las siguientes formas: // – 1 porción antes y 1 porción durante el entrenamiento // – 1 porción durante y 1 porción después del entrenamiento // – 1 porción durante y 1 porción después del entrenamiento // // **Beneficios:** // • Estimulan la síntesis de proteínas musculares. // • Aceleran la recuperación post-entreno. // • Ayudan a reducir el catabolismo muscular. // • Mejoran el rendimiento y la resistencia. // • Disminuyen la fatiga durante el ejercicio. // // **Información adicional:** // El ratio 2:1:1 indica la proporción de leucina frente a isoleucina y valina. Esto significa que por cada 2 porciones de leucina, hay 1 de isoleucina y 1 de valina. La leucina es clave porque activa la síntesis proteica muscular, siendo el aminoácido más importante para el crecimiento y recuperación muscular."
      },
    ],
  },
  {
    name: "PRE ENTRENOS",
    slug: "pre-entrenos",
    image: "assets/images/PRE-ENTRENOS/killer.webp",
    orden: 60,
    products: [
      {
        id: 40,
        images: [
          "assets/images/PRE-ENTRENOS/Prewar_Fruit.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-ENTRENO-PRE-WAR-ENA.webp"
        ],
        title: "PRE-ENTRENO - WAR ENA SPORT",
        description: "400GR de energía explosiva.",
        price: "$32.000",
        longDescription: "**Cantidad:** 400g // **Porción:** 20g // **Servicios:** 20 // **Cafeína:** 200mg por porción // // **Modo de uso:** Disolver 1 medida en 500cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // 1. Aumento de energía y resistencia para entrenamientos más intensos. // 2. Mejora de la concentración y enfoque durante el ejercicio. // 3. Aumento del rendimiento físico, ayudando a maximizar la fuerza y la potencia muscular. // 4. Mejora de la circulación y el flujo sanguíneo para un mejor rendimiento durante la actividad física.",
      },
      {
        id: 41,
        images: [
          "assets/images/PRE-ENTRENOS/3668_800.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-ENTRENO-TNT-STAR.webp"
        ],
        title: "PRE-ENTRENO - TNT DYNAMITE STAR NUTRITION",
        description: "240GR de potencia previa al entrenamiento.",
        price: "$23.000",
        longDescription: "**Cantidad:** 240g // **Porción:** 8g // **Servicios:** 30 // **Cafeína:** 150mg por porción // // **Modo de uso:** Disolver 1 medida en 500cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // 1. Aumento de energía y resistencia para entrenamientos más intensos. // 2. Mejora de la concentración y enfoque durante el ejercicio. // 3. Aumento del rendimiento físico, ayudando a maximizar la fuerza y la potencia muscular. // 4. Mejora de la circulación y el flujo sanguíneo para un mejor rendimiento durante la actividad física.",
      },
      {
        id: 42,
        images: [
          "assets/images/PRE-ENTRENOS/pump-v8-star-nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-ENTRENO-V8-STAR.webp"
        ],
        title: "PRE-ENTRENO - PUMP V8 STAR NUTRITION",
        description: "285GR de foco y resistencia.",
        price: "$30.500",
        featuredId: 6,
        longDescription: "**Cantidad:** 285g // **Porción:** 9.5g // **Servicios:** 30 // **Cafeína:** 200mg por porción // // **Modo de uso:** Disolver 1 medida en 500cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // 1. Aumento de energía y resistencia para entrenamientos más intensos. // 2. Mejora de la concentración y enfoque durante el ejercicio. // 3. Aumento del rendimiento físico, ayudando a maximizar la fuerza y la potencia muscular. // 4. Mejora de la circulación y el flujo sanguíneo para un mejor rendimiento durante la actividad física.",
      },
      {
        id: 43,
        images: [
          "assets/images/PRE-ENTRENOS/pre-work-gold-11-1cc9a4878e3459bb7b16166954552385-1024-1024.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-WORK-GOLD-NUTRITION.webp"
        ],
        title: "PRE-ENTRENO - GOLD NUTRITION",
        description: "300gr para máximo rendimiento.",
        price: "$22.000",
        longDescription: "**Cantidad:** 300g // **Porción:** 14g (2 cucharadas) // **Servicios:** 20 // **Cafeína:** 176mg por porción // // **Modo de uso:** Disolver 1 medida en 500cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // 1. Aumento de energía y resistencia para entrenamientos más intensos. // 2. Mejora de la concentración y enfoque durante el ejercicio. // 3. Aumento del rendimiento físico, ayudando a maximizar la fuerza y la potencia muscular. // 4. Mejora de la circulación y el flujo sanguíneo para un mejor rendimiento durante la actividad física.",
      },
      {
        id: 44,
        images: [
          "assets/images/PRE-ENTRENOS/killer.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-ENTRENO-KILLER-5-0-GENERATION-FIT.webp"
        ],
        title: "PRE-ENTRENO - KILLER 5.0 GENERATION FIT",
        description: "300GR de explosividad en cada scoop.",
        price: "$21.000",
        longDescription: "**Cantidad:** 300g // **Porción:** 12g // **Servicios:** 25 // **Cafeína:** 180mg por porción // // **Modo de uso:** Disolver 1 medida en 500cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // 1. Aumento de energía y resistencia para entrenamientos más intensos. // 2. Mejora de la concentración y enfoque durante el ejercicio. // 3. Aumento del rendimiento físico, ayudando a maximizar la fuerza y la potencia muscular. // 4. Mejora de la circulación y el flujo sanguíneo para un mejor rendimiento durante la actividad física.",
      },
      {
        id: 45,
        images: [
          "assets/images/PRE-ENTRENOS/Oxido_Nitrico.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-OXIDO-NITRICO-ENA.webp"
        ],
        title: "OXIDO NITRICO - ENA SPORT",
        description: "150GR para vasodilatación intensa.",
        price: "$20.000",
        longDescription: "**Cantidad:** 210g // **Porción:** 7g - **Servicios:** 30 // // **Modo de uso:** Disolver 1 medida (7g) en 200cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // - Mejora la circulación y el flujo sanguíneo. // - Mayor congestión muscular (\"pump\"). // - Aumenta el rendimiento físico y la resistencia. // - Reduce la fatiga durante el entrenamiento. // - Favorece una recuperación más rápida.",
      },
      {
        id: 46,
        images: [
          "assets/images/PRE-ENTRENOS/no-gold1-7c8018b278afe9a87215817081251244-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-OXIDO-NITRICO-GOLD-NUTRITION.webp"
        ],
        title: "OXIDO NITRICO - GOLD NUTRITION",
        description: "195GR de óxido nítrico premium.",
        price: "$22.000",
        longDescription: "**Cantidad:** 195g // **Porción:** 7.8g - **Servicios:** 25 // // **Modo de uso:** Disolver 1 medida (7.8g) en 200cm³ de agua fría. Consumir 15 a 30 minutos antes del entrenamiento o la competencia. No consumir más de 2 porciones diarias. // // **Beneficios:** // - Mejora la circulación y el flujo sanguíneo. // - Mayor congestión muscular (\"pump\"). // - Aumenta el rendimiento físico y la resistencia. // - Reduce la fatiga durante el entrenamiento. // - Favorece una recuperación más rápida.",
      },
      {
        id: 33,
        images: [
          "assets/images/ARGININA-BETA-ALANINA/arginina-gh-star-nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/ARGININA-BETA-ALANINA/INFO-ARGININA-STAR.webp"
        ],
        title: "L-ARGININA - STAR NUTRITION 150 GRS",
        description: "150GR para vasodilatación y energía.",
        price: "$146000",
        exclusiveId: 5,
        offerPrice: "$15.300",
        longDescription: "**Cantidad:** 150g // **Porción:** 3.8g - **Servicios:** 39 // // **Modo de uso:** Mezclar 1 porción con 200 ml de agua. // **Días de Entrenamiento:** 1 servicio, 1 hora antes de entrenar. // **Días de Descanso:** 1 servicio, 1 hora antes del desayuno. // // **Beneficios:** // - Mejora la circulación sanguínea y la oxigenación muscular. // - Facilita el transporte de nutrientes y elimina desechos metabólicos. // - Acelera la recuperación y estimula el crecimiento muscular.",
      },
      {
        id: 34,
        images: [
          "assets/images/ARGININA-BETA-ALANINA/beta-alanina.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/ARGININA-BETA-ALANINA/INFO-BETA-ALANINA-STAR.webp"
        ],
        title: "BETA ALAGNINA - STAR NUTRITION 150 GRS",
        description: "150GR de beta alanina para resistencia.",
        price: "$25.000",
        exclusiveId: 2,
        longDescription: "**Cantidad:** 150g // **Porción:** 2g (media cuchara de té) - **Servicios:** 150 // // **Modo de uso:** Se pueden utilizar de 2 a 5g diarios, previo al entrenamiento. // // **Beneficios:** // - Mejora el rendimiento y la resistencia en entrenamientos de alta intensidad. // - Ayuda a reducir la fatiga muscular. // - Aumenta la capacidad de realizar repeticiones adicionales. // - Mejora el rendimiento en ejercicios que requieren explosividad y fuerza.",
      },
      {
        id: 54,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/STANUT005516.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-CAFEINA-STAR.webp"
        ],
        title: "CAFEÍNA - 2000 STAR NUTRITION",
        description: "30 comp. de energía concentrada.",
        price: "$7.500",
        longDescription: "**Cantidad:** 30 cápsulas // **Porción:** 1 cápsula - **Servicios:** 30 // // **Modo de uso:** Tomar 1 cápsula 15 a 30 minutos previo al entrenamiento. No consumir más de 2 cápsulas diarias. // // **Beneficios:** // - Aumenta la energía y el enfoque mental. // - Mejora el rendimiento físico en ejercicios de alta intensidad. // - Estimula el sistema nervioso central. // - Promueve mayor quema de grasa al aumentar el metabolismo. // - Mejora la concentración y la alerta mental durante el ejercicio.",
      },
    ],
  },
  {
    name: "QUEMADORES DE GRASA",
    slug: "quemadores",
    image: "assets/images/QUEMADORES/D_NQ_NP_719950-MLA42153030443_062020.webp",
    orden: 70,
    products: [
      {
        id: 47,
        images: [
          "assets/images/QUEMADORES/D_NQ_NP_719950-MLA42153030443_062020.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/QUEMADORES/INFO-QUEMADOR-CUTTER-XTRENGHT.webp"
        ],
        title: "QUEMADOR - XTRENGHT CUTTER",
        description: "120 comp. para definición corporal.",
        price: "$15.000",
        longDescription: "**Cantidad:** 120 comprimidos // **Porción:** 2 cápsulas // **Servicios:** 60 // **Dosis máxima diaria:** hasta 4 comprimidos. // // **Modo de uso:** Tomar 2 cápsulas al día, preferentemente 1 hora antes del almuerzo o del entrenamiento. Mantenerse bien hidratado durante el día. // // **Ingredientes:** Cafeína anhidra, té verde, L-carnitina, pimienta negra, cayena, vitaminas B6 y B12, cromo. // // **Beneficios principales:** // • Acelera el metabolismo y favorece la quema de grasa. // • Aumenta la energía y el foco mental. // • Ayuda a usar la grasa como fuente de energía. // • Reduce el apetito y los antojos. // • Mejora el rendimiento en entrenamientos intensos.",
      },
      {
        id: 48,
        images: [
          "assets/images/QUEMADORES/RippedX.webp"
        ],
        title: "QUEMADOR - RIPPED X ENA SPORT",
        description: "60 comp. quemadores termogénicos.",
        price: "$12.000",
        longDescription: "**Cantidad:** 60 cápsulas // **Porción:** 2 cápsulas // **Servicios:** 30 // // **Modo de uso:** Tomar 2 cápsulas diarias con abundante agua. Para entrenamientos más explosivos, consumir 2 cápsulas 30 minutos antes del entrenamiento. Recomendación: mantenerse bien hidratado. // // **Ingredientes:** Pimiento, pimienta negra, té verde, vitamina B3. // // **Beneficios principales:** // • Acelera el metabolismo y favorece la quema de grasa. // • Aumenta la energía y el foco mental. // • Reduce el apetito. // • Mejora el rendimiento deportivo.",
      },
      {
        id: 74,
        images: [
          "assets/images/QUEMADORES/L-CarnitineLiquid-Limon_2a4aff28-5569-43a7-b543-300af41b073b.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/QUEMADORES/INFO-L-CARNITINA-STAR.webp"
        ],
        title: "L-CARNITINA - STAR NUTRITION",
        description: "500ML para apoyo en quema de grasa y recuperación.",
        price: "$16.000",
        longDescription: "**Cantidad:** 500 ml // **Porción:** 15 ml (1 cucharada y 1/2 sopera) // **Servicios:** 33 // // **Modo de uso recomendado:** Tomar 15 ml al día, preferentemente antes del entrenamiento o junto con alguna comida. No superar la dosis indicada. // // **Beneficios principales:** // • Favorece la quema de grasa al usarla como fuente de energía. // • Mejora el rendimiento físico y la resistencia. // • Ayuda a reducir la fatiga durante entrenamientos intensos. // • Contribuye a una mejor recuperación post-entrenamiento. // • Apoya el metabolismo energético.",
      },
    ],
  },
  {
    name: "SALUD/BIENESTAR",
    slug: "omega-3-cafeina-zma",
    image: "assets/images/OMEGA-3-ZMA-CAFEINA/zma_gold_nutrition.webp",
    orden: 80,
    products: [
      {
        id: 53,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/omega 3 natufarma.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-NUTRICIONAL-OMEGA-3-NATUFARMA.webp"
        ],
        title: "OMEGA 3 - NATUFARMA",
        description: "30 comp. de ácidos grasos esenciales.",
        price: "$11.000",
        longDescription: "**Cantidad:** 30 comprimidos // **Porción:** 1 comprimido // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 o 2 comprimidos diarios acompañando una comida para mejorar su absorción (puede ser con el desayuno o almuerzo). // // **Beneficios principales:** // • Mejora la salud cardiovascular reduciendo colesterol y triglicéridos. // • Favorece la función cerebral, memoria y concentración. // • Posee propiedades antiinflamatorias que ayudan en la recuperación. // • Contribuye a la salud ocular y previene problemas de visión. // • Apoya la salud mental, ayudando a reducir ansiedad y depresión. // • Mejora la hidratación y elasticidad de la piel, y fortalece el cabello."
      },
      {
        id: 76,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/OMEGA-3-GEONAT.webp",
        ],
        title: "OMEGA 3 - GEONAT",
        description: "30 comp. para salud cardiovascular y mental.",
        price: "$11.000",
        longDescription: "**Cantidad:** 30 comprimidos // **Porción:** 1 comprimido // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 o 2 comprimidos diarios acompañando una comida para mejorar su absorción (puede ser con el desayuno o almuerzo). // // **Beneficios principales:** // • Mejora la salud cardiovascular reduciendo colesterol y triglicéridos. // • Favorece la función cerebral, memoria y concentración. // • Posee propiedades antiinflamatorias que ayudan en la recuperación. // • Contribuye a la salud ocular y previene problemas de visión. // • Apoya la salud mental, ayudando a reducir ansiedad y depresión. // • Mejora la hidratación y elasticidad de la piel, y fortalece el cabello."
      },
      {
        id: 55,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/zma_gold_nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-ZMA-GOLD-NUTRITION.webp"
        ],
        title: "ZMA - GOLD NUTRITION",
        description: "60 comp. con zinc, magnesio y B6.",
        price: "$14.000",
        longDescription: "**Cantidad:** 60 comprimidos // **Porción:** 2 cápsulas // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 2 cápsulas diarias en un vaso de agua, 30 minutos antes de irte a dormir. // // **Beneficios principales:** // • Mejora la recuperación y crecimiento muscular. // • Aumenta la fuerza y el rendimiento físico. // • Promueve un sueño profundo y reparador. // • Refuerza el sistema inmunológico. // • Regula los niveles hormonales, especialmente testosterona. // • Reduce fatiga y estrés."
      },
      {
        id: 49,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/multi-vitaminas.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-MULTIVITAMINICO-GENTECH.webp"
        ],
        title: "MULTIVITAMINICO - GENTECH",
        description: "60 comp. con vitaminas y minerales.",
        price: "$9.500",
        longDescription: "**Cantidad:** 60 comprimidos // **Porción:** 2 comprimidos // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 2 comprimidos diarios en un vaso de agua, preferentemente por la mañana. // // **Beneficios principales:** // • Completa la dieta con vitaminas y minerales esenciales. // • Fortalece el sistema inmunológico. // • Aumenta la energía y reduce la fatiga. // • Mejora la concentración y función cerebral. // • Promueve la salud de piel, cabello y uñas. // • Apoya el sistema nervioso."
      },
      {
        id: 50,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/Colageno_Sport_800x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-ENA-SPORT.webp"
        ],
        title: "COLÁGENO - ENA SPORT",
        description: "407GR para articulaciones y piel.",
        price: "$31.500",
        featuredId: 3,
        longDescription: "**Cantidad:** 407 g // **Porción:** 13,54 g (1 scoop colmado) // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 porción (1 scoop colmado) en un vaso de agua al día, preferentemente por la mañana. // // **Ingredientes:** Colágeno hidrolizado tipo 2, vitamina C, magnesio, cúrcuma y ácido hialurónico. // // **Beneficios principales:** // • Fortalece articulaciones, tendones y ligamentos. // • Mejora la salud de la piel, uñas y cabello. // • Favorece la recuperación muscular y previene lesiones. // • Aporta colágeno hidrolizado de fácil absorción. // • Ideal para quienes entrenan con regularidad o tienen desgaste físico."
      },
      {
        id: 51,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/Diapositiva1-11-600x600.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-GOLD-POLVO.webp"
        ],
        title: "COLÁGENO - GOLD NUTRITION + Q10",
        description: "200GR con ácido hialurónico y coenzima Q10.",
        price: "$20.000",
        longDescription: "**Cantidad:** 200 g // **Porción:** 10 g (2 scoops) // **Servicios por envase:** 20 // // **Modo de uso:** Tomar 1 porción (2 scoops) en un vaso de agua al día, preferentemente por la mañana. // // **Ingredientes:** Colágeno hidrolizado tipo 2, vitamina C, ácido hialurónico y coenzima Q10. // // **Beneficios principales:** // • Mejora la elasticidad y reduce arrugas en la piel. // • Favorece la regeneración de articulaciones y tejidos. // • Aporta antioxidantes que protegen las células. // • Aumenta la energía y reduce fatiga. // • Promueve la salud cardiovascular."
      },
      {
        id: 52,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/colageno-e06a78b3de04faf9a217196048077347-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-+-TE-BLANCO-GOLD.webp"
        ],
        title: "COLÁGENO - GOLD NUTRITION + TÉ BLANCO",
        description: "200GR con ácido hialurónico + té blanco.",
        price: "$20.000",
        longDescription: "**Cantidad:** 200 g // **Porción:** 10 g (2 scoops) // **Servicios por envase:** 20 // // **Modo de uso:** Tomar 1 porción (2 scoops) en un vaso de agua al día, preferentemente por la mañana. // // **Ingredientes:** Colágeno hidrolizado tipo 2, vitamina C, ácido hialurónico y té blanco. // // **Beneficios principales:** // • Mejora la firmeza, elasticidad y salud de la piel, ayudando a reducir arrugas. // • Propiedades antioxidantes que protegen las células y combaten el envejecimiento. // • Favorece la regeneración de articulaciones, huesos y tejidos musculares. // • Apoya la salud cardiovascular y reduce la inflamación. // • Contribuye a una piel más joven, saludable y radiante. // • Estimula el metabolismo y ayuda en el control del peso."
      },
      {
        id: 62,
        images: [
          "assets/images/POTASIO-MAGNESIO/bad-monkey1-citrato-500-500x500.webp"
          // No se encontró info nutricional para BAD MONKEY
        ],
        title: "CITRATO DE MAGNESIO - BAD MONKEY",
        description: "500GR para apoyo muscular y nervioso.",
        price: "$21.000",
        longDescription: "**Cantidad:** 500 g // **Porción:** 2.5 g (1/2 cucharadita de té) // **Servicios por envase:** 200 // // **Modo de uso:** Tomar 1 porción diaria disuelta en un vaso de agua, en cualquier momento del día o preferentemente 30 minutos antes de dormir. // // **Beneficios principales:** // • Previene calambres y mejora la función muscular. // • Favorece la recuperación post-entreno. // • Reduce el estrés y mejora el sueño. // • Aporta energía y mejora el rendimiento. // • Fortalece huesos y articulaciones. // • Mejora el tránsito intestinal."
      },
      {
        id: 63,
        images: [
          "assets/images/POTASIO-MAGNESIO/D_NQ_NP_693317-MLA49168797875_022022-O.webp"
          // No se encontró info nutricional para BAD MONKEY
        ],
        title: "CITRATO DE POTASIO - BAD MONKEY",
        description: "500GR para equilibrio electrolítico.",
        price: "$23.500",
        longDescription: "**Cantidad:** 500 g // **Porción:** 2.5 g (1/2 cucharadita de té) // **Servicios por envase:** 200 // // **Modo de uso:** Tomar 1 porción disuelta en un vaso de agua al día, en cualquier momento. // // **Beneficios principales:** // • Regula el equilibrio electrolítico. // • Apoya la función muscular y nerviosa. // • Contribuye a la salud cardiovascular. // • Favorece la función renal. // • Mejora el equilibrio ácido-base."
      },
      {
        id: 64,
        images: [
          "assets/images/POTASIO-MAGNESIO/dad2c1_a28f3ab1a8c844d580b0b7b91ba8a063~mv2.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MAGNESIO-POTASIO/INFO-MAGNESIO-ONEFIT.webp"
        ],
        title: "CITRATO MAGNESIO - ONEFIT",
        description: "150GR de magnesio en polvo.",
        price: "$9.000",
        longDescription: "**Cantidad:** 150 g // **Porción:** 2.5 g (1/2 cucharadita de té) // **Servicios por envase:** 60 // // **Modo de uso:** Tomar 1 porción diaria disuelta en un vaso de agua, en cualquier momento del día o preferentemente 30 minutos antes de dormir. // // **Beneficios principales:** // • Previene calambres y mejora la función muscular. // • Favorece la recuperación post-entreno. // • Reduce el estrés y mejora el sueño. // • Aporta energía y mejora el rendimiento. // • Fortalece huesos y articulaciones. // • Mejora el tránsito intestinal."
      },
      {
        id: 65,
        images: [
          "assets/images/POTASIO-MAGNESIO/dad2c1_b2088427c28947468ccd98d196bd30fe~mv2.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MAGNESIO-POTASIO/INFO-POTASIO-ONEFIT.webp"
        ],
        title: "CITRATO POTASIO - ONEFIT",
        description: "150GR de potasio en polvo.",
        price: "$9.000",
        longDescription: "**Cantidad:** 150 g // **Porción:** 5 g // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 porción disuelta en un vaso de agua al día, en cualquier momento. // // **Beneficios principales:** // • Regula el equilibrio electrolítico. // • Apoya la función muscular y nerviosa. // • Contribuye a la salud cardiovascular. // • Favorece la función renal. // • Mejora el equilibrio ácido-base."
      },
      {
        id: 77,
        images: [
          "assets/images/SALUD-BIENESTAR/vitamina-c-star-nutrition.webp",
          "assets/images/SALUD-BIENESTAR/info_vitamina-c-star-nutrition.webp"
        ],
        title: "VITAMINA C - STAR NUTRITION",
        description: "60 comp. antioxidantes para defensa inmunológica.",
        price: "$7.500",
        longDescription: "**Cantidad:** 60 comprimidos // **Porción:** 2 comprimidos // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 porción (2 comprimidos) por día, preferentemente con una comida. // // **Beneficios principales:** // • Refuerza el sistema inmunológico. // • Potente antioxidante. // • Favorece la recuperación muscular. // • Estimula la producción de colágeno. // • Mejora la absorción del hierro. // • Apoya la salud cardiovascular."
      },
      {
        id: 78,
        images: [
          "assets/images/SALUD-BIENESTAR/collagensport.webp",
          "assets/images/SALUD-BIENESTAR/info_collagensport.webp"
        ],
        title: "COLÁGENO SPORT - STAR NUTRITION",
        description: "360GR para articulaciones, piel y recuperación.",
        price: "$20.500",
        longDescription: "**Cantidad:** 360 g // **Porción:** 12 g (2 scoops colmados) // **Servicios por envase:** 30 // // **Modo de uso:** Tomar 1 porción (2 scoops colmados) en un vaso de agua al día, preferentemente por la mañana. // // **Ingredientes:** Colágeno hidrolizado tipo 2, vitamina C, citrato de magnesio, cafeína. // // **Beneficios principales:** // • Fortalece articulaciones, tendones y ligamentos. // • Mejora la salud de la piel, uñas y cabello. // • Favorece la recuperación muscular y previene lesiones. // • Aporta colágeno hidrolizado de fácil absorción. // • Ideal para quienes entrenan con regularidad o tienen desgaste físico."
      }
    ],
  },
  {
    name: "BARRAS PROTEÍCAS - CAFÉS ENERGETICOS",
    slug: "barras-proteicas",
    image: "assets/images/BARRAS-PROTEICAS/barras.webp",
    orden: 90,
    products: [
      {
        id: 56,
        images: [
          "assets/images/BARRAS-PROTEICAS/barras.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BARRAS-PROTEICAS/INFO-IRONBAR-GENTECH.webp"
        ],
        title: "BARRA PROTEÍCA - IRON BAR GENTECH (CANT. 20)",
        description: "Sabores: Frutilla, Chocolate, Coco, Banana, Dulce de leche. Consultar disponibilidad.",
        price: "$34.000",
        longDescription: "**Cantidad:** 20 unidades por caja // **Porción:** 46 g (1 barra) // **Proteína:** 15 g // **Kcal:** 180 // **Carbohidratos:** 18 g // **Fibra:** 2 g // // Snack proteico para sumar proteínas en tu día a día, súper ricos y saludables."
      },
      {
        id: 75,
        images: [
          "assets/images/BARRAS-PROTEICAS/StarterProtein.webp",
          "assets/images/BARRAS-PROTEICAS/StarterProtein-info.webp",
        ],
        title: "CAFÉ PROTEICO - STARTER PROTEIN ENA",
        description: "400GR de proteína funcional con té verde y guaraná.",
        price: "$23.000",
        longDescription: "**Cantidad:** 400 g // **Porción:** 16 g (1 scoop) // **Servicios:** 25 // // **Descripción:** Starter Protein de Ena es una proteína en polvo ideal para apoyar la recuperación muscular y el desarrollo de masa magra. Además, se puede preparar como un café proteico al combinarlo con té verde y guaraná, lo que ayuda a aumentar la energía y potenciar el rendimiento durante el día. // // **Beneficios:** // • Favorece la recuperación y reparación muscular. // • Promueve el aumento de masa muscular magra. // • Aporta energía natural gracias al té verde y guaraná. // • Fácil digestión y rápida absorción. // • Contiene aminoácidos esenciales para el rendimiento deportivo. // // **Modo de uso:** // Shot proteico: 1 porción (16 g) en 100 ml. // Batido proteico: 2 porciones (32 g) en 200 ml. // Se puede utilizar con leche o agua, tanto caliente como fría.",
      },
    ],
  },
  {
    name: "HIDRATACIÓN Y RECUPERACIÓN",
    slug: "bebidas-isotonicas-electrolitos",
    image: "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561753884646192.webp",
    orden: 100,
    products: [
      {
        id: 57,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/hydro-plus-endurance-star-nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BEBIDAS-ISOTONICAS-ELECTROLITOS/INFO-HYDROPLUS-ENDURANCE-STAR.webp"
        ],
        title: "ISOTONICA - HYDRO PLUS STAR NUTRITION",
        description: "700GR para hidratación y rendimiento.",
        price: "$16.500",
        longDescription: "**Cantidad:** 700g // **Porción:** 35g // **Servicios por envase:** 20 // // **Modo de uso:** Disolver 1 porción (35g) en 500 ml de agua. Consumir antes, durante o después del entrenamiento para mantener una hidratación óptima y reponer electrolitos. También puede tomarse en cualquier momento del día para mejorar el rendimiento físico en condiciones de alta exigencia o calor. // // **Ingredientes:** Carbohidratos, vitamina E, vitamina C, calcio, sodio, potasio, magnesio, BCAA. // // **Beneficios principales:** // • Reponen electrolitos perdidos durante el ejercicio. // • Mejoran la hidratación y el rendimiento físico. // • Aportan energía rápida gracias a sus carbohidratos simples. // • Reducen el cansancio y previenen calambres. // • Ideal para entrenamientos intensos o días de calor.",
      },
      {
        id: 58,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561753884646192.webp"
          // No se subió información nutricional para este
        ],
        title: "ISOTONICA - HYDROMAX SPORT DRINK NUTREMAX",
        description: "1520GR de bebida isotónica.",
        price: "$22.000",
        featuredId: 7,
        longDescription: "**Cantidad:** 1520g // **Porción:** 33g (4 scoops) // **Servicios por envase:** 46 // // **Modo de uso:** Disolver 1 porción (33g) en 500 ml de agua. Consumir antes, durante o después del entrenamiento para mantener una hidratación óptima y reponer electrolitos. También puede tomarse en cualquier momento del día para mejorar el rendimiento físico en condiciones de alta exigencia o calor. // // **Ingredientes:** Carbohidratos, sodio, potasio, vitamina E, vitamina C. // // **Beneficios principales:** // • Reponen electrolitos perdidos durante el ejercicio. // • Mejoran la hidratación y el rendimiento físico. // • Aportan energía rápida gracias a sus carbohidratos simples. // • Reducen el cansancio y previenen calambres. // • Ideal para entrenamientos intensos o días de calor.",
      },
      {
        id: 59,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1639606179280250699.webp"
          // Tampoco tiene imagen nutricional
        ],
        title: "ISOTONICA - HYDROMAX SPORT DRINK DISPLAY",
        description: "Caja de 20 unidades.",
        price: "$13.000",
        longDescription: "**Cantidad:** 20 sobres de 33g // **Porción:** 33g (1 sobre) // **Servicios por caja:** 20 // // **Modo de uso:** Disolver 1 porción (1 sobre – 33g) en 500 ml de agua. Consumir antes, durante o después del entrenamiento para mantener una hidratación óptima y reponer electrolitos. También puede tomarse en cualquier momento del día para mejorar el rendimiento físico en condiciones de alta exigencia o calor. // // **Ingredientes:** Carbohidratos, sodio, potasio, vitamina E, vitamina C. // // **Beneficios principales:** // • Reponen electrolitos perdidos durante el ejercicio. // • Mejoran la hidratación y el rendimiento físico. // • Aportan energía rápida gracias a sus carbohidratos simples. // • Reducen el cansancio y previenen calambres. // • Ideal para entrenamientos intensos o días de calor.",
      },
      {
        id: 60,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561138135341688.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BEBIDAS-ISOTONICAS-ELECTROLITOS/INFO-PRO-SALTS-NUTREMAX.webp"
        ],
        title: "CÁPSULAS ELECTROLITOS - PRO SALTS NUTREMAX",
        description: "60 comp. para rehidratación avanzada.",
        price: "$10.000",
        longDescription: "**Cantidad:** 60 cápsulas // // **Modo de uso:** Tomar 1 cápsula cada 60 minutos durante la actividad física. // // **Ingredientes:** Sodio, potasio, magnesio, cloruros, calcio, vitamina D. // // **Beneficios principales:** // • Reponen rápidamente los electrolitos perdidos por sudoración. // • Ayudan a prevenir calambres musculares. // • Mantienen el equilibrio hídrico y la hidratación corporal. // • Mejoran el rendimiento físico y la recuperación. // • Sin azúcares ni calorías adicionales. // // **Recomendado para:** Deportes de alto rendimiento y actividades de larga duración.",
      },
      {
        id: 61,
        images: [
          "assets/images/GELES-ENERGETICOS/MERVICK-ENERGY-GEL-1200x900.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GELES-ENERGETICOS/INFO-GEL-MERVICK.webp"
        ],
        title: "GEL ENERGÉTICO - MERVICK",
        description: "Caja con 12 unidades de gel energético.",
        price: "$16.200",
        longDescription: "**Cantidad:** 12 sobres por caja // **Porción:** 40 g (1 sobre) // **Servicios:** 12 // // **Información nutricional (por porción):** // • Valor energético: 116 kcal // • Carbohidratos: 27 g // • Aporta minerales como sodio, potasio y magnesio // • Contiene taurina y cafeína para más energía // // **Beneficios:** // • Energía rápida, ideal para actividades de larga duración. // • Contiene cafeína y taurina que aumentan el metabolismo y reducen la fatiga. // • Efecto estimulante para mantener un rendimiento alto. // // **Preparación y consumo:** // Diluir 40 g de gel en 400 ml de agua. // Consumir 1 a 2 geles cada 60 minutos según requerimientos, entrenamiento y carrera."
      },
    ],
  },
  {
    name: "SHAKER MEZCLADOR",
    slug: "shaker-mezclador",
    image: "assets/images/SHAKERS/Shaker-GOT-PROTEIN-BLENDER_c5417a30-e671-4fea-95ea-b6e0b102dd93.webp",
    orden: 110,
    products: [
      {
        id: 66,
        images: ["assets/images/SHAKERS/shaker-vaso-arnold-conquer.webp"],
        title: "SHAKER - ARNOLD",
        description: "Diseños variados de alta calidad.",
        price: "$16.000",
      },
      {
        id: 73,
        images: ["assets/images/SHAKERS/rosa1-4e0914d3e02c6947fc16396866523848-640-0.webp"],
        title: "SHAKER - I LOVE GYM",
        description: "Diseños variados de alta calidad.",
        price: "$16.000",
      },
      {
        id: 67,
        images: ["assets/images/SHAKERS/Shaker_truemade.webp"],
        title: "SHAKER - ENA SPORT",
        description: "Shaker clásico con tapa a rosca.",
        price: "$6.000",
      },
      {
        id: 68,
        images: ["assets/images/SHAKERS/Shaker-GOT-PROTEIN-BLENDER_c5417a30-e671-4fea-95ea-b6e0b102dd93.webp"],
        title: "SHAKER - GOT PROTEIN",
        description: "Consulta disponibilidad y precio actualizado.",
        price: "9.000",
      },
    ],
  },
  {
    name: "SIN STOCK",
    slug: "sin-stock",
    image: "assets/images/SHAKERS/Shaker-GOT-PROTEIN-BLENDER_c5417a30-e671-4fea-95ea-b6e0b102dd93.webp",
    orden: 999,
    products: [
      {
        id: 80,
        images: ["assets/images/CREATINAS/creatina-of-5850132a403757eda316986845288405-1024-1024.webp"],
        title: "CREATINA MICRONIZADA - ONEFTI (500gr)",
        description: "",
        price: "$42.500",
        offerPrice: "$37.000",
        longDescription: "**Cantidad:** 500 g // **Sabor:** Sin sabor // **Porciones:** 100 (5 g por porción) // // **Modo de uso:** 1 porción diaria (5 g), post-entreno o en cualquier momento del día. Mantener la constancia para mejores resultados. // // **Beneficios principales:** // • Aumenta el rendimiento físico, mejorando la fuerza y la potencia muscular. // • Favorece el aumento de masa muscular a largo plazo. // • Mejora la recuperación reduciendo el daño muscular y la inflamación. // • Aporta beneficios cognitivos: ayuda a la memoria, concentración y atención."
      },
      {
        id: 81,
        images: ["assets/images/AMINOACIDOS-BCAA/amino-essential.webp",
          "assets/images/AMINOACIDOS-BCAA/info-amino-essential.webp"
        ],
        title: "AMINO ESSENTIAL - GOLD NUTRITION (240gr)",
        description: "Recuperación y resistencia física.",
        price: "$42.500",
        offerPrice: "$37.000",
        longDescription: "**Cantidad:** 240 g // **Porción:** 8 g (1 scoop) // **Servicios:** 30 // // **Modo de uso:** 1 scoop diario en 200 ml de agua, post entrenamiento. // // **Ingredientes (aminograma):** // **Aminoácidos esenciales:** Histidina, Isoleucina, Leucina, Lisina, Metionina, Fenilalanina, Treonina, Triptófano, Valina. // **Aminoácidos no esenciales:** Alanina, Arginina, Ácido Aspártico, Glutamina, Glicina, Prolina, Serina, Tirosina. // **Otros:** Colágeno hidrolizado. // // **Beneficios principales:** // • Favorece la recuperación muscular. // • Previene la pérdida de masa muscular (catabolismo). // • Aporta aminoácidos esenciales de forma práctica. // • Mejora el rendimiento y la resistencia física. // • Ideal para entrenamientos intensos y dietas exigentes."
      },
      {
        id: 82,
        images: ["assets/images/POTASIO-MAGNESIO/stress-killer.webp",
          "assets/images/POTASIO-MAGNESIO/info-stress-killer.webp"
        ],
        title: "STRESS KILLER - LEGUILAB (60 comp.)",
        description: "Relajación, enfoque y descanso.",
        price: "$42.500",
        offerPrice: "$37.000",
        longDescription: "**Cantidad:** 60 cápsulas // **Porción:** 2 cápsulas // **Servicios:** 30 // // **Modo de uso:** Tomar 2 cápsulas diarias durante el desayuno o el almuerzo. // // **Ingredientes:** Vitamina B6 · Bisglicinato de Magnesio · L-Teanina // // **Beneficios principales:** // • Relajación muscular y nerviosa: el magnesio ayuda a reducir la tensión acumulada por el estrés. // • Promoción de la calma mental: la L-Teanina disminuye la ansiedad y favorece un estado de relajación consciente. // • Mejora del sueño: reduce la hiperactividad nerviosa y muscular, facilitando un descanso reparador. // • Apoyo al sistema nervioso: el magnesio regula los neurotransmisores y previene el agotamiento. // • Reducción del estrés: combinación sinérgica que mejora la respuesta adaptativa al estrés diario. // • Rendimiento cognitivo: promueve claridad mental y enfoque incluso en momentos de presión."      
      },
    ],
  },

];