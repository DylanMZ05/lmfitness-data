import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WspButton: React.FC = () => {
  const phoneNumber = "+54 9 2257 53-1656";
  const message = "¡Hola! Me gustaría hacer una consulta.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-45 bg-green-500 hover:bg-green-600 text-white rounded-full p-[10px] shadow-lg flex items-center justify-center transition-all border border-black/10"
      title="Enviar WhatsApp"
    >
      <FaWhatsapp size={36} />
    </a>
  );
};

export default WspButton;