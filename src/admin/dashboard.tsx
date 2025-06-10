// pages/Catalogo.tsx
import React from "react";
import CatalogoCard from "../pages/products/CatalogoCard";


const Dashboard: React.FC = () => {
  return (
    <>
      <div id="productos" className="pt-8 bg-white pb-8">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <h2 className="w-full mx-auto text-center text-4xl font-bold text-black">NUESTRO CÁTALOGO</h2>
        </div>
        <CatalogoCard />
      </div>
    </>
  );
};

export default Dashboard;