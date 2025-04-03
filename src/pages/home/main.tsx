// Main
import { motion } from "framer-motion";
import React from "react";


import { Link } from "react-router-dom";

const Main: React.FC = () => {

    return (
        <main id="inicio" className="h-screen min-h-[750px] max-h-[800px] py-[50px] flex flex-col justify-center items-center text-white bg-[url('/assets/fondo-2.jpeg')] bg-cover bg-center md:flex-row md:max-w-screen">
            <div className="w-screen flex flex-col items-center text-center max-w-[500px] md:mr-10 md:-ml-10 md:w-max md:text-start md:items-start lg:mr-10 lg:px-6">
                <img src="assets/logo.jpeg" alt="" className="w-45 mb-[25px] md:w-55 md:ml-10"/>
                <h1 className="text-[44px] font-bold md:text-[50px]">LM FITNESS</h1>
                <div className="bg-red-600 h-[3px] w-60 ml-0.5 mb-3 rounded-2xl md:h-[2px]"></div>
                <h2 className="text-[18px] font-[600] leading-tight md:text-[24px]">LLEVA TUS ENTRENAMIENTOS<br className="lg:hidden"></br>AL <br className="hidden lg:block xl:hidden"></br>SIGUIENTE NIVEL</h2>
                <Link
                    to="/catalogo"
                        className="mt-5 bg-amber-50 text-black font-semibold pb-[5px] pt-[7px] px-6 rounded-4xl inline-block text-center"
                    >
                    VER PRODUCTOS
                </Link>
            </div>

            <div className="md:ml-5 lg:ml-10">
                <div className="relative w-64 h-64 mx-auto">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .6, delay: 0.2 }}
                        src="assets/inicio/creatina.webp"
                        alt="Pre-Workout"
                        className="absolute left-25 top-45 transform -translate-y-1/2 z-10 scale-60 lg:left-27 lg:scale-70"
                    />

                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .6, delay: 0.5 }}
                        src="assets/inicio/prote.webp"
                        alt="Proteína"
                        className="absolute left-1/2 top-43 transform -translate-x-1/2 -translate-y-1/2 z-20 scale-70 lg:top-40 lg:scale-74"
                    />

                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .6, delay: 0.3 }}
                        src="assets/inicio/pre-entreno.webp"
                        alt="Creatina"
                        className="absolute right-25 top-45 transform -translate-y-1/2 z-10 scale-64 lg:right-30 lg:scale-73"
                    />
                </div>
            </div>
        </main>
    );
}

export default Main;