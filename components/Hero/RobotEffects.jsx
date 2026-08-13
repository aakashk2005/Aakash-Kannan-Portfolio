import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { robotTheme } from "./robotTheme";

// Soft radial gradient sprite — reused by particles + glow discs.
const createGlowTexture = () => {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

const RobotEffects = ({ motionRef }) => {
  const ringHead = useRef();
  const particlesA = useRef();
  const particlesB = useRef();
  const glow = useMemo(() => createGlowTexture(), []);

  const reduced = motionRef.current ? motionRef.current.reducedMotion : false;

  // ── Holographic particle cloud (drifting, additive) ──────────────
  const particleGeom = useMemo(() => {
    const count = reduced ? 40 : 160;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const warm = new THREE.Color(robotTheme.particleWarm);
    const cool = new THREE.Color(robotTheme.particleCool);
    const dim = new THREE.Color(robotTheme.particleDim);
    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 2.4;
      const a = Math.random() * Math.PI * 2;
      const y = -0.8 + Math.random() * 2.4;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = -0.6 - Math.random() * 1.4 + Math.sin(a) * r * 0.3;
      sizes[i] = 0.02 + Math.random() * 0.05;
      const c = Math.random() > 0.5 ? warm : Math.random() > 0.5 ? cool : dim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [reduced]);

  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        map: glow,
        size: 0.09,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [glow]
  );

  const sparkCount = reduced ? 0 : 34;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (motionRef.current && motionRef.current.reducedMotion) return;
    if (ringHead.current) {
      ringHead.current.rotation.z = t * 0.5;
      ringHead.current.position.y = 0.5 + Math.sin(t * 0.9) * 0.04;
    }
    if (particlesA.current) {
      particlesA.current.rotation.y = t * 0.04;
      particlesA.current.position.y = Math.sin(t * 0.5) * 0.06;
    }
    if (particlesB.current) {
      particlesB.current.rotation.y = -t * 0.03;
      particlesB.current.position.y = Math.cos(t * 0.42) * 0.05;
    }
  });

  return (
    <group>
      {/* ── Holographic particles ───────────────────────────────── */}
      <points ref={particlesA} geometry={particleGeom} material={particleMat} position={[0, 0.3, -0.5]} />
      <points ref={particlesB} geometry={particleGeom} material={particleMat} position={[0.2, 0.3, -0.3]} rotation={[0, 0.5, 0]} />

      {/* ── Small sparks around the robot ───────────────────────── */}
      {!reduced && (
        <Sparkles
          count={sparkCount}
          scale={[2.6, 2.0, 2.6]}
          position={[0, 0.2, -0.2]}
          size={2.2}
          speed={0.35}
          opacity={0.55}
          color={robotTheme.sparkleColor}
        />
      )}

      {/* ── Ground glow disc ────────────────────────────────────── */}
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.3, 48]} />
        <meshBasicMaterial map={glow} color={robotTheme.groundGlowColor} transparent opacity={robotTheme.groundGlowOpacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.57, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 48]} />
        <meshBasicMaterial map={glow} color={robotTheme.groundGlow2Color} transparent opacity={robotTheme.groundGlow2Opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* ── Slow orbiting sci-fi ring ────────────────────────────── */}
      <group position={[0, 0.5, -0.8]}>
        <mesh rotation={[Math.PI / 2.1, 0.2, 0]}>
          <torusGeometry args={[0.78, 0.008, 8, 80]} />
          <meshBasicMaterial color={robotTheme.ringColor} transparent opacity={robotTheme.ringOpacity} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      {!reduced && (
        <group position={[0, 0.5, -0.8]}>
          <Sparkles count={10} scale={[1.6, 0.6, 1.6]} size={1.6} speed={0.2} opacity={0.4} color={robotTheme.ringSparkleColor} />
        </group>
      )}
    </group>
  );
};

export default RobotEffects;
