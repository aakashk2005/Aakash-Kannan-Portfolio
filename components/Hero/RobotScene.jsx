import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

import RobotModel from "./RobotModel";
import RobotEffects from "./RobotEffects";
import useRobotController from "./RobotController";
import { robotTheme } from "./robotTheme";

const lerp = THREE.MathUtils.damp;

// ── Subtle camera parallax based on cursor + idle drift ─────────────
const CameraRig = ({ motionRef, compact }) => {
  const camera = useThree((s) => s.camera);

  useFrame(({ clock }, delta) => {
    const s = motionRef.current;
    if (!s) return;
    const t = clock.getElapsedTime();
    const nx = s.pointerX;
    const ny = s.pointerY;

    // Camera targets — adjusted for procedural robot proportions
    const tx = nx * 0.16 + Math.sin(t * 0.35) * 0.04;
    const ty = 0.2 + ny * 0.12 + Math.sin(t * 0.28) * 0.04;
    const tz = compact ? 4.0 : 3.2;

    camera.position.x = lerp(camera.position.x, tx, 3, delta);
    camera.position.y = lerp(camera.position.y, ty, 3, delta);
    camera.position.z = lerp(camera.position.z, tz, 3, delta);
    camera.lookAt(0, 0.15, 0);
  });

  return null;
};

// ── Pauses rendering when the hero leaves the viewport ──────────────
const VisibilityControl = ({ onVisible }) => {
  const gl = useThree((s) => s.gl);
  const setFrameloop = useThree((s) => s.setFrameloop);
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;
  const fired = useRef(false);

  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "pan-y";

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        setFrameloop(visible ? "always" : "never");
        if (visible && !fired.current) {
          fired.current = true;
          onVisibleRef.current?.();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [gl, setFrameloop]);

  return null;
};

// ── Robot wrapper: wires model refs to the controller + interaction ─
const RobotRig = ({ motionRef, compact }) => {
  const parts = {
    root: useRef(),
    head: useRef(),
    core: useRef(),
    chestLight: useRef(),
    animRef: useRef(null),
  };

  const api = useRobotController(parts, motionRef);
  const overCount = useRef(0);

  return (
    <group
      scale={compact ? 0.78 : 1}
      onClick={(e) => {
        e.stopPropagation();
        api.gesture();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        overCount.current++;
        api.hover(true);
      }}
      onPointerOut={() => {
        overCount.current = Math.max(0, overCount.current - 1);
        if (overCount.current === 0) api.hover(false);
      }}
    >
      <Suspense fallback={null}>
        <RobotModel parts={parts} />
      </Suspense>
    </group>
  );
};

// ── Cinematic lighting ──────────────────────────────────────────────
const Lights = () => (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight position={[4, 5, 6]} intensity={robotTheme.keyLightIntensity} color={robotTheme.keyLightColor} />
    <directionalLight position={[-5, 2.5, -5]} intensity={robotTheme.rimLightIntensity} color={robotTheme.rimLightColor} />
    <pointLight position={[3.4, 0.4, 3]} intensity={robotTheme.accentPointLightIntensity} distance={9} color={robotTheme.accentPointLightColor} />
    <pointLight position={[-3.2, 1.2, 2.6]} intensity={robotTheme.warmPointLightIntensity} distance={9} color={robotTheme.warmPointLightColor} />
    <pointLight position={[0, 2.4, -2]} intensity={robotTheme.coolPointLightIntensity} distance={7} color={robotTheme.coolPointLightColor} />
  </>
);

// Procedurally-built environment map for metallic reflections
const StudioEnv = () => (
  <Environment resolution={64} frames={1}>
    <Lightformer intensity={robotTheme.envKeyIntensity} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} color={robotTheme.envKeyColor} />
    <Lightformer intensity={robotTheme.envRimIntensity} position={[-5, 2, -1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color={robotTheme.envRimColor} />
    <Lightformer intensity={robotTheme.envWarmIntensity} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color={robotTheme.envWarmColor} />
    <Lightformer intensity={robotTheme.envCoolIntensity} position={[0, 1, -6]} scale={[10, 4, 1]} color={robotTheme.envCoolColor} />
  </Environment>
);

const RobotScene = ({ motionRef, onReady, compact }) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, compact ? 4.0 : 3.2], fov: compact ? 46 : 42, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Lights />
      <StudioEnv />
      <CameraRig motionRef={motionRef} compact={compact} />
      <VisibilityControl onVisible={onReady} />
      <RobotRig motionRef={motionRef} compact={compact} />
      <RobotEffects motionRef={motionRef} />
    </Canvas>
  );
};

export default RobotScene;
