import React from "react";
import ProductAnimation from "../hooks/ProductAnimation";

const Main: React.FC = () => {

    return (
        <main className="h-screen flex flex-col justify-center items-center text-white bg-stone-950 bg-[200%] gap-10">
            <div>
                <h1 className="text-4xl font-bold">LM FITNESS</h1>
                <h2>LAS MEJORES MARCAS EN UN SOLO LUGAR</h2>
                <div className="bg-red-600 h-0.5 w-50"></div>
                <p>Lleva tu entrenamiento al siguiente nivel</p>
                <button>VER MÁS</button>
            </div>

            <div>
                <ProductAnimation />
            </div>
        </main>
    );
}

export default Main;