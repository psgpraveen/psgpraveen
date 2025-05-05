"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three"; // ✅ Import the THREE namespace

// Snow Particles Component
function SnowParticles() {
  const count = 300;
  const mesh = useRef<THREE.Points>(null); 

  const positions = useRef<Float32Array>( 
    new Float32Array(
      Array.from({ length: count * 3 }, (_, i) =>
        i % 3 === 1 ? Math.random() * 20 + 5 : (Math.random() - 0.5) * 40
      )
    )
  );

  useFrame(() => {
    const posArray = positions.current;
    for (let i = 0; i < count; i++) {
      const y = i * 3 + 1;
      posArray[y] -= 0.03 + Math.random() * 0.015;

      if (posArray[y] < -5) {
        posArray[y] = Math.random() * 20 + 10;
        posArray[i * 3 + 0] = (Math.random() - 0.5) * 40;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
    }

    if (mesh.current) {
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh} frustumCulled={false}> {/* Corrected to <points> */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.current.length / 3}
          array={positions.current}
          itemSize={3}
          args={[positions.current, 3]}  
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.1} sizeAttenuation />
    </points>
  );
}

// Main Background Component
export default function GlobalCanvasBackground() {
  const cursor = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed w-full inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
        <ambientLight intensity={2} color="#ffffff" /> {/* 💡 Increased */}
        <directionalLight position={[3, 2, 1]} intensity={1.5} />
        <OrbitControls enableZoom={false} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <SnowParticles />
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh
            rotation={[cursor.current.y * Math.PI, cursor.current.x * Math.PI, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            position={[1.5, 0, 0]}
          >
            <sphereGeometry args={[1.0, 64, 64]} />
            <MeshDistortMaterial
              color={hovered ? "#facc15" : "#3b82f6"}
              distort={hovered ? 0.8 : 0.4}
              speed={hovered ? 3 : 1.5}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
