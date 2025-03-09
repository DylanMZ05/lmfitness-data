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
        images: [
          "assets/prote-1.png",
          "assets/isowhey.jpg"
        ],
        title: "STAR NUTRITION WHEY ISOLATE",
        description: "Proteína de alta calidad.",
        price: "$32,000",
      },
      {
        id: 2,
        images: [
          "assets/prote-1.png",
          "assets/isowhey.jpg"
        ],
        title: "STAR NUTRITION PLATINUM DOYPACK",
        description: "Proteína avanzada.",
        price: "$57,000",
      },
      {
        id: 3,
        images: [
          "assets/prote-1.png",
          "assets/isowhey.jpg"
        ],
        title: "ENA TRUE MADE",
        description: "Ideal para recuperación.",
        price: "$36,300",
      },
      {
        id: 4,
        images: [
          "assets/prote-1.png",
          "assets/isowhey.jpg"
        ],
        title: "PROTEINA WHEY ADVANCED XTRENGHT",
        description: "Para entrenamientos intensos.",
        price: "$29,800",
      },
    ],
  },
  {
    name: "CREATINA",
    products: [
      {
        id: 5,
        images: [
          "assets/creatina-1.png",
          "assets/isowhey.jpg"
        ],
        title: "CREATINA STAR NUTRITION POTE",
        description: "Mejora el rendimiento.",
        price: "$27,700",
      },
      {
        id: 6,
        images: [
          "assets/creatina-1.png",
          "assets/isowhey.jpg"
        ],
        title: "MAXI GAIN GENTECH",
        description: "Gana masa muscular.",
        price: "$28,200",
      },
      {
        id: 7,
        images: [
          "assets/creatina-1.png",
          "assets/isowhey.jpg"
        ],
        title: "NITROGAIN XTRENGHT",
        description: "Fuerza y resistencia.",
        price: "$27,500",
      },
      {
        id: 8,
        images: [
          "assets/creatina-1.png",
          "assets/isowhey.jpg"
        ],
        title: "CREATINA STAR NUTRITION DOYPACK",
        description: "Alta pureza.",
        price: "$20,000",
      },
    ],
  },
];
