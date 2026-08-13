import { useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { robotTheme } from "./robotTheme";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp = THREE.MathUtils.damp;
const easeBell = (p) => Math.sin(Math.min(Math.max(p, 0), 1) * Math.PI);
const easeOut = (p) => 1 - Math.pow(1 - clamp(p, 0, 1), 3);
const easeInOut = (p) => {
  const t = clamp(p, 0, 1);
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// Randomized micro-behaviors during idle — head/body accents
const BEHAVIORS = [
  { key: "lookAround", dur: 2.6, peaks: { headYaw: 0.45, headPitch: 0.1 } },
  { key: "headTilt", dur: 1.8, peaks: { headRoll: 0.12 } },
  { key: "corePulse", dur: 1.1, peaks: { core: 1.2 } },
  { key: "scanGlance", dur: 2.4, peaks: { headYaw: -0.5, headPitch: 0.08, core: 0.6 } },
  { key: "bodyShift", dur: 2.4, peaks: { bodyYaw: 0.12, bodyRoll: 0.04 } },
];

const useRobotController = (parts, motionRef) => {
  const { clock } = useThree();

  const state = useRef({
    behavior: null,
    gesture: null,
    hovered: false,
    bootDone: false,
    pointerX: 0,
    pointerY: 0,
    proximity: 0,
    scroll: 0,
    initialWaveDone: false,
  });

  // Current (damped) animation values
  const cur = useRef({
    headYaw: 0,
    headPitch: 0,
    headRoll: 0,
    bodyYaw: 0,
    bodyRoll: 0,
    core: 1.6,
    bob: 0,
    rootY: 0,
    alert: 0,
    // Arm animation targets
    rightShoulderZ: -0.15,
    rightShoulderX: 0,
    rightElbowX: 0,
    leftShoulderZ: 0.15,
    leftArmSwing: 0,
    breathe: 0,
  });

  const stRef = useRef(state.current);
  stRef.current = state.current;
  const scheduleNext = useRef(null);

  const startBehavior = (now) => {
    const b = BEHAVIORS[Math.floor(Math.random() * BEHAVIORS.length)];
    const jitter = 0.75 + Math.random() * 0.5;
    state.current.behavior = { startedAt: now, dur: b.dur * jitter, peaks: b.peaks };
  };

  const scheduleBehavior = useMemo(
    () =>
      (delay) => {
        clearTimeout(scheduleNext.current);
        scheduleNext.current = setTimeout(() => {
          const now = clock.getElapsedTime();
          startBehavior(now);
          scheduleBehavior(2200 + Math.random() * 3800);
        }, delay);
      },
    [clock]
  );

  // ── Gesture API ─────────────────────────────────────────────────
  const gesture = (type) => {
    if (motionRef.current && motionRef.current.reducedMotion) return;
    const now = clock.getElapsedTime();
    const t = type || (Math.random() > 0.5 ? "wave" : "nod");
    state.current.behavior = null;
    state.current.gesture = {
      type: t,
      startedAt: now,
      dur: t === "wave" ? 2.0 : 1.2,
    };
  };

  const hover = (value) => {
    state.current.hovered = value;
  };

  // ── Main animation loop ─────────────────────────────────────────
  useFrame(() => {
    const t = clock.getElapsedTime();
    const delta = Math.min(clock.getDelta(), 0.05);
    const s = stRef.current;
    const C = cur.current;

    const root = parts.root.current;
    const head = parts.head.current;
    const core = parts.core.current;
    const chestLight = parts.chestLight.current;
    const armRefs = parts.animRef.current; // { rightUpperArm, rightForearm, leftUpperArm }

    // Feed live values from the shared motion ref
    if (motionRef.current) {
      s.pointerX = motionRef.current.pointerX;
      s.pointerY = motionRef.current.pointerY;
      s.proximity = motionRef.current.proximity;
      s.scroll = motionRef.current.scroll;
    }

    const reduced = motionRef.current ? motionRef.current.reducedMotion : false;
    const damp = (key, target, rate = 4) => {
      C[key] = lerp(C[key], target, rate, delta);
    };

    // ── Boot-in entrance ─────────────────────────────────────────
    if (!s.bootDone) {
      const p = easeOut((t - 0.1) / 1.5);
      C.rootY = -1.3 + p * 1.3;
      if (p >= 1) {
        s.bootDone = true;
        if (!s.initialWaveDone) {
          s.initialWaveDone = true;
          setTimeout(() => gesture("wave"), 600);
        }
        scheduleBehavior(3000);
      }
      if (p < 1) {
        C.core = 1.6 + Math.sin(t * 32) * (t < 0.5 ? 0.8 : 0.25) * (1 - p);
      }
    }

    // ── Gesture processing ───────────────────────────────────────
    if (s.gesture) {
      const g = s.gesture;
      const progress = (t - g.startedAt) / g.dur;

      if (progress >= 1) {
        s.gesture = null;
        scheduleBehavior(1500);
      } else {
        if (g.type === "wave") {
          const raise = easeInOut(Math.min(progress * 3, 1));
          const lower = progress > 0.7 ? easeInOut((progress - 0.7) / 0.3) : 0;
          const wave = Math.sin(progress * Math.PI * 6) * 0.3;
          const armUp = raise * (1 - lower);

          C.rightShoulderZ = -0.15 + armUp * (-2.2 + 0.15);
          C.rightShoulderX = armUp * -0.3;
          C.rightElbowX = armUp * (-1.2 + wave);
        } else if (g.type === "nod") {
          const k = easeBell(progress);
          C.headPitch = -0.2 * k;
        }
      }
    }

    // ── Idle: floating bob + breathing ────────────────────────────
    C.bob = Math.sin(t * 1.05) * 0.04 + Math.sin(t * 2.3) * 0.01;
    C.breathe = Math.sin(t * 1.8) * 0.008;

    // ── Randomized behavior ──────────────────────────────────────
    if (s.behavior && !s.gesture) {
      const b = s.behavior;
      const p = (t - b.startedAt) / b.dur;
      if (p >= 1) {
        s.behavior = null;
        scheduleBehavior(2600 + Math.random() * 3800);
      } else {
        const k = easeBell(p);
        if (b.peaks.headYaw) C.headYaw = b.peaks.headYaw * k;
        if (b.peaks.headPitch) C.headPitch = b.peaks.headPitch * k;
        if (b.peaks.headRoll) C.headRoll = b.peaks.headRoll * k;
        if (b.peaks.bodyYaw) C.bodyYaw = b.peaks.bodyYaw * k;
        if (b.peaks.bodyRoll) C.bodyRoll = b.peaks.bodyRoll * k;
        if (b.peaks.core) C.core = 1.6 + b.peaks.core * k;
      }
    }

    // ── Alert level ──────────────────────────────────────────────
    const alertTarget = clamp(Math.max(s.hovered ? 1 : 0, s.proximity * 1.6), 0, 1);
    C.alert = lerp(C.alert, alertTarget, 3.5, delta);

    // ── Cursor look ──────────────────────────────────────────────
    const lookYaw = clamp(s.pointerX * 0.4, -0.5, 0.5);
    const lookPitch = clamp(-s.pointerY * 0.22, -0.28, 0.28);
    const bodyYawCursor = clamp(-s.pointerX * 0.08, -0.12, 0.12);
    const bodyRollCursor = clamp(s.pointerX * 0.05, -0.08, 0.08);

    const tHeadYaw = lookYaw + C.alert * 0.12 + s.scroll * 0.2;
    const tHeadPitch = lookPitch + C.alert * 0.06;
    const tHeadRoll = C.headRoll + s.proximity * 0.05;
    const tBodyYaw = bodyYawCursor + C.bodyYaw + s.scroll * 0.2;
    const tBodyRoll = bodyRollCursor + C.bodyRoll + C.alert * 0.02;

    // ── Damp ─────────────────────────────────────────────────────
    damp("headYaw", tHeadYaw);
    damp("headPitch", tHeadPitch);
    damp("headRoll", tHeadRoll, 3);
    damp("bodyYaw", tBodyYaw, 3);
    damp("bodyRoll", tBodyRoll, 3);

    // Arm rest targets (when not gesturing)
    if (!s.gesture) {
      damp("rightShoulderZ", -0.15, 3);
      damp("rightShoulderX", 0, 3);
      damp("rightElbowX", 0, 3);
    }

    // ── Apply to scene graph ─────────────────────────────────────
    if (reduced) {
      if (root) {
        root.position.y = 0;
        root.rotation.set(0, 0, 0);
      }
      if (head) head.rotation.set(0, 0, 0);
      return;
    }

    if (root) {
      root.position.y = C.bob + C.rootY;
      root.rotation.y = C.bodyYaw;
      root.rotation.x = C.alert * 0.02 + C.breathe;
      root.rotation.z = Math.sin(t * 0.4) * 0.015 + C.alert * 0.02;
    }

    if (head) {
      head.rotation.x = C.headPitch;
      head.rotation.y = C.headYaw;
      head.rotation.z = C.headRoll;
    }

    // Chest-core glow
    const coreBoost = s.gesture ? 1.5 : 0;
    if (core && core.material) {
      core.material.emissiveIntensity = C.core + C.alert * 0.5 + coreBoost + Math.sin(t * 2.2) * 0.15;
    }
    if (chestLight) {
      chestLight.intensity = robotTheme.chestLightIntensity + C.alert * 0.8 + coreBoost * 0.6 + Math.sin(t * 2.2) * 0.2;
    }

    // ── Animate arms directly via refs ───────────────────────────
    if (armRefs) {
      if (armRefs.rightUpperArm) {
        armRefs.rightUpperArm.rotation.z = C.rightShoulderZ;
        armRefs.rightUpperArm.rotation.x = C.rightShoulderX;
      }
      if (armRefs.rightForearm) {
        armRefs.rightForearm.rotation.x = C.rightElbowX;
      }
      if (armRefs.leftUpperArm) {
        armRefs.leftUpperArm.rotation.z = C.leftShoulderZ;
        armRefs.leftUpperArm.rotation.x = Math.sin(t * 0.7) * 0.03;
      }
    }
  });

  return { gesture, hover, startBehavior };
};

export default useRobotController;
