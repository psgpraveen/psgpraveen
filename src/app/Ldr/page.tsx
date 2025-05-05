'use client';

import React, { useEffect } from 'react';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';
import Seo, { SeoProps } from '@/components/Seo';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const metadata: SeoProps = {
    title: 'LDR Street Light Project | Light Detector using LDR',
    description:
      'A smart light detector using LDR sensor to automatically control street lights based on ambient light. See circuit diagram, video model, and full explanation.',
    keywords: [
      'LDR Project',
      'Light Detector',
      'Street Light using LDR',
      'Electronics project',
      'LDR circuit',
      'Automatic street light',
      'LDR sensor project',
    ],
    openGraph: {
      title: 'LDR Street Light Project | Light Detector using LDR',
      description:
        'A smart light detector using LDR sensor to automatically control street lights based on ambient light.',
      url: 'https://psgpraveen.me/Ldr',
      type: 'article',
      images: [
        {
          url: 'https://psgpraveen.me/img/LDR.png',
          width: 800,
          height: 600,
          alt: 'LDR Circuit Diagram',
        },
      ],
    },
  };

  return (
    <>
      <Seo {...metadata} />
      <Header />
      <div id="ldr" className="mt-2 p-8 lg:p-16">
        <img
          className="mx-auto border-2 border-black rounded-md"
          alt="Animated LDR Preview"
          src="https://img95.lovepik.com/photo/40111/6108.gif_wh300.gif"
        />
        <h1 className="text-center font-bold text-black text-3xl p-8">
          Light Detector
        </h1>
        <p className="text-justify text-gray-800 leading-relaxed">
          The LDR (Light Dependent Resistor) street light project involves
          creating a system that automatically switches street lights on and
          off based on the ambient light conditions. This can be achieved by
          using LDRs to sense the amount of light in the surrounding
          environment, and then using this information to control the street
          lights.
        </p>

        <h2 className="text-center font-bold text-black text-2xl mt-8 mb-4">
          Materials Needed:
        </h2>
        <ul className="list-disc list-inside text-gray-800">
          <li>LDR</li>
          <li>Resistor</li>
          <li>Transistor (e.g. BC547 or similar)</li>
          <li>LED (optional, for visual indication)</li>
          <li>Power supply (e.g. 9V battery or a DC power supply)</li>
          <li>Lamp (e.g. an incandescent bulb or an LED module)</li>
        </ul>

        <h3 className="text-center font-bold text-black text-xl mt-10 mb-3">
          Circuit Diagram
        </h3>
        <img
          alt="LDR Circuit Diagram"
          src="/img/LDR.png"
          className="h-60 mx-auto my-4 drop-shadow-md rounded"
        />

        <h3 className="text-center font-bold text-black text-xl mt-8">
          Working Model
        </h3>
        <video
          className="w-full max-w-2xl mx-auto my-5 border-2 border-black rounded-lg drop-shadow-md"
          autoPlay
          muted
          controls
        >
          <source src="/img/LDR.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="w-full mt-8">
          <Comment />
        </div>
      </div>
    </>
  );
};

export default Index;
