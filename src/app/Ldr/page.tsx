'use client'
import React ,{useEffect} from "react";
import Comment from "@/app/Component/comment/page";
import Header from "@/app/Component/Header/page";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [])
  return (<><Header/>
    <div id="ldr" className="mt-2 p-8 lg:p-16">
      <img
        className="mx-auto border-black border-3 rounded-5"
        alt= "Image6" src="https://img95.lovepik.com/photo/40111/6108.gif_wh300.gif"
      />
      <h1 className="text-center font-bold text-black p-8">Light Detector</h1>
      <p>
        The LDR (Light Dependent Resistor) street light project involves
        creating a system that automatically switches street lights on and off
        based on the ambient light conditions. This can be achieved by using
        LDRs to sense the amount of light in the surrounding environment, and
        then using this information to control the street lights.{" "}
      </p>
      <h2 className="text-center font-bold text-black p-3">
        Materials Needed:
      </h2>
      <div>
        <li> LDR</li>
        <li> Resistor</li>
        <li>Transistor (e.g. BC547 or similar)</li>
        <li> LED (optional, for visual indication)</li>
        <li> Power supply (e.g. 9V battery or a DC power supply) </li>
        <li>Lamp (e.g. an incandescent bulb or an LED module) </li>
      </div>
      <h3 className="text-center font-bold text-black">Circuit Diagram</h3>
      <img
        alt= "Image1" src={"/img/LDR.png"}
        className="h-60  my-4 w-fit mx-auto drop-shadow-md rounded"
      />
      <h3 className="text-center font-bold text-black text-xl">
        Working Model
      </h3>
      <video
        className="lg:h-80 border-black drop-shadow-md rounded-lg border-3 mx-auto my-5"
        autoPlay
        muted
        controls>
        <source src={"/img/LDR.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full">
        <Comment />
      </div>
    </div></>
  );
};

export default Index;
