import React from "react";
import ProductAnimation from "./ProductAnimation";

const Main: React.FC = () => {

    return (
        <main className="h-screen max-h-[800px] flex flex-col justify-center items-center text-white bg-stone-950 bg-[200%]">
            <div className="w-screen flex flex-col items-center px-6 text-center">
                <img src="assets/logo.jpeg" alt="" className="w-45 mb-[25px]"/>
                <h1 className="text-[44px] font-bold">LM FITNESS</h1>
                <div className="bg-red-600 h-[3px] w-60 ml-0.5 mb-3 rounded-2xl"></div>
                <h2 className="text-[18px] leading-tight">LAS MEJORES MARCAS <br></br>EN UN SOLO LUGAR</h2>
                <button className="mt-5 bg-amber-50 text-black font-semibold pb-[5px] pt-[7px] px-6 rounded-4xl">VER PRODUCTOS</button>
            </div>

            <div>
                <ProductAnimation />
            </div>
        </main>
    );
}

export default Main;