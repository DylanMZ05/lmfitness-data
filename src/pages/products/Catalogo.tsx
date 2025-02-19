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
            <section className="mx-4 rounded-2xl flex justify-center">
                <div className="rounded-2xl max-w-4xl w-full">
                    <div className="bg-[url('/assets/fondo-2.jpeg')] flex flex-col items-center justify-center bg-cover bg-center max-w-4xl rounded-lg mb-2 border-3 border-neutral-800/40">
                        <div className="w-[100%] flex flex-col items-center justify-center bg-black/60 py-5">
                            <img src="public/assets/logo.jpeg" alt="" className="h-25"/>
                            <h3 className="text-center text-white font-semibold text-4xl">NUESTRAS OFERTAS</h3>
                            <div className="bg-red-600 h-[3px] w-60 mx-auto mb-3 mt-1 rounded-full"></div>
                        </div>
                    </div>
                    <div>

                        <Slider slides={slidesData} width="max-w-4xl"/>
                    </div>
                </div>
            </section>
            <section>
                <CatalogoCard />
            </section>
        </>
    );
}

export default Catalogo;