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
      <pointsMaterial color="black" size={0.1} sizeAttenuation />
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
    <section 
      className="relative h-screen w-full text-black flex items-center justify-center p-6"
      aria-label="Developer introduction"  // Add this
    >
      {/* Soft glowing overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-transparent to-yellow-200/10 blur-2xl" />
      </div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-[55] pointer-events-none">
        <Canvas camera={{ position: [2, 2, 3], fov: 50 }} style={{ width: "100vw", height: "100vh" }}>
          <ambientLight intensity={0.7} color="#090c0eff" />
          <directionalLight position={[3, 2, 1]} intensity={1.2} />
          <OrbitControls enableZoom={false} enabled={!isMobile} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <SnowParticles />
         
         {isMobile ? " ":<>  <AvatarModel num={11} /><AvatarModel num={12} position={[1.5, 0, 0]} scale={1} /></>}
        </Canvas>
      </div>

      {/* Text Section */}
      <motion.div
        role="region"  // Add this
        aria-label="Personal introduction"  // Add this
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
            text="Technophile"
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

        <motion.p 
          variants={fadeIn} 
          // Changed from text-pink-300 to text-gray-800 for better readability
          className="text-base md:text-lg text-gray-800 max-w-xl mx-auto md:mx-0 font-medium"
        >
          🚀 Crafting professional websites and web applications for clients worldwide. 
          Specializing in custom solutions using Next.js, React, and modern technologies 
          with responsive design and SEO optimization. Working remotely to transform 
          your digital vision into reality.
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
                color: "#150404ff",
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
        <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
          <motion.a
            href="/Project"
            whileHover={{
              scale: 1.09,
              backgroundColor: "#2563eb",
              color: "#fff",
              transition: { type: "spring", stiffness: 300 },
            }}
            // Enhanced button styling
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
          >
            <span>View Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
          </motion.a>
          <motion.a
            href="/Praveen CV_Web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.09,
              backgroundColor: "#eba0a0ff",
              color: "#1e293b",
              borderColor: "#2563eb",
              transition: { type: "spring", stiffness: 300 },
            }}
            // Enhanced button styling
            className="px-6 py-2.5 border-2 bg-black border-white text-white rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
          >
            <span>Download CV</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
    </svg>
          </motion.a>
          {/* New Hire Me button */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.09,
              backgroundColor: "#059669", 
              color: "#fff",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
          >
            <span>Hire Me</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
    </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
