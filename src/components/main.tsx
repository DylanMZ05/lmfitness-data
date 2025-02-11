import React from "react";
import ProductAnimation from "./ProductAnimation";

const Main: React.FC = () => {

    return (
        <main className="h-screen max-h-[800px] flex flex-col justify-center items-center text-white bg-[url('public/assets/fondo-2.jpeg')] bg-cover bg-center md:flex-row md:max-w-screen md:justify-around">
            <div className="w-screen flex flex-col items-center px-6 text-center md:w-max md:text-start md:items-start">
                <img src="assets/logo.jpeg" alt="" className="w-45 mb-[25px] md:w-55 md:ml-10"/>
                <h1 className="text-[44px] font-bold md:text-[50px]">LM FITNESS</h1>
                <div className="bg-red-600 h-[3px] w-60 ml-0.5 mb-3 rounded-2xl md:h-[2px]"></div>
                <h2 className="text-[18px] font-[600] leading-tight md:text-[24px]">LLEVA TUS ENTRENAMIENTOS<br className="lg:hidden"></br>AL <br className="hidden lg:block xl:hidden"></br>SIGUIENTE NIVEL</h2>
                <button className="mt-5 bg-amber-50 text-black font-semibold pb-[5px] pt-[7px] px-6 rounded-4xl">VER PRODUCTOS</button>
            </div>

            <div>
                <ProductAnimation />
            </div>
        </main>
    );
}

export default Main;