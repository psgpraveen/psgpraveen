"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import AvatarModel from "@/components/AvatarModel";
import * as THREE from "three";

// Hook to detect if device is mobile (phone)
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

type SplitTextProps = {
  text: string;
  animationKey?: string | number;
  fadeOut?: boolean;
  onComplete?: () => void;
  className?: string;
};

function SnowParticles() {
  const count = 300;
  const mesh = useRef<THREE.Points | null>(null);

  const positions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, (_, i) =>
        i % 3 === 1 ? Math.random() * 20 + 5 : (Math.random() - 0.5) * 40
      )
    )
  );

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3 + 1] -= 0.03 + Math.random() * 0.015;
      if (positions.current[i * 3 + 1] < -5) {
        positions.current[i * 3 + 1] = Math.random() * 20 + 10;
        positions.current[i * 3 + 0] = (Math.random() - 0.5) * 40;
        positions.current[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
    }
    if (mesh.current) {
      (mesh.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.1} sizeAttenuation />
    </points>
  );
}

function SplitText({ text, animationKey, fadeOut, onComplete, className }: SplitTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${animationKey}-${i}`}
          initial={{ opacity: fadeOut ? 1 : 0, y: fadeOut ? 0 : 20 }}
          animate={{ opacity: fadeOut ? 0 : 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: i * 0.07,
            duration: 0.3,
          }}
          onAnimationComplete={() => {
            if (i === text.length - 1 && onComplete) onComplete();
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function DestroyRecreateWord({
  text,
  className,
  delay = 1400,
  destroyTime = 900,
  recreateTime = 1800,
}: {
  text: string;
  className?: string;
  delay?: number;
  destroyTime?: number;
  recreateTime?: number;
}) {
  const [phase, setPhase] = useState<"original" | "destroy" | "recreate">("original");

  useEffect(() => {
    let destroyTimeout: NodeJS.Timeout, recreateTimeout: NodeJS.Timeout, resetTimeout: NodeJS.Timeout;

    if (phase === "original") {
      destroyTimeout = setTimeout(() => setPhase("destroy"), delay);
    } else if (phase === "destroy") {
      recreateTimeout = setTimeout(() => setPhase("recreate"), destroyTime);
    } else if (phase === "recreate") {
      resetTimeout = setTimeout(() => setPhase("original"), recreateTime);
    }

    return () => {
      clearTimeout(destroyTimeout);
      clearTimeout(recreateTimeout);
      clearTimeout(resetTimeout);
    };
  }, [phase, delay, destroyTime, recreateTime]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        {phase === "original" && (
          <SplitText text={text} animationKey="orig" fadeOut={false} key="orig" />
        )}
        {phase === "destroy" && (
          <SplitText text={text} animationKey="destroy" fadeOut={true} key="destroy" />
        )}
        {phase === "recreate" && (
          <SplitText text={text} animationKey="recreate" fadeOut={false} key="recreate" />
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return; // Do not attach event on mobile
console.log(cursor)
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setCursor({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section className="relative h-screen w-full text-white flex items-center justify-center p-6">
      {/* Soft glowing overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-transparent to-yellow-200/10 blur-2xl" />
      </div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-[55] pointer-events-none">
        <Canvas camera={{ position: [2, 2, 3], fov: 50 }} style={{ width: "100vw", height: "100vh" }}>
          <ambientLight intensity={0.7} color="#b6e0fe" />
          <directionalLight position={[3, 2, 1]} intensity={1.2} />
          <OrbitControls enableZoom={false} enabled={!isMobile} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <SnowParticles />
         
         {isMobile ? " ":<>  <AvatarModel num={11} /><AvatarModel num={12} position={[1.5, 0, 0]} scale={1} /></>}
        </Canvas>
      </div>

      {/* Text Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-60 relative flex-1 text-center md:text-left space-y-6"
      >
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold leading-tight">
          Hi, I&apos;m{" "}
          <span className="text-blue-500">
            <DestroyRecreateWord text="Praveen" />
          </span>{" "}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </motion.h1>

        <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-medium">
          <DestroyRecreateWord
            text="Full_Stack_Developer"
            className="inline-block"
            delay={1800}
            destroyTime={1100}
            recreateTime={2000}
          />{" "}
          |{" "}
          <DestroyRecreateWord
            text="Technophild"
            className="inline-block"
            delay={5000}
            destroyTime={2100}
            recreateTime={5000}
          />
          {" "}
          <DestroyRecreateWord
            text="Mechatronician"
            className="inline-block"
            delay={5000}
            destroyTime={2100}
            recreateTime={6000}
            />
            {" "}<br/>
          {" "}
          {" "}
          <DestroyRecreateWord
            text="Innovator"
            className="inline-block"
            delay={5000}
            destroyTime={2100}
            recreateTime={5000}
          />
          {" "}
        
          {" "}
          <DestroyRecreateWord
            text="Automator"
            className="inline-block"
            delay={5000}
            destroyTime={2100}
            recreateTime={6000}
          />
          {" "}
          {" "}
          <DestroyRecreateWord
            text="Techie"
            className="inline-block"
            delay={5000}
            destroyTime={2100}
            recreateTime={5000}
          />
          {" "}
          {" "}
        
         
        </motion.h2>

        <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
          🚀 Crafting intelligent systems, interactive web experiences, and seamless digital solutions. With a passion for modern tech and smart automation, I blend software with electronics to create meaningful impact.
        </motion.p>

        {/* Tech Stack Badges */}
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3 justify-center md:justify-start">
          {[
            "Next.js",
            "React",
            "Node.js",
            "MongoDB",
            "TypeScript",
            "IoT",
          ].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{
                scale: 1.13,
                backgroundColor: "#2563eb",
                color: "#fff",
                transition: { type: "spring", stiffness: 300 },
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium cursor-pointer transition"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={fadeIn} className="flex gap-4 justify-center md:justify-start mt-6">
          <motion.a
            href="/Project"
            whileHover={{
              scale: 1.09,
              backgroundColor: "#2563eb",
              color: "#fff",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="px-6 py-2 bg-blue-500 rounded font-semibold transition shadow"
          >
            View Projects
          </motion.a>
          <motion.a
            href="/Praveen CV_Web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.09,
              backgroundColor: "#fff",
              color: "#1e293b",
              borderColor: "#2563eb",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="px-6 py-2 border border-white rounded font-semibold transition shadow"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
