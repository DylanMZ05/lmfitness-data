import React from "react";

const AboutUs: React.FC = () => {
    return (
        <section id="about" className="h-max flex justify-center items-center gap-6 flex-wrap pt-[50px] pb-[100px] bg-neutral-900 md:bg-white">
            <div className="flex flex-col text-center w-screen max-w-[500px] items-center gap-2 bg-neutral-900 px-7 py-[50px] md:text-start md:max-w-max md:flex-row md:items-start md:rounded-2xl md:mx-5 md:mb-5 lg:max-w-[1300px] lg:justify-around">
                <div className="px-3 max-w-[500px] md:mr-5 md:mt-6">
                    <h3 className="text-[32px] text-center font-semibold text-white md:text-start">¿QUIENES SOMOS?</h3>
                    <div className="w-[50px] h-[2px] bg-red-500 mb-2 mx-auto rounded-2xl md:ml-1 md:mt-1"></div>
                    <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ratione, aliquam. Ducimus veritatis molestias aliquid in et ipsum dignissimos? 
                        Culpa veritatis expedita iure ea sequi maiores delectus voluptatibus distinctio ipsam vel!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Ratione, aliquam. Ducimus veritatis molestias aliquid in et ipsum dignissimos? 
                        Culpa veritatis expedita iure ea sequi maiores delectus voluptatibus distinctio ipsam vel!
                    </p>
                </div>
                <img src="assets/lauti.png" alt="" className="mt-3 w-[90vw] max-w-[450px] md:w-[40vw] md:my-auto"/>
            </div>
        </section>
    );
}

export default AboutUs;