import React from "react";
import Slider from "../../components/Slider";
import CatalogoCard from "./CatalogoCard";

import { FaShoppingCart, FaCheckCircle, FaBoxOpen, FaClipboardList } from "react-icons/fa";

const slidesData = [
    {
        imageUrl: "",
        text: "OFERTA 1",
        icon: <FaClipboardList className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "OFERTA 2",
        icon: <FaShoppingCart className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "OFERTA 3",
        icon: <FaCheckCircle className="text-5xl text-white" />,
    },
    {
        imageUrl: "",
        text: "OFERTA 4",
        icon: <FaBoxOpen className="text-5xl text-white" />,
    },
];

const Catalogo: React.FC = () => {
    return (
        <>
            <div className="h-[100px]"></div>
            <section className="mx-4 bg-neutral-300 rounded-2xl">
                <div className="rounded-2xl">
                    <div className="bg-[url('/assets/fondo-2.jpeg')] flex flex-col items-center justify-center bg-cover bg-center max-w-4xl rounded-lg mb-2 border-3 border-neutral-800/40">
                        <img src="public/assets/logo.jpeg" alt="" className="h-25"/>
                        <p className="text-white text-4xl font-semibold">LM FITNESS</p>
                    </div>
                    <Slider slides={slidesData} width="max-w-4xl"/>
                </div>
            </section>
            <section className="mx-4">
                <CatalogoCard />
            </section>
        </>
    );
}

export default Catalogo;