import { motion } from "framer-motion";

const ProductAnimation = () => {
    const images = [
        { 
            src: "assets/pre-1.png", 
            alt: "Pre-Workout", 
            direction: "right", 
            size: "w-max h-40", 
            scale: 1.05, 
            mdScale: 1.2, 
            position: "left-35 top-24 md:-left-5 md:-top-8",
            rotation: 15,
        },
        { 
            src: "assets/creatina-1.png", 
            alt: "Creatina", 
            direction: "left", 
            size: "w-max h-40", 
            scale: 1.0, 
            mdScale: 1.15, 
            position: "right-31 top-24 md:right-25 md:top-30 lg:right-32",
            rotation: -15,
        },
        { 
            src: "assets/prote-1.png", 
            alt: "Proteína", 
            direction: "bottom", 
            size: "w-max h-48", 
            scale: 1.3, 
            mdScale: 1.65,
            position: "top-15 md:top-20 md:left-25",
            rotation: 0,
        },
    ];

    return (
        <div className="relative flex justify-center items-center w-48 h-48 md:mr-15">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        x: image.direction === "left" ? -100 : image.direction === "right" ? 100 : 0,
                        y: image.direction === "bottom" ? 100 : 0,
                        scale: image.scale * 0.8,
                        rotate: 0, 
                    }}
                    animate={{ 
                        opacity: 1, 
                        x: 0, 
                        y: 0, 
                        scale: window.innerWidth >= 768 && image.mdScale ? image.mdScale : image.scale,
                        rotate: window.innerWidth >= 0 ? image.rotation : 0, 
                    }} 
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