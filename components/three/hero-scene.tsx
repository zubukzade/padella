"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr } from "@react-three/drei";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";
import { Racket } from "./racket";

function Particles({ count = 520 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#C9FF3D"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyRings() {
  const g = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!g.current) return;
    g.current.rotation.z += delta * 0.15;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });
  return (
    <group ref={g}>
      {[3.4, 4.2, 5.1].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2.4 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.012, 8, 120]} />
          <meshStandardMaterial
            color="#C9FF3D"
            emissive="#C9FF3D"
            emissiveIntensity={1.6}
            transparent
            opacity={0.25 - i * 0.05}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ progress }: { progress?: MotionValue<number> }) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 17]} />

      <ambientLight intensity={0.45} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.4}
        penumbra={0.8}
        intensity={120}
        color="#ffffff"
        distance={30}
      />
      <pointLight position={[-5, -2, 4]} intensity={40} color="#C9FF3D" distance={20} />
      <pointLight position={[3, -4, -3]} intensity={25} color="#0F3D2E" distance={18} />

      <Racket progress={progress} />
      <Particles />
      <EnergyRings />

      {/* reflections without external HDR files */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2} position={[0, 4, 4]} scale={[8, 4, 1]} color="#ffffff" />
        <Lightformer intensity={1.4} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#C9FF3D" />
        <Lightformer intensity={1} position={[4, -2, 2]} scale={[4, 4, 1]} color="#0F3D2E" />
        <Lightformer intensity={1.6} position={[0, -4, -3]} scale={[10, 3, 1]} color="#1a3a2c" />
      </Environment>
    </>
  );
}

export default function HeroScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ touchAction: "pan-y" }}
    >
      <Rig progress={progress} />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
