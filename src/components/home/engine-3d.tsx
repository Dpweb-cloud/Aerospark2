"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// A single fan blade instance
function FanBlades({ count = 24, radius = 2, innerRadius = 0.5, speed = 1 }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * speed * 2; // spin the fan
    }
  });

  const blades = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return (
      <mesh
        key={i}
        position={[Math.cos(angle) * (radius / 2 + innerRadius / 2), Math.sin(angle) * (radius / 2 + innerRadius / 2), 0]}
        rotation={[0, 0.4, angle]} // slightly pitched
      >
        <boxGeometry args={[radius - innerRadius, 0.1, 0.4]} />
        <meshStandardMaterial color="#303030" metalness={0.8} roughness={0.2} />
      </mesh>
    );
  });

  return <group ref={groupRef}>{blades}</group>;
}

function JetEngine() {
  const engineRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (engineRef.current) {
      // Slow overall rotation for dramatic effect
      engineRef.current.rotation.y += delta * 0.1;
      engineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={engineRef} rotation={[0, -Math.PI / 4, 0]}>

      {/* Outer Casing */}
      <mesh position={[0, 0, -1]}>
        <cylinderGeometry args={[2.2, 2.0, 4, 64, 1, true]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Casing layer */}
      <mesh position={[0, 0, -1]}>
        <cylinderGeometry args={[2.1, 1.9, 4.05, 64, 1, true]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Front Spinner (Cone) */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Front Fan Stage */}
      <group position={[0, 0, 0.8]}>
        <FanBlades count={24} radius={2.0} innerRadius={0.5} speed={1.5} />
      </group>

      {/* Second Fan Stage */}
      <group position={[0, 0, 0.2]}>
        <FanBlades count={32} radius={1.9} innerRadius={0.4} speed={1.2} />
      </group>

      {/* Compressor Stages (smaller, deeper inside) */}
      <group position={[0, 0, -0.5]}>
        <FanBlades count={36} radius={1.5} innerRadius={0.3} speed={2.0} />
      </group>
      <group position={[0, 0, -1.0]}>
        <FanBlades count={36} radius={1.4} innerRadius={0.3} speed={2.0} />
      </group>
      <group position={[0, 0, -1.5]}>
        <FanBlades count={36} radius={1.3} innerRadius={0.3} speed={2.0} />
      </group>

      {/* Central Shaft */}
      <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 4, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Engine Exhaust / Glow */}
      <mesh position={[0, 0, -3]}>
        <cylinderGeometry args={[1.5, 1.8, 1, 32, 1, true]} />
        <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={2} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Exhaust particles */}
      <Sparkles count={50} scale={[2, 2, 2]} size={4} speed={0.4} opacity={0.2} color="#e11d48" position={[0, 0, -3.5]} />
    </group>
  );
}

export function Engine3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#38bdf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#e11d48" />
        <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" distance={5} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <JetEngine />
        </Float>

        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#0ea5e9" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      {/* Overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10 pointer-events-none" />
    </div>
  );
}
