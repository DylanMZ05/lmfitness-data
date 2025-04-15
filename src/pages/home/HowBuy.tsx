import React from "react";
import {
  FaClipboardList,
  FaShoppingCart,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

const steps = [
  {
    text: "Comprá tus productos en tres simples pasos",
    icon: <FaClipboardList className="text-5xl text-white" />,
  },
  {
    text: "Paso 1: Selecciona tus productos",
    icon: <FaShoppingCart className="text-5xl text-white" />,
  },
  {
    text: "Paso 2: Agrega al carrito y procede al pago",
    icon: <FaCheckCircle className="text-5xl text-white" />,
  },
  {
    text: "Paso 3: Recibe tu pedido y disfruta",
    icon: <FaBoxOpen className="text-5xl text-white" />,
  },
];

const HowBuy: React.FC = () => {
  return (
    <section className="bg-neutral-300 my-5 py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neutral-500 mb-4">
              {step.icon}
            </div>
            <p className="text-sm font-medium text-gray-800">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowBuy;