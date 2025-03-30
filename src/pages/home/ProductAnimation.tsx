// ProductAnimation
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProductImage {
  src: string;
  alt: string;
  size: string;
  scale: number;
  mdScale: number;
  lgScale: number;
  position: string;
}

const images: ProductImage[] = [
  {
    src: "assets/pre-1.png",
    alt: "Pre-Workout",
    size: "w-max h-40",
    scale: 1,
    mdScale: 1.1,
    lgScale: 1.6,
    position: "left-35 top-24 md:left-[14vw] md:top-30 lg:top-40",
  },
  {
    src: "assets/creatina-1.png",
    alt: "Creatina",
    size: "w-max h-40",
    scale: 0.9,
    mdScale: 1,
    lgScale: 1.6,
    position: "right-31 top-24 md:right-[14vw] md:top-30 lg:top-40",
  },
  {
    src: "assets/prote-1.png",
    alt: "Proteína",
    size: "w-max h-48",
    scale: 1.25,
    mdScale: 1.3,
    lgScale: 2.1,
    position: "top-15 md:top-20 md:left-10 lg:top-30",
  },
];

const ProductAnimation: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getScale = (image: ProductImage) => {
    if (windowWidth >= 1024) return image.lgScale;
    if (windowWidth >= 768) return image.mdScale;
    return image.scale;
  };

  return (
    <div className="relative flex justify-center items-center w-48 h-48 md:mr-15">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: getScale(image) }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
          className={`absolute flex justify-center items-center ${image.size} ${image.position}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="object-contain w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductAnimation;