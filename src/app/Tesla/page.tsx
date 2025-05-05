'use client';
import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import Comment from '@/app/Component/comment/page';
import Header from '@/app/Component/Header/page';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <section id="tes" className="py-3 overflow-hidden">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold text-black underline"
        >
          Objective: To Glow Bulb Wirelessly
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          An electrical resonant transformer circuit designed by inventor Nikola
          Tesla in 1891. A high current high-frequency transistor like 2N2222 is
          used to supply current through the primary coil. The whole setup is
          powered by a 9V battery. The positive end of the battery reaches the
          collector of Transistor through the primary coil, and the emitter is
          grounded. This means that whenever the transistor conducts, current flows
          through the primary coil. The LED diode and one end of the secondary coil
          are also connected to the base of the transistor to make the circuit oscillate,
          enabling the oscillating current to the primary coil, generating a carrying
          magnetic flux around it. This coil is wound around the secondary coil, and
          being much larger than the primary coil, it generates a very strong electric
          flux strong enough to light up CFL bulbs. This is used in Wireless Power Transmission.
        </motion.p>

        <motion.img
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src="/img/Inkedtesla-circuits.jpg"
          className="px-56 py-16"
          alt="Tesla Coil Circuit Diagram"
        />

        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold underline text-black"
        >
          WORKING MODEL
        </motion.h2>

        <div className="lg:flex gap-5 mx-16 my-12 justify-center">
          <motion.video
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-80 border-black drop-shadow-md mb-4 lg:mb-0 rounded-lg border-3"
            autoPlay
            muted
            controls
          >
            <source src='/img/tesla2.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
          <motion.video
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-80 border-3 rounded-lg drop-shadow-md border-black"
            autoPlay
            muted
            controls
          >
            <source src='/img/Tesla3.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </div>

        <div className="w-full">
          <Comment />
        </div>
      </section>
    </>
  );
};

export default Index;
