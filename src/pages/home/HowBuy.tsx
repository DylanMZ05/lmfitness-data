import React from "react";
import {
  FaClipboardList,
  FaShoppingCart,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

type Step = {
  id: string;
  text: string;
  icon: "clipboard" | "cart" | "check" | "box";
};

const steps: Step[] = [
  {
    id: "intro",
    text: "Comprá tus productos en tres simples pasos",
    icon: "clipboard",
  },
  {
    id: "step-1",
    text: "Paso 1: Selecciona tus productos",
    icon: "cart",
  },
  {
    id: "step-2",
    text: "Paso 2: Agrega al carrito y procede al pago",
    icon: "check",
  },
  {
    id: "step-3",
    text: "Paso 3: Recibe tu pedido y disfruta",
    icon: "box",
  },
];

const renderIcon = (icon: Step["icon"]) => {
  const common = "text-5xl text-black/80";
  switch (icon) {
    case "clipboard":
      return <FaClipboardList className={common} aria-hidden="true" />;
    case "cart":
      return <FaShoppingCart className={common} aria-hidden="true" />;
    case "check":
      return <FaCheckCircle className={common} aria-hidden="true" />;
    case "box":
      return <FaBoxOpen className={common} aria-hidden="true" />;
    default:
      return null;
  }
};

const HowBuy: React.FC = () => {
  return (
    <section
      className="bg-neutral-300 py-12 shadow-inner"
      aria-labelledby="howbuy-title"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 id="howbuy-title" className="text-2xl font-bold text-black/90 mb-8">
          Cómo comprar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const pasoMatch = step.text.match(/^(Paso \d+:)(.*)/);
            const isIntro = step.text.includes("tres simples pasos");

            return (
              <article
                key={step.id}
                className="flex flex-col items-center"
                aria-label={step.text}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neutral-500/20 mb-4 border-2 border-black/80">
                  {renderIcon(step.icon)}
                </div>

                <h3 className="text-sm text-black/80 leading-snug">
                  {pasoMatch ? (
                    <>
                      <span className="font-bold">{pasoMatch[1]}</span>
                      {pasoMatch[2]}
                    </>
                  ) : isIntro ? (
                    <>
                      {step.text.replace("tres simples pasos", "")}
                      <span className="font-bold"> tres simples pasos</span>
                    </>
                  ) : (
                    step.text
                  )}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowBuy;
