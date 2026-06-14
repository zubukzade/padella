"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";

/** Build a padel-racket "teardrop" head outline. */
function makeTeardrop(scale = 1): THREE.Shape {
  const w = 1.25 * scale;
  const top = 1.7 * scale;
  const bottom = -1.75 * scale;
  const s = new THREE.Shape();
  s.moveTo(0, top);
  s.bezierCurveTo(w * 1.12, top, w * 1.4, 0.2 * scale, w * 0.55, -0.9 * scale);
  s.bezierCurveTo(w * 0.32, -1.3 * scale, 0.2 * scale, bottom, 0, bottom);
  s.bezierCurveTo(-0.2 * scale, bottom, -w * 0.32, -1.3 * scale, -w * 0.55, -0.9 * scale);
  s.bezierCurveTo(-w * 1.4, 0.2 * scale, -w * 1.12, top, 0, top);
  return s;
}

export function Racket({ progress }: { progress?: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const rimGroup = useRef<THREE.Group>(null);
  const faceGroup = useRef<THREE.Group>(null);
  const handleGroup = useRef<THREE.Group>(null);

  // ---- geometry (memoized) ----
  const { faceGeo, rimGeo, holeGeo, holeMatrices, handleGeo, gripGeo, neckGeo } =
    useMemo(() => {
      const shape = makeTeardrop(1);

      const faceGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.07,
        bevelSize: 0.07,
        bevelSegments: 4,
        curveSegments: 64,
      });
      faceGeo.center();

      // neon rim as a tube following the outline
      const pts2 = shape.getPoints(160);
      const pts3 = pts2.map((p) => new THREE.Vector3(p.x, p.y, 0));
      const curve = new THREE.CatmullRomCurve3(pts3, true, "catmullrom", 0);
      const rimGeo = new THREE.TubeGeometry(curve, 240, 0.075, 12, true);

      // perforations — instanced cylinders inside the head ellipse
      const holeGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.4, 12);
      holeGeo.rotateX(Math.PI / 2);
      const holeMatrices: THREE.Matrix4[] = [];
      const dummy = new THREE.Object3D();
      const step = 0.33;
      for (let x = -1.2; x <= 1.2; x += step) {
        for (let y = -1.2; y <= 1.7; y += step) {
          const inEllipse = (x / 1.05) ** 2 + ((y - 0.25) / 1.35) ** 2 < 0.92;
          if (!inEllipse) continue;
          dummy.position.set(x, y, 0);
          dummy.updateMatrix();
          holeMatrices.push(dummy.matrix.clone());
        }
      }

      // handle + grip + neck bridge
      const handleGeo = new THREE.CylinderGeometry(0.21, 0.26, 1.5, 24);
      const gripGeo = new THREE.TorusGeometry(0.235, 0.03, 8, 24);
      const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.5, 20);

      return { faceGeo, rimGeo, holeGeo, holeMatrices, handleGeo, gripGeo, neckGeo };
    }, []);

  // ---- materials ----
  const carbon = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0c0d0c"),
        metalness: 0.55,
        roughness: 0.38,
        clearcoat: 0.7,
        clearcoatRoughness: 0.28,
        reflectivity: 0.6,
      }),
    []
  );
  const neon = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9FF3D"),
        emissive: new THREE.Color("#C9FF3D"),
        emissiveIntensity: 2.4,
        roughness: 0.3,
        metalness: 0.1,
        toneMapped: false,
      }),
    []
  );
  const holeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#050505"),
        roughness: 0.95,
        metalness: 0.1,
      }),
    []
  );
  const handleMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0a1611"),
        metalness: 0.4,
        roughness: 0.55,
        clearcoat: 0.4,
      }),
    []
  );

  // place instanced holes once
  const instRef = useRef<THREE.InstancedMesh>(null);
  const holesReady = useRef(false);

  useFrame((state, delta) => {
    if (instRef.current && !holesReady.current) {
      holeMatrices.forEach((m, i) => instRef.current!.setMatrixAt(i, m));
      instRef.current.instanceMatrix.needsUpdate = true;
      holesReady.current = true;
    }

    const t = state.clock.elapsedTime;
    const p = progress ? progress.get() : 0;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (root.current) {
      // continuous slow spin + cursor-driven parallax
      const targetY = px * 0.6 + t * 0.12;
      const targetX = -py * 0.4 + 0.12;
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetY, 0.06);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetX, 0.06);
      // gentle float + recede on scroll
      root.current.position.y = Math.sin(t * 0.8) * 0.08 - p * 0.6;
      root.current.position.z = -p * 2.2;
      const s = 1 - p * 0.15;
      root.current.scale.setScalar(s);
    }

    // exploded-view separation driven by scroll progress
    if (rimGroup.current) rimGroup.current.position.z = THREE.MathUtils.lerp(rimGroup.current.position.z, p * 0.9, 0.1);
    if (faceGroup.current) faceGroup.current.position.z = THREE.MathUtils.lerp(faceGroup.current.position.z, -p * 0.5, 0.1);
    if (handleGroup.current) handleGroup.current.position.y = THREE.MathUtils.lerp(handleGroup.current.position.y, -2.55 - p * 0.8, 0.1);
  });

  return (
    <group ref={root} rotation={[0.12, -0.3, 0]}>
      {/* face plate + perforations */}
      <group ref={faceGroup}>
        <mesh geometry={faceGeo} material={carbon} castShadow receiveShadow />
        <instancedMesh
          ref={instRef}
          args={[holeGeo, holeMat, holeMatrices.length]}
        />
        {/* subtle brand stripe */}
        <mesh position={[0, 0.4, 0.16]}>
          <planeGeometry args={[0.5, 0.06]} />
          <meshStandardMaterial color="#C9FF3D" emissive="#C9FF3D" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </group>

      {/* glowing rim */}
      <group ref={rimGroup}>
        <mesh geometry={rimGeo} material={neon} />
      </group>

      {/* neck bridge */}
      <mesh geometry={neckGeo} material={handleMat} position={[0, -1.95, 0]} />

      {/* handle + grips */}
      <group ref={handleGroup} position={[0, -2.55, 0]}>
        <mesh geometry={handleGeo} material={handleMat} />
        {[-0.45, -0.2, 0.05, 0.3, 0.55].map((y, i) => (
          <mesh key={i} geometry={gripGeo} material={neon} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.9} />
        ))}
        {/* end cap */}
        <mesh position={[0, -0.78, 0]}>
          <cylinderGeometry args={[0.3, 0.28, 0.12, 24]} />
          <meshStandardMaterial color="#C9FF3D" emissive="#C9FF3D" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
