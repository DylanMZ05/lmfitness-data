import { useEffect, useState } from "react";

interface ParallaxBannerProps {
    imageUrl: string;
    text: string;
}

const ParallaxBanner: React.FC<ParallaxBannerProps> = ({ imageUrl, text }) => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative h-64 w-full overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    transform: `translateY(${offsetY * 0.5}px)`,
                }}
            />
            <div className="relative flex items-center justify-center h-full bg-black/50">
                <h1 className="text-white text-2xl font-bold text-center px-4">
                    {text}
                </h1>
            </div>
        </div>
    );
};

export default ParallaxBanner;