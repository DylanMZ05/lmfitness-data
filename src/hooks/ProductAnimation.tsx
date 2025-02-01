import { motion } from "framer-motion";

const ProductAnimation = () => {
    const images = [
        { src: "/assets/pre-1.png", alt: "Pre-Workout", direction: "right", size: "w-max h-40", scale: 1.05, position: "left-34 top-20" },
        { src: "/assets/creatina-1.png", alt: "Creatina", direction: "left", size: "w-max h-40", scale: 1.0, position: "right-30 top-20" },
        { src: "/assets/prote-1.png", alt: "Proteína", direction: "bottom", size: "w-max h-48", scale: 1.3, position: "top-15" }, // Cambiado el `direction`
    ];

    return (
        <div className="relative flex justify-center items-center w-48 h-48">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        x: image.direction === "left" ? -100 : image.direction === "right" ? 100 : 0,
                        y: image.direction === "bottom" ? 100 : 0,
                        scale: image.scale * 0.8,
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: image.scale }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className={`absolute flex justify-center items-center ${image.size} ${image.position}`}
                >
                    <img src={image.src} alt={image.alt} className="object-contain w-full h-full" />
                </motion.div>
            ))}
        </div>
    );
};

export default ProductAnimation;