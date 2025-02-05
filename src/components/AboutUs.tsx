import React from "react";

const AboutUs: React.FC = () => {
    return (
        <section className="h-max flex justify-center items-center gap-6 flex-wrap">
            <div className=" flex flex-col items-center gap-2 bg-neutral-900 px-7 py-[50px]">
                <div>
                    <h3 className="text-[32px] text-center font-semibold text-white">¿QUIENES SOMOS?</h3>
                    <div className="w-[50px] h-[2px] bg-red-500 mb-2 mx-auto rounded-2xl"></div>
                    <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ratione, aliquam. Ducimus veritatis molestias aliquid in et ipsum dignissimos? 
                        Culpa veritatis expedita iure ea sequi maiores delectus voluptatibus distinctio ipsam vel!
                    </p>
                </div>
                <img src="assets/lauti.png" alt="" className="mt-3"/>
            </div>
        </section>
    );
}

export default AboutUs;