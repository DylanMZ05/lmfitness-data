// data/products.ts
export interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: string;
  offerPrice?: string;
  featuredId?: number;
  longDescription?: string;
}

export interface Category {
  name: string;
  slug?: string;
  image?: string;
  products: Product[];
}

export function parseFormattedText(text: string) {
  const boldConverted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const lineBreaks = boldConverted.replace(/\/\/\s*/g, '<br>');
  return lineBreaks;
}

export const productData: Category[] = [
  {
    name: "COMBOS EXCLUSIVOS",
    slug: "combos-exclusivos",
    image: "assets/images/COMBOS/combo-1.webp",
    products: [
      {
        id: 69,
        images: ["assets/images/COMBOS/combo-1.webp"],
        title: "COMBO STAR NUTRITION",
        description: "Combo 1kg de PROTEÍNA + 300gr de CREATINA - STAR NUTRITION",
        price: "$16.000",
        offerPrice: "$12.000",
        featuredId: 1,
      },
      {
        id: 70,
        images: ["assets/images/COMBOS/combo-2.webp"],
        title: "COMBO GOLD NUTRITION",
        description: "Combo 1kg de PROTEÍNA + 300gr de CREATINA - GOLD NUTRITION",
        price: "$6.000",
      },
      {
        id: 71,
        images: ["assets/images/COMBOS/combo-3.webp"],
        title: "COMBO XLL GENTECH - DURA 3 MESES",
        description: "Combo 1kg de PROTEÍNA + 250gr de CREATINA - GENTECH",
        price: "$6.000",
      },
      {
        id: 72,
        images: ["assets/images/COMBOS/combo-4.webp"],
        title: "COMBO ONEFIT",
        description: "Combo 1kg de PROTEÍNA + 250gr de CREATINA - ONEFIT",
        price: "$6.000",
      },
    ],
  },
  {
  name: "PROTEÍNA",
  slug: "proteinas",
  image: "assets/images/PROTEINAS/PWI-2lb-Chocolate.webp",
  products: [
    {
      id: 1,
      images: [
        "assets/images/PROTEINAS/whey-2l-v1-24b723703b471838e216681759491174-640-0.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-PROTEIN-1KG-DOYPACK.webp"
      ],
      title: "PROTEINA – STAR NUTRITION PLATINUM DOYPACK",
      description: "Proteína avanzada.",
      longDescription: "**Proteína concentrada** de suero (WPC). // Presentación: Doypack resellable. Rinde: aprox. 30 servicios. Contenido: 24 g de proteína por scoop. Bajo en carbohidratos y grasas. Ideal para ganancia muscular y recuperación post-entreno.",
      price: "$30.000",
      featuredId: 6,
    },
    {
      id: 2,
      images: [
        "assets/images/PROTEINAS/PWI-2lb-Chocolate.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-ISOLATE.webp"
      ],
      title: "PROTEINA – STAR NUTRITION WHEY ISOLATE",
      description: "Proteína de alta calidad.",
      price: "$57.000",
      featuredId: 2,
    },
    {
      id: 3,
      images: [
        "assets/images/PROTEINAS/Truemade_vainilla_2lb.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-ENA-TRUE-MADE.webp"
      ],
      title: "PROTEINA – ENA TRUE MADE",
      description: "Ideal para recuperación.",
      price: "$36.300",
      featuredId: 3,
    },
    {
      id: 4,
      images: [
        "assets/images/PROTEINAS/100__Whey_vainilla_1024x.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-ENA-100--WHEY.webp"
      ],
      title: "PROTEINA – ENA 100% WHEY",
      description: "Rendimiento y pureza.",
      price: "$29.800",
      featuredId: 4,
    },
    {
      id: 5,
      images: [
        "assets/images/PROTEINAS/PULVER-SoyProtein-1kg-almendra-1-600x752.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-SOY-PROTEIN-VEGETAL-PULVER.webp"
      ],
      title: "PROTEINA – VEGETAL \"SOY PROTEIN\" PULVER",
      description: "Alternativa vegetal saludable.",
      price: "$33.500",
      featuredId: 5,
    },
    {
      id: 6,
      images: [
        "assets/images/PROTEINAS/images (6).webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-VEGETAL-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – VEGETAL GOLD NUTRITION",
      description: "Nutrición natural.",
      price: "$29.800",
      featuredId: 6,
    },
    {
      id: 7,
      images: [
        "assets/images/PROTEINAS/Gold_xtrenght_advanced_chocolate_FINAL.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-XTRENGHT-ADVANCED.webp"
      ],
      title: "PROTEINA – WHEY ADVANCED XTRENGHT",
      description: "Para entrenamientos intensos.",
      price: "$39.000",
    },
    {
      id: 8,
      images: [
        "assets/images/PROTEINAS/whey-5lb-chocolate1.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-100--WHEY-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION 100% WHEY",
      description: "Proteína pura y efectiva.",
      price: "$35.000",
    },
    {
      id: 9,
      images: [
        "assets/images/PROTEINAS/new-ripped1-.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-WHEY-RIPPED-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION WHEY RIPPED (CON QUEMADOR)",
      description: "Con quemadores para definición.",
      price: "$37.800",
    },
    {
      id: 10,
      images: [
        "assets/images/PROTEINAS/iso_gold_protein_gold_nutrition_isolate_isolatada.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-WHEY-ISOLATE-GOLD-NUTRITION.webp"
      ],
      title: "PROTEINA – GOLD NUTRITION WHEY ISOLATE",
      description: "Aislado de proteína premium.",
      price: "$47.000",
    },
    {
      id: 11,
      images: [
        "assets/images/PROTEINAS/IMG_20220529_202931_665_2.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-BEST-WHEY-XTRENGHT.webp"
      ],
      title: "PROTEINA – CON CREATINA BEST WHEY XTRENGHT",
      description: "Fuerza y recuperación.",
      price: "$33.000",
    },
    {
      id: 13,
      images: [
        "assets/images/PROTEINAS/PROTEINA-WHEY-PROTEIN-7900-X-1KG.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-7900-GENTECH.webp"
      ],
      title: "PROTEINA – WHEY PROTEIN 7900 GENTECH",
      description: "Energía y rendimiento.",
      price: "$25.000",
    },
    {
      id: 14,
      images: [
        "assets/images/PROTEINAS/Fit-Whey-Protein.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-FITWHEY-GENERATION-ON-FIT.webp"
      ],
      title: "PROTEINA – FITWHY GENERATION FIT",
      description: "Rendimiento diario.",
      price: "$24.000",
    },
    {
      id: 15,
      images: ["assets/images/PROTEINAS/one-fit-tarro.webp"],
      title: "PROTEINA – CLASSIC WHEY ONEFIT",
      description: "Nutrición diaria accesible.",
      price: "$22.000",
    },
    {
      id: 16,
      images: [
        "assets/images/PROTEINAS/diseno-sin-titulo-.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-MONSTER-7900-GENTECH-3KG.webp"
      ],
      title: "PROTEINA – GENTECH MONSTER WHEY",
      description: "Alto volumen para grandes resultados.",
      price: "$58.000",
    },
    {
      id: 17,
      images: [
        "assets/images/PROTEINAS/whey-2l-v1-24b723703b471838e216681759491174-640-0.webp",
        "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PROTEINAS/INFO-PROTE-STAR-PLATINUM-WHEY-PROTEIN-3KG-DOYPACK.webp"
      ],
      title: "PROTEINA – STAR NUTRITION PLATINUM",
      description: "Presentación de 3KG para máximo rendimiento.",
      price: "$99.500",
    },
  ],
},
  {
    name: "GANADORES DE PESO",
    slug: "ganadores-de-peso",
    image: "assets/images/GANADORES-DE-PESO/nitrogain-15-kg__1.webp",
    products: [
      {
        id: 18,
        images: [
          "assets/images/GANADORES-DE-PESO/UltraMass_kilo_vainilla_1024x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-ULTRA-MASS-ENA.webp"
        ],
        title: "GANADORES DE PESO - ULTRA MASS ENA SPORT",
        description: "Gana masa muscular rápidamente.",
        price: "$27.700",
      },
      {
        id: 19,
        images: [
          "assets/images/GANADORES-DE-PESO/D_NQ_NP_885422-MLA49910744162_052022-O.webp"
          // No se encontró imagen nutricional para este
        ],
        title: "GANADORES DE PESO - MUTANT MASS STAR NUTRITION",
        description: "Fórmula potente para volumen.",
        price: "$28.200",
      },
      {
        id: 20,
        images: [
          "assets/images/GANADORES-DE-PESO/nitrogain-15-kg__1.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-NITROGAIN-XTRENGHT.webp"
        ],
        title: "GANADORES DE PESO - NITROGAIN XTRENGHT",
        description: "Aumenta peso y fuerza.",
        price: "$27.500",
      },
      {
        id: 21,
        images: [
          "assets/images/GANADORES-DE-PESO/1201-4f03bb0a06a31abf3716580805730431-480-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GANADORES-DE-PESO/INFO-MAXI-GAIN-GENTECH.webp"
        ],
        title: "GANADORES DE PESO - MAXI GAIN GENTECH",
        description: "Ganador de peso económico y efectivo.",
        price: "$20.000",
      },
    ],
  },
  {
    name: "CREATINAS MONOHIDRATO",
    slug: "creatinas",
    image: "assets/images/CREATINAS/creatina_monohidrato_gold_nutrition_doypack.webp",
    products: [
      {
        id: 23,
        images: [
          "assets/images/CREATINAS/creatina-of-5850132a403757eda316986845288405-1024-1024.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-ONEFIT.webp"
        ],
        title: "CREATINA - MICRONIZADA ONEFIT NEUTRA",
        description: "200GR de creatina sin sabor.",
        price: "$18.000",
        longDescription: "**Cantidad:** 200g // **Sabor:** Sin sabor // **Porciones:** 40 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 24,
        images: [
          "assets/images/CREATINAS/CREATINA MONOHIDRATO.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GENTECH-250GR.webp"
        ],
        title: "CREATINA - GENTECH NEUTRA",
        description: "250GR de creatina neutra.",
        price: "$24.400",
        longDescription: "**Cantidad:** 250g // **Sabor:** Sin sabor // **Porciones:** 50 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 25,
        images: [
          "assets/images/CREATINAS/CREATINA MONOHIDRATO.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GENTECH-250GR.webp"
        ],
        title: "CREATINA - GENTECH NEUTRA",
        description: "500GR de creatina neutra.",
        price: "$33.400",
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
        price: "$33.200",
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
        price: "$30.800",
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
        price: "$47.200",
        longDescription: "**Cantidad:** 500g // **Sabor:** Sin sabor // **Porciones:** 100 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 29,
        images: [
          "assets/images/CREATINAS/image_1920.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREA-STAR-1KG-POTE.webp"
        ],
        title: "CREATINA - MICRONIZADA STAR NUTRITION POTE (1gk)",
        description: "1KG de creatina monohidratada.",
        price: "$85.500",
        longDescription: "**Cantidad:** 1000g (1kg) // **Sabor:** Sin sabor // **Porciones:** 200 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 30,
        images: [
          "assets/images/CREATINAS/Creatina_Micronizada_neutra_1600x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-ENA-SPORT.webp"
        ],
        title: "CREATINA - MICRONIZADA ENA SPORT",
        description: "300GR micronizada para mejor absorción.",
        price: "$34.800",
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
      {
        id: 31,
        images: [
          "assets/images/CREATINAS/creatina_monohidrato_gold_nutrition_doypack.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/CREATINAS/INFO-CREATINA-GOLD-NUTRITION.webp"
        ],
        title: "CREATINA - MICRONIZADA GOLD NUTRITION",
        description: "300GR de creatina de alta pureza.",
        price: "$26.500",
        longDescription: "**Cantidad:** 300g // **Sabor:** Sin sabor // **Porciones:** 60 (5g por porción) // // **Modo de uso:** 1 porción diaria (5g), post-entreno o en cualquier momento del día. Mantener la constancia. // // **Beneficios:** // - Aumento de rendimiento físico, mejorando la fuerza y potencia muscular. // - Aumento de la masa muscular, aumentando la síntesis de proteína a largo plazo. // - Recuperación más rápida, reduciendo el daño muscular y la inflamación. // - Beneficios cognitivos, ayudando a las funciones cerebrales como la memoria, la concentración y la atención.",
      },
    ],
  },
  {
    name: "AMINOACIDOS Y BCAA",
    slug: "aminoacidos-bcaa",
    image: "assets/images/AMINOACIDOS-BCAA/1547749785269559737.webp",
    products: [
      {
        id: 32,
        images: [
          "assets/images/GLUTAMINA/GLUTA.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/GLUTAMINA/INFO-GLUTAMINA-STAR-300GR-POTE.webp"
        ],
        title: "GLUTAMINA - STAR NUTRITION",
        description: "300GR para recuperación muscular.",
        price: "$26.900",
      },
      {
        id: 35,
        images: [
          "assets/images/AMINOACIDOS-BCAA/Amino_4500_600x600_crop_center (1).webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-4500-ENA.webp"
        ],
        title: "AMINO - 4500 ENA SPORT",
        description: "150 comp. para recuperación muscular.",
        price: "$22.900",
      },
      {
        id: 36,
        images: [
          "assets/images/AMINOACIDOS-BCAA/amino-75515be91f7f54a48117170086447119-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-9000-GENTECH.webp"
        ],
        title: "AMINO - 9000 GENTECH",
        description: "160 comp. de aminoácidos esenciales.",
        price: "$15.000",
      },
      {
        id: 37,
        images: [
          "assets/images/AMINOACIDOS-BCAA/1547749785269559737.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-AMINO-6400-NUTREMAX.webp"
        ],
        title: "AMINO - 6400 NUTREMAX",
        description: "200 comp. de alta potencia.",
        price: "$19.600",
      },
      {
        id: 38,
        images: [
          "assets/images/AMINOACIDOS-BCAA/1901_800.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-BCAA-2000-STAR.webp"
        ],
        title: "BCAA - 2000 STAR NUTRITION",
        description: "120 comp. de BCAA 2:1:1.",
        price: "$15.000",
      },
      {
        id: 39,
        images: [
          "assets/images/AMINOACIDOS-BCAA/ena_reload_bcaa_2_1_1_post_entrenamiento_thumb1.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/AMINOACIDOS-BCAA/INFO-RELOAD-BCAA-ENA-SPORT.webp"
        ],
        title: "BCAA - RELOAD ENA SPORT",
        description: "220GR de BCAA en polvo.",
        price: "$19.200",
      },
    ],
  },
  {
    name: "PRE ENTRENOS",
    slug: "pre-entrenos",
    image: "assets/images/PRE-ENTRENOS/killer.webp",
    products: [
      {
        id: 40,
        images: [
          "assets/images/PRE-ENTRENOS/Prewar_Fruit.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/PRE-ENTRENOS/INFO-PRE-ENTRENO-PRE-WAR-ENA.webp"
        ],
        title: "PRE-ENTRENO - WAR ENA SPORT",
        description: "400GR de energía explosiva.",
        price: "$27.000",
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
        price: "$21.100",
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
        price: "$28.100",
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
        price: "$18.500",
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
        price: "$17.700",
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
        price: "$15.500",
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
        price: "$18.500",
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
        price: "$14.700",
        longDescription: "**Cantidad:** 150g // **Porción:** 3.8g - **Servicios:** 39 // // **Modo de uso:** Mezclar 1 porción con 200 ml de agua. // **Días de Entrenamiento:** 1 servicio, 1 hora antes de entrenar. // **Días de Descanso:** 1 servicio, 1 hora antes del desayuno. // // **Beneficios:** // - Mejora la circulación sanguínea y la oxigenación muscular. // - Facilita el transporte de nutrientes y elimina desechos metabólicos. // - Acelera la recuperación y estimula el crecimiento muscular.",
      },
      {
        id: 34,
        images: [
          "assets/images/ARGININA-BETA-ALANINA/beta-alanina.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/ARGININA-BETA-ALANINA/INFO-BETA-ALANINA-STAR.webp"
        ],
        title: "BETA ALANINA - STAR NUTRITION 300 GRS",
        description: "300GR de beta alanina para resistencia.",
        price: "$23.500",
        longDescription: "**Cantidad:** 300g // **Porción:** 2g (media cuchara de té) - **Servicios:** 150 // // **Modo de uso:** Se pueden utilizar de 2 a 5g diarios, previo al entrenamiento. // // **Beneficios:** // - Mejora el rendimiento y la resistencia en entrenamientos de alta intensidad. // - Ayuda a reducir la fatiga muscular. // - Aumenta la capacidad de realizar repeticiones adicionales. // - Mejora el rendimiento en ejercicios que requieren explosividad y fuerza.",
      },
      {
        id: 54,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/STANUT005516.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-CAFEINA-STAR.webp"
        ],
        title: "CAFEÍNA - 2000 STAR NUTRITION",
        description: "30 comp. de energía concentrada.",
        price: "$7.000",
        longDescription: "**Cantidad:** 30 cápsulas // **Porción:** 1 cápsula - **Servicios:** 30 // // **Modo de uso:** Tomar 1 cápsula 15 a 30 minutos previo al entrenamiento. No consumir más de 2 cápsulas diarias. // // **Beneficios:** // - Aumenta la energía y el enfoque mental. // - Mejora el rendimiento físico en ejercicios de alta intensidad. // - Estimula el sistema nervioso central. // - Promueve mayor quema de grasa al aumentar el metabolismo. // - Mejora la concentración y la alerta mental durante el ejercicio.",
      },
    ],
  },
  {
    name: "QUEMADORES DE GRASA",
    slug: "quemadores",
    image: "assets/images/QUEMADORES/D_NQ_NP_719950-MLA42153030443_062020.webp",
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
      },
      {
        id: 48,
        images: [
          "assets/images/QUEMADORES/RippedX.webp",
        ],
        title: "QUEMADOR - RIPPED X ENA SPORT",
        description: "60 comp. quemadores termogénicos.",
        price: "$12.000",
      },
    ],
  },
  {
    name: "SALUD/BIENESTAR",
    slug: "omega-3-cafeina-zma",
    image: "assets/images/OMEGA-3-ZMA-CAFEINA/zma_gold_nutrition.webp",
    products: [
      {
        id: 53,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/omega 3 natufarma.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-NUTRICIONAL-OMEGA-3-NATUFARMA.webp"
        ],
        title: "OMEGA 3 - NATUFARMA",
        description: "30 comp. de ácidos grasos esenciales.",
        price: "$9.000",
      },
      {
        id: 55,
        images: [
          "assets/images/OMEGA-3-ZMA-CAFEINA/zma_gold_nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/OMEGA-3-CAFEINA-ZMA/INFO-ZMA-GOLD-NUTRITION.webp"
        ],
        title: "ZMA - GOLD NUTRITION",
        description: "60 comp. con zinc, magnesio y B6.",
        price: "$12.000",
      },
      {
        id: 49,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/multi-vitaminas.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-MULTIVITAMINICO-GENTECH.webp"
        ],
        title: "MULTIVITAMINICO - GENTECH",
        description: "60 comp. con vitaminas y minerales.",
        price: "$6.000",
      },
      {
        id: 50,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/Colageno_Sport_800x.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-ENA-SPORT.webp"
        ],
        title: "COLÁGENO - ENA SPORT",
        description: "407GR para articulaciones y piel.",
        price: "$27.000",
      },
      {
        id: 51,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/Diapositiva1-11-600x600.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-GOLD-POLVO.webp"
        ],
        title: "COLÁGENO - GOLD NUTRITION",
        description: "200GR con ácido hialurónico y coenzima Q10.",
        price: "$20.000",
      },
      {
        id: 52,
        images: [
          "assets/images/MULTIVITAMINICO-Y-COLAGENO/colageno-e06a78b3de04faf9a217196048077347-640-0.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MULTIVITAMINICO-COLAGENOS/INFO-COLAGENO-+-TE-BLANCO-GOLD.webp"
        ],
        title: "COLÁGENO - GOLD NUTRITION",
        description: "200GR con ácido hialurónico + té blanco.",
        price: "$20.000",
      },
      {
        id: 62,
        images: [
          "assets/images/POTASIO-MAGNESIO/bad-monkey1-citrato-500-500x500.webp"
          // No se encontró info nutricional para BAD MONKEY
        ],
        title: "CITRATO DE MAGNESIO - BAD MONKEY",
        description: "500GR para apoyo muscular y nervioso.",
        price: "$18.500",
      },
      {
        id: 63,
        images: [
          "assets/images/POTASIO-MAGNESIO/D_NQ_NP_693317-MLA49168797875_022022-O.webp"
          // No se encontró info nutricional para BAD MONKEY
        ],
        title: "CITRATO DE POTASIO - BAD MONKEY",
        description: "500GR para equilibrio electrolítico.",
        price: "$20.300",
      },
      {
        id: 64,
        images: [
          "assets/images/POTASIO-MAGNESIO/dad2c1_a28f3ab1a8c844d580b0b7b91ba8a063~mv2.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MAGNESIO-POTASIO/INFO-MAGNESIO-ONEFIT.webp"
        ],
        title: "CITRATO MAGNESIO - ONEFIT",
        description: "150GR de magnesio en polvo.",
        price: "$7.500",
      },
      {
        id: 65,
        images: [
          "assets/images/POTASIO-MAGNESIO/dad2c1_b2088427c28947468ccd98d196bd30fe~mv2.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/MAGNESIO-POTASIO/INFO-POTASIO-ONEFIT.webp"
        ],
        title: "CITRATO POTASIO - ONEFIT",
        description: "150GR de potasio en polvo.",
        price: "$7.500",
      },
    ],
  },
  {
    name: "BARRAS PROTEÍCAS",
    slug: "barras-proteicas",
    image: "assets/images/BARRAS-PROTEICAS/barras.webp",
    products: [
      {
        id: 56,
        images: [
          "assets/images/BARRAS-PROTEICAS/barras.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BARRAS-PROTEICAS/INFO-IRONBAR-GENTECH.webp"
        ],
        title: "BARRA PROTEÍCA - IRON BAR GENTECH (CANT. 20)",
        description: "Sabores: Frutilla, Chocolate, Coco, Banana, Dulce de leche. Consultar disponibilidad.",
        price: "$20.000",
      },
    ],
  },
  {
    name: "HIDRATACIÓN Y RECUPERACIÓN",
    slug: "bebidas-isotonicas-electrolitos",
    image: "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561753884646192.webp",
    products: [
      {
        id: 57,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/hydro-plus-endurance-star-nutrition.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BEBIDAS-ISOTONICAS-ELECTROLITOS/INFO-HYDROPLUS-ENDURANCE-STAR.webp"
        ],
        title: "ISOTONICA - HYDRO PLUS STAR NUTRITION",
        description: "700GR para hidratación y rendimiento.",
        price: "$15.500",
      },
      {
        id: 58,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561753884646192.webp"
          // No se subió información nutricional para este
        ],
        title: "ISOTONICA - HYDROMAX SPORT DRINK NUTREMAX",
        description: "1520GR de bebida isotónica.",
        price: "$19.500",
      },
      {
        id: 59,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1639606179280250699.webp"
          // Tampoco tiene imagen nutricional
        ],
        title: "ISOTONICA - HYDROMAX SPORT DRINK DISPLAY",
        description: "Caja de 20 unidades.",
        price: "$11.900",
      },
      {
        id: 60,
        images: [
          "assets/images/BEBIDAS-ISOTONICAS-ELECTROLITOS/1674561138135341688.webp",
          "assets/images/INFORMACION-NUTRICIONAL-PRODUCTOS/BEBIDAS-ISOTONICAS-ELECTROLITOS/INFO-PRO-SALTS-NUTREMAX.webp"
        ],
        title: "CÁPSULAS ELECTROLITOS - PRO SALTS NUTREMAX",
        description: "60 comp. para rehidratación avanzada.",
        price: "$9.000",
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
      },
    ],
  },
  {
    name: "SHAKER MEZCLADOR",
    slug: "shaker-mezclador",
    image: "assets/images/SHAKERS/Shaker-GOT-PROTEIN-BLENDER_c5417a30-e671-4fea-95ea-b6e0b102dd93.webp",
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
        price: "",
      },
    ],
  },

];
