import React from "react";
import { Truck } from "lucide-react";

const ShippingMarquee: React.FC = () => {
  const items = (
    <>
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center text-black font-semibold text-xl whitespace-nowrap mr-6">
            <Truck size={20} className="mr-2" />
            <span>Envíos a todo el país</span>
          </div>
          <span className="text-black text-2xl mr-6 -mt-[2px]">||</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden w-full bg-neutral-200 py-3">
      <div className="relative flex w-max animate-marquee">
        {items}
        {items /* Duplicado para loop perfecto */}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ShippingMarquee;