// data/products.ts
export interface Product {
  id: number;
  images: string[];     // Arreglo de imágenes
  title: string;
  description: string;
  price: string;
}

export interface Category {
  name: string;
  products: Product[];
}

export const productData: Category[] = [
  {
    name: "PROTEÍNA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "STAR NUTRITION PLATINUM DOYPACK",
        description: "Proteína avanzada.",
        price: "$30.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "STAR NUTRITION WHEY ISOLATE",
        description: "Proteína de alta calidad.",
        price: "$57.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "ENA TRUE MADE",
        description: "Ideal para recuperación.",
        price: "$36.300",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "ENA 100% WHEY",
        description: "Rendimiento y pureza.",
        price: "$29.800",
      },
      {
        id: 5,
        images: ["assets/prote-1.png"],
        title: "PROTEINA VEGETAL \"SOY PROTEIN\" PULVER",
        description: "Alternativa vegetal saludable.",
        price: "$33.500",
      },
      {
        id: 6,
        images: ["assets/prote-1.png"],
        title: "PROTEINA VEGETAL GOLD NUTRITION",
        description: "Nutrición natural.",
        price: "$29.800",
      },
      {
        id: 7,
        images: ["assets/prote-1.png"],
        title: "PROTEINA WHEY ADVANCED XTRENGHT",
        description: "Para entrenamientos intensos.",
        price: "$39.000",
      },
      {
        id: 8,
        images: ["assets/prote-1.png"],
        title: "GOLD NUTRITION 100% WHEY",
        description: "Proteína pura y efectiva.",
        price: "$35.000",
      },
      {
        id: 9,
        images: ["assets/prote-1.png"],
        title: "GOLD NUTRITION WHEY RIPPED (CON QUEMADOR)",
        description: "Con quemadores para definición.",
        price: "$37.800",
      },
      {
        id: 10,
        images: ["assets/prote-1.png"],
        title: "GOLD NUTRITION WHEY ISOLATE",
        description: "Aislado de proteína premium.",
        price: "$47.000",
      },
      {
        id: 11,
        images: ["assets/prote-1.png"],
        title: "PROTEINA + CREATINA BEST WHEY XTRENGHT",
        description: "Fuerza y recuperación.",
        price: "$33.000",
      },
      {
        id: 12,
        images: ["assets/prote-1.png"],
        title: "PROTEINA NUTRILAB WHEY PRO 2.0",
        description: "Desarrollo muscular eficiente.",
        price: "$21.000",
      },
      {
        id: 13,
        images: ["assets/prote-1.png"],
        title: "PROTEINA WHEY PROTEIN 7900 GENTECH",
        description: "Energía y rendimiento.",
        price: "$25.000",
      },
      {
        id: 14,
        images: ["assets/prote-1.png"],
        title: "PROTEINA FITWHY GENERATION FIT",
        description: "Rendimiento diario.",
        price: "$24.000",
      },
      {
        id: 15,
        images: ["assets/prote-1.png"],
        title: "PROTEINA CLASSIC WHEY ONEFIT",
        description: "Nutrición diaria accesible.",
        price: "$22.000",
      },
      {
        id: 16,
        images: ["assets/prote-1.png"],
        title: "PROTEINA GENTECH MONSTER WHEY",
        description: "Alto volumen para grandes resultados.",
        price: "$58.000",
      },
      {
        id: 17,
        images: ["assets/prote-1.png"],
        title: "STAR NUTRITION PLATINUM",
        description: "Presentación de 3KG para máximo rendimiento.",
        price: "$99.500",
      },
    ],
  },
  {
    name: "GANADORES DE PESO",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "ULTRA MASS ENA SPORT",
        description: "Gana masa muscular rápidamente.",
        price: "$27.700",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "MUTANT MASS STAR NUTRITION",
        description: "Fórmula potente para volumen.",
        price: "$28.200",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "NITROGAIN XTRENGHT",
        description: "Aumenta peso y fuerza.",
        price: "$27.500",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "MAXI GAIN GENTECH",
        description: "Ganador de peso económico y efectivo.",
        price: "$20.000",
      },
    ],
  },
  {
    name: "CREATINAS MONOHIDRATO",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "CREATINA NUTRILAB (SABORIZADA)",
        description: "300GR de creatina con sabor.",
        price: "$18.500",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "CREATINA ONEFIT NEUTRA",
        description: "200GR de creatina sin sabor.",
        price: "$18.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "CREATINA GENTECH NEUTRA",
        description: "250GR de creatina neutra.",
        price: "$24.400",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "CREATINA GENTECH NEUTRA",
        description: "500GR de creatina neutra.",
        price: "$33.400",
      },
      {
        id: 5,
        images: ["assets/prote-1.png"],
        title: "CREATINA STAR NUTRITION POTE",
        description: "300GR de creatina monohidratada.",
        price: "$33.200",
      },
      {
        id: 6,
        images: ["assets/prote-1.png"],
        title: "CREATINA STAR NUTRITION DOYPACK",
        description: "300GR en empaque doypack.",
        price: "$30.800",
      },
      {
        id: 7,
        images: ["assets/prote-1.png"],
        title: "CREATINA STAR NUTRITION POTE",
        description: "500GR de creatina monohidratada.",
        price: "$47.200",
      },
      {
        id: 8,
        images: ["assets/prote-1.png"],
        title: "CREATINA STAR NUTRITION POTE",
        description: "1KG de creatina monohidratada.",
        price: "$85.500",
      },
      {
        id: 9,
        images: ["assets/prote-1.png"],
        title: "CREATINA ENA SPORT",
        description: "300GR micronizada para mejor absorción.",
        price: "$34.800",
      },
      {
        id: 10,
        images: ["assets/prote-1.png"],
        title: "CREATINA GOLD NUTRITION",
        description: "300GR de creatina de alta pureza.",
        price: "$26.500",
      },
    ],
  },
  {
    name: "GLUTAMINA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "GLUTAMINA STAR NUTRITION",
        description: "300GR para recuperación muscular.",
        price: "$26.900",
      },
    ],
  },
  {
    name: "ARGININA - BETA ALANINA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "L-ARGININA STAR NUTRITION",
        description: "150GR para vasodilatación y energía.",
        price: "$14.700",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "L-ARGININA STAR NUTRITION",
        description: "150GR de beta alanina para resistencia.",
        price: "$23.500",
      },
    ],
  },
  {
    name: "AMINOACIDOS Y BCAA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "AMINO 4500 ENA SPORT",
        description: "150 comp. para recuperación muscular.",
        price: "$22.900",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "AMINO 9000 GENTECH",
        description: "160 comp. de aminoácidos esenciales.",
        price: "$15.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "AMINO 6400 NUTREMAX",
        description: "200 comp. de alta potencia.",
        price: "$19.600",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "BCAA 2000 STAR NUTRITION",
        description: "120 comp. de BCAA 2:1:1.",
        price: "$15.000",
      },
      {
        id: 5,
        images: ["assets/prote-1.png"],
        title: "RELOAD BCAA ENA SPORT",
        description: "220GR de BCAA en polvo.",
        price: "$19.200",
      },
    ],
  },
  {
    name: "PRE ENTRENOS",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "PRE WAR ENA SPORT",
        description: "400GR de energía explosiva.",
        price: "$27.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "TNT DYNAMITE STAR NUTRITION",
        description: "240GR de potencia previa al entrenamiento.",
        price: "$21.100",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "PUMP V8 STAR NUTRITION",
        description: "285GR de foco y resistencia.",
        price: "$28.100",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "PRE WORK GOLD NUTRITION",
        description: "280GR para máximo rendimiento.",
        price: "$18.500",
      },
      {
        id: 5,
        images: ["assets/prote-1.png"],
        title: "PRE ENTRENO KILLER 5.0 GENERATION FIT",
        description: "300GR de explosividad en cada scoop.",
        price: "$17.700",
      },
      {
        id: 6,
        images: ["assets/prote-1.png"],
        title: "OXIDO NITRICO ENA SPORT",
        description: "150GR para vasodilatación intensa.",
        price: "$15.500",
      },
      {
        id: 7,
        images: ["assets/prote-1.png"],
        title: "OXIDO NITRICO GOLD NUTRITION",
        description: "195GR de óxido nítrico premium.",
        price: "$18.500",
      },
    ],
  },
  {
    name: "QUEMADORES DE GRASA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "XTRENGHT CUTTER",
        description: "120 comp. para definición corporal.",
        price: "$15.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "RIPPED X ENA SPORT",
        description: "60 comp. quemadores termogénicos.",
        price: "$12.000",
      },
    ],
  },
  {
    name: "MULTIVITAMINICO & COLÁGENO",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "MULTIVITAMINICO GENTECH",
        description: "60 comp. con vitaminas y minerales.",
        price: "$6.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "ENACCION COLÁGENO + VIT C",
        description: "407GR para articulaciones y piel.",
        price: "$27.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "COLÁGENO GOLD NUTRITION",
        description: "200GR con ácido hialurónico y coenzima Q10.",
        price: "$20.000",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "COLÁGENO GOLD NUTRITION",
        description: "200GR con ácido hialurónico + té blanco.",
        price: "$20.000",
      },
    ],
  },
  {
    name: "OMEGA 3 - CAFEÍNA - ZMA",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "OMEGA 3 NATUFARMA",
        description: "30 comp. de ácidos grasos esenciales.",
        price: "$9.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "CAFEÍNA 2000 STAR NUTRITION",
        description: "30 comp. de energía concentrada.",
        price: "$7.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "ZMA GOLD NUTRITION",
        description: "60 comp. con zinc, magnesio y B6.",
        price: "$12.000",
      },
    ],
  },
  {
    name: "BARRAS PROTEICAS",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "IRON BAR GENTECH (CANT. 20)",
        description: "Sabores: Frutilla, Chocolate, Coco, Banana, Dulce de leche. Consultar disponibilidad.",
        price: "$20.000",
      },
    ],
  },
  {
    name: "BEBIDAS ISOTÓNICAS - ELECTROLITOS",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "HYDRO PLUS STAR NUTRITION",
        description: "700GR para hidratación y rendimiento.",
        price: "$15.500",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "HYDROMAX SPORT DRINK NUTREMAX",
        description: "1520GR de bebida isotónica.",
        price: "$19.500",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "HYDROMAX SPORT DRINK DISPLAY",
        description: "Caja de 20 unidades.",
        price: "$11.900",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "CÁPSULAS ELECTROLITOS PRO SALTS NUTREMAX",
        description: "60 comp. para rehidratación avanzada.",
        price: "$9.000",
      },
    ],
  },
  {
    name: "GEL ENERGÉTICO",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "ENERGY GEL MERVICK",
        description: "Caja con 12 unidades de gel energético.",
        price: "$16.200",
      },
    ],
  },
  {
    name: "MAGNESIO - POTASIO",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "CITRATO DE MAGNESIO BAD MONKEY",
        description: "500GR para apoyo muscular y nervioso.",
        price: "$18.500",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "CITRATO DE POTASIO BAD MONKEY",
        description: "500GR para equilibrio electrolítico.",
        price: "$20.300",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "CITRATO MAGNESIO ONEFIT",
        description: "150GR de magnesio en polvo.",
        price: "$7.500",
      },
      {
        id: 4,
        images: ["assets/prote-1.png"],
        title: "CITRATO POTASIO ONEFIT",
        description: "150GR de potasio en polvo.",
        price: "$7.500",
      },
    ],
  },
  {
    name: "SHAKER MEZCLADOR",
    products: [
      {
        id: 1,
        images: ["assets/prote-1.png"],
        title: "ARNOLD / I LOVE GYM",
        description: "Diseños variados de alta calidad.",
        price: "$16.000",
      },
      {
        id: 2,
        images: ["assets/prote-1.png"],
        title: "ENA SPORT",
        description: "Shaker clásico con tapa a rosca.",
        price: "$6.000",
      },
      {
        id: 3,
        images: ["assets/prote-1.png"],
        title: "GOT PROTEIN",
        description: "Consulta disponibilidad y precio actualizado.",
        price: "",
      },
    ],
  },
];
