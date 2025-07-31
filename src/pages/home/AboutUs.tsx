import React from "react";
import ShippingMarquee from "../../components/ShippingMarquee";

const AboutUs: React.FC = () => {
  return (
    <>
      <ShippingMarquee />
      <section
        id="sobre-nosotros"
        aria-labelledby="aboutus-title"
        className="flex justify-center items-center flex-wrap bg-neutral-900 lg:bg-white"
      >
        <div className="flex flex-col w-screen max-w-[500px] items-center gap-2 bg-neutral-900 px-7 py-[50px] md:text-start md:max-w-max lg:flex-row md:items-stretch md:rounded-2xl md:mx-5 md:mb-5 lg:mt-5 lg:max-w-[1300px] lg:justify-around">
          {/* Texto */}
          <div className="px-3 max-w-[500px] mb-5 lg:mr-5 lg:mt-6 lg:flex-1">
            <h2
              id="aboutus-title"
              className="text-[32px] text-start font-semibold text-white"
            >
              ¿QUIÉNES SOMOS?
            </h2>
            <div className="w-[323px] h-[2px] bg-red-500 mb-3 rounded-2xl mt-1"></div>

            <p className="text-white leading-snug">
              En <strong>LMFITNESS</strong>, nos especializamos en la venta de
              suplementos y accesorios deportivos, destacándonos por la{" "}
              <strong>calidad, transparencia y el asesoramiento personalizado</strong>.
              <br />
              <br />
              Brindamos información clara y fundamentada, basada en experiencia y
              estudio, para que cada cliente encuentre el producto ideal según sus
              objetivos.
              <br />
              <br />
              Con base en San Bernardo del Tuyú y envíos a todo el país, ofrecemos
              productos de calidad a precios competitivos, priorizando siempre la{" "}
              <strong>excelencia en el servicio</strong>.
              <br />
              <br />
              En <strong>LMFITNESS</strong>, más que una tienda, somos tu aliado
              hacia un mejor rendimiento y bienestar.
            </p>
          </div>

          {/* Imagen */}
          <div className="w-[90vw] max-w-[450px] lg:w-[40vw] md:h-auto lg:flex-1">
            <img
              src="assets/lauti.webp"
              alt="Equipo de LM Fitness San Bernardo del Tuyú"
              width={550}
              height={550}
              className="w-full aspect-[3/3] h-full object-cover rounded-xl md:aspect-auto lg:max-h-110"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
