import React from "react";
import ProductAnimation from "../hooks/ProductAnimation";

const Main: React.FC = () => {

    return (
        <main className="h-screen max-h-[800px] flex flex-col justify-center items-center text-white bg-stone-950 bg-[200%]">
            <div className="w-screen flex flex-col items-center px-6 text-center">
                <h1 className="text-4xl font-bold">LM FITNESS</h1>
                <div className="bg-red-600 h-0.5 w-60 ml-0.5 my-2"></div>
                <h2 className="text-[18px] leading-tight">LAS MEJORES MARCAS <br></br>EN UN SOLO LUGAR</h2>
                <button className="mt-5">VER MÁS</button>
            </div>

            <div>
                <ProductAnimation />
            </div>
        </main>
    );
}

export default Main;