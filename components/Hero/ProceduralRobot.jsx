import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { robotTheme } from "./robotTheme";

// ── Shared materials (created once) ─────────────────────────────────
const createMaterials = () => {
  const body = new THREE.MeshStandardMaterial({
    color: new THREE.Color(robotTheme.primary),
    metalness: 0.72,
    roughness: 0.28,
    envMapIntensity: 1.4,
  });

  const joint = new THREE.MeshStandardMaterial({
    color: new THREE.Color(robotTheme.secondary),
    metalness: 0.85,
    roughness: 0.18,
    envMapIntensity: 1.6,
  });

  const dark = new THREE.MeshStandardMaterial({
    color: new THREE.Color(robotTheme.dark),
    metalness: 0.6,
    roughness: 0.5,
  });

  const glow = new THREE.MeshStandardMaterial({
    color: new THREE.Color(robotTheme.accent),
    emissive: new THREE.Color(robotTheme.accent),
    emissiveIntensity: 2.5,
    metalness: 0.3,
    roughness: 0.2,
    toneMapped: false,
  });

  const eyeGlow = new THREE.MeshStandardMaterial({
    color: new THREE.Color(robotTheme.accent),
    emissive: new THREE.Color(robotTheme.accentWarm),
    emissiveIntensity: 3.5,
    metalness: 0.2,
    roughness: 0.1,
    toneMapped: false,
  });

  const visor = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#050608"),
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2.0,
  });

  return { body, joint, dark, glow, eyeGlow, visor };
};

// ── Reusable geometries (module-level singletons) ───────────────────
const geom = {
  headMain: new THREE.SphereGeometry(0.28, 32, 24),
  headVisor: new THREE.SphereGeometry(0.26, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45),
  eye: new THREE.BoxGeometry(0.055, 0.03, 0.02),
  mouth: new THREE.BoxGeometry(0.08, 0.012, 0.015),
  antenna: new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8),
  antennaTip: new THREE.SphereGeometry(0.025, 12, 12),
  earDisc: new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16),

  torso: new THREE.CylinderGeometry(0.2, 0.17, 0.36, 16, 1, false),
  chest: new THREE.SphereGeometry(0.042, 16, 16),
  neck: new THREE.CylinderGeometry(0.055, 0.065, 0.08, 12),
  waist: new THREE.CylinderGeometry(0.14, 0.16, 0.1, 12),

  shoulderJoint: new THREE.SphereGeometry(0.06, 16, 16),
  elbowJoint: new THREE.SphereGeometry(0.04, 12, 12),
  hipJoint: new THREE.SphereGeometry(0.05, 12, 12),
  kneeJoint: new THREE.SphereGeometry(0.038, 12, 12),
  ankleJoint: new THREE.SphereGeometry(0.03, 10, 10),

  upperArm: new THREE.CylinderGeometry(0.038, 0.032, 0.22, 10),
  forearm: new THREE.CylinderGeometry(0.032, 0.028, 0.2, 10),
  hand: new THREE.SphereGeometry(0.04, 12, 12),
  finger: new THREE.CylinderGeometry(0.008, 0.006, 0.04, 6),

  upperLeg: new THREE.CylinderGeometry(0.05, 0.04, 0.26, 10),
  lowerLeg: new THREE.CylinderGeometry(0.04, 0.035, 0.24, 10),
  foot: new THREE.BoxGeometry(0.08, 0.035, 0.12),
};

// ── The robot component ─────────────────────────────────────────────
const ProceduralRobot = ({ parts }) => {
  const mats = useMemo(() => createMaterials(), []);

  // Refs for parts the controller needs to animate
  const headRef = useRef();
  const chestCoreRef = useRef();
  const rightUpperArmRef = useRef();
  const rightForearmRef = useRef();
  const leftUpperArmRef = useRef();

  // Wire refs to the parts object once on mount
  useEffect(() => {
    if (headRef.current) parts.head.current = headRef.current;
    if (chestCoreRef.current) parts.core.current = chestCoreRef.current;
    // Store arm refs in parts.animRef for the controller to access
    parts.animRef.current = {
      rightUpperArm: rightUpperArmRef.current,
      rightForearm: rightForearmRef.current,
      leftUpperArm: leftUpperArmRef.current,
    };
    return () => {
      parts.head.current = null;
      parts.core.current = null;
      parts.animRef.current = null;
    };
  }, [parts]);

  return (
    <group>
      {/* ── TORSO ────────────────────────────────────────────── */}
      <group>
        {/* Main torso cylinder */}
        <mesh geometry={geom.torso} material={mats.body} castShadow>
          {/* Chest core glow */}
          <mesh geometry={geom.chest} material={mats.glow} ref={chestCoreRef} position={[0, 0.04, 0.17]}>
            <pointLight
              ref={parts.chestLight}
              color={robotTheme.chestLightColor}
              intensity={robotTheme.chestLightIntensity}
              distance={2.5}
              position={[0, 0, 0.05]}
            />
          </mesh>

          {/* Chest panel accent lines */}
          <mesh position={[0.08, 0.08, 0.185]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.06, 0.005, 0.005]} />
            <primitive object={mats.glow} attach="material" />
          </mesh>
          <mesh position={[-0.08, 0.08, 0.185]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.06, 0.005, 0.005]} />
            <primitive object={mats.glow} attach="material" />
          </mesh>
        </mesh>

        {/* Waist connector */}
        <mesh geometry={geom.waist} material={mats.joint} position={[0, -0.23, 0]} />

        {/* ── NECK ─────────────────────────────────────────── */}
        <mesh geometry={geom.neck} material={mats.joint} position={[0, 0.22, 0]} />

        {/* ── HEAD ─────────────────────────────────────────── */}
        <group ref={headRef} position={[0, 0.46, 0]}>
          {/* Main head sphere */}
          <mesh geometry={geom.headMain} material={mats.body} castShadow />

          {/* Visor / face plate */}
          <group rotation={[0.25, 0, 0]}>
            <mesh geometry={geom.headVisor} material={mats.visor} position={[0, 0.02, 0.01]} scale={[1, 0.75, 0.95]} />
          </group>

          {/* Eyes */}
          <mesh geometry={geom.eye} material={mats.eyeGlow} position={[-0.075, 0.03, 0.24]} />
          <mesh geometry={geom.eye} material={mats.eyeGlow} position={[0.075, 0.03, 0.24]} />

          {/* Mouth — small accent bar */}
          <mesh geometry={geom.mouth} material={mats.glow} position={[0, -0.06, 0.255]} />

          {/* Antenna */}
          <group position={[0, 0.28, -0.02]}>
            <mesh geometry={geom.antenna} material={mats.joint} />
            <mesh geometry={geom.antennaTip} material={mats.glow} position={[0, 0.08, 0]} />
          </group>

          {/* Ear disc accents */}
          <mesh geometry={geom.earDisc} material={mats.joint} position={[-0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} />
          <mesh geometry={geom.earDisc} material={mats.joint} position={[0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} />
        </group>

        {/* ── LEFT ARM ────────────────────────────────────── */}
        <group position={[-0.26, 0.1, 0]}>
          <mesh geometry={geom.shoulderJoint} material={mats.joint} />
          <group ref={leftUpperArmRef} rotation={[0, 0, 0.15]}>
            <mesh geometry={geom.upperArm} material={mats.body} position={[0, -0.12, 0]} castShadow />
            <mesh geometry={geom.elbowJoint} material={mats.joint} position={[0, -0.24, 0]} />
            <group position={[0, -0.24, 0]}>
              <mesh geometry={geom.forearm} material={mats.body} position={[0, -0.1, 0]} castShadow />
              <mesh geometry={geom.hand} material={mats.joint} position={[0, -0.22, 0]} />
            </group>
          </group>
        </group>

        {/* ── RIGHT ARM ────────────────────────────────────── */}
        <group position={[0.26, 0.1, 0]}>
          <mesh geometry={geom.shoulderJoint} material={mats.joint} />
          <group ref={rightUpperArmRef} rotation={[0, 0, -0.15]}>
            <mesh geometry={geom.upperArm} material={mats.body} position={[0, -0.12, 0]} castShadow />
            <mesh geometry={geom.elbowJoint} material={mats.joint} position={[0, -0.24, 0]} />
            <group ref={rightForearmRef} position={[0, -0.24, 0]}>
              <mesh geometry={geom.forearm} material={mats.body} position={[0, -0.1, 0]} castShadow />
              <mesh geometry={geom.hand} material={mats.joint} position={[0, -0.22, 0]} />
              {/* Fingers */}
              <mesh geometry={geom.finger} material={mats.body} position={[-0.02, -0.25, 0.01]} rotation={[0.15, 0, 0.1]} />
              <mesh geometry={geom.finger} material={mats.body} position={[0, -0.26, 0.01]} rotation={[0.1, 0, 0]} />
              <mesh geometry={geom.finger} material={mats.body} position={[0.02, -0.25, 0.01]} rotation={[0.15, 0, -0.1]} />
            </group>
          </group>
        </group>

        {/* ── LEFT LEG ────────────────────────────────────── */}
        <group position={[-0.09, -0.33, 0]}>
          <mesh geometry={geom.hipJoint} material={mats.joint} />
          <mesh geometry={geom.upperLeg} material={mats.body} position={[0, -0.15, 0]} castShadow />
          <mesh geometry={geom.kneeJoint} material={mats.joint} position={[0, -0.3, 0]} />
          <mesh geometry={geom.lowerLeg} material={mats.body} position={[0, -0.42, 0]} castShadow />
          <mesh geometry={geom.ankleJoint} material={mats.joint} position={[0, -0.56, 0]} />
          <mesh geometry={geom.foot} material={mats.body} position={[0, -0.58, 0.025]} castShadow />
        </group>

        {/* ── RIGHT LEG ───────────────────────────────────── */}
        <group position={[0.09, -0.33, 0]}>
          <mesh geometry={geom.hipJoint} material={mats.joint} />
          <mesh geometry={geom.upperLeg} material={mats.body} position={[0, -0.15, 0]} castShadow />
          <mesh geometry={geom.kneeJoint} material={mats.joint} position={[0, -0.3, 0]} />
          <mesh geometry={geom.lowerLeg} material={mats.body} position={[0, -0.42, 0]} castShadow />
          <mesh geometry={geom.ankleJoint} material={mats.joint} position={[0, -0.56, 0]} />
          <mesh geometry={geom.foot} material={mats.body} position={[0, -0.58, 0.025]} castShadow />
        </group>
      </group>
    </group>
  );
};

export default ProceduralRobot;
