import React from "react";
import Loop from "@/components/loop";
import HeroSection from "@/components/hero-section";
import { Footer } from "@/components/globals/footer/footer";
import { Teamates } from "@/components/teamates";
import { Features } from "@/components/feature";
import Test from "@/components/loop/test";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection />

      <div className="min-h-screen flex p-20 justify-center items-center ">
        <Features />
      </div>
      <div className="min-h-screen flex p-20 justify-center items-center ">
        <Loop />
      </div>
      <div className="min-h-screen flex justify-center items-center ">
        <Teamates />
      </div>
      <Test />
      <Footer />
    </div>
  );
};

export default page;
