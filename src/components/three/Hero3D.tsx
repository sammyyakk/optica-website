"use client";

import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Tube } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { cubicBezier } from "motion";
import { motion } from "motion/react";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const SPECTRUM_COLORS = ["#A48FF5", "#6F4CFF", "#E91E63"] as const;

const heroEase = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: heroEase,
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: heroEase },
  },
};

// Performance detection
function detectPerformanceTier(): "low" | "medium" | "high" {
  if (typeof window === "undefined") return "medium";

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return "low";

  const debugInfo = (gl as WebGLRenderingContext).getExtension(
    "WEBGL_debug_renderer_info",
  );
  const renderer = debugInfo
    ? (gl as WebGLRenderingContext)
        .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        .toLowerCase()
    : "";

  // Only mark as low-end for very old mobile GPUs or very low core count
  const isLowEnd =
    renderer.includes("mali-4") ||
    renderer.includes("adreno 3") ||
    navigator.hardwareConcurrency <= 2;

  // Check for high-end indicators
  const isHighEnd =
    (renderer.includes("nvidia") ||
      renderer.includes("radeon") ||
      renderer.includes("apple m")) &&
    navigator.hardwareConcurrency >= 8 &&
    window.innerWidth >= 1024;

  if (isLowEnd) return "low";
  if (isHighEnd) return "high";
  return "medium";
}

// Simplified vertex shader with enhanced noise computation
const quantumFoamVertexShader = `
  uniform float uTime;
  uniform float uNoiseStrength;
  
  // Improved noise function for better visual effect
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }
  
  // Layered noise for more organic look
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec3 pos = position;
    // More dramatic noise with multiple layers
    float n1 = fbm(pos * 2.0 + uTime * 0.4);
    float n2 = noise(pos * 4.0 - uTime * 0.6) * 0.5;
    float combinedNoise = n1 + n2;
    pos += normal * combinedNoise * uNoiseStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const quantumFoamFragmentShader = `
  uniform float uTime;
  
  void main() {
    // Subtle color variation based on position for more visual interest
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
    gl_FragColor = vec4(0.45 * pulse, 0.25, 0.85, 0.35);
  }
`;

type PerformanceTier = "low" | "medium" | "high";

function QuantumFoam({
  performanceTier = "medium",
}: {
  performanceTier?: PerformanceTier;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Increased detail for better visuals
  const detail =
    performanceTier === "low" ? 12 : performanceTier === "medium" ? 20 : 28;
  const uNoiseStrength =
    performanceTier === "low" ? 0.4 : performanceTier === "medium" ? 0.6 : 0.8;
  const sphereSize = 7;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseStrength: { value: uNoiseStrength },
    }),
    [uNoiseStrength],
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[sphereSize, detail]} />
      <shaderMaterial
        vertexShader={quantumFoamVertexShader}
        fragmentShader={quantumFoamFragmentShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
}

function RotatingCircle({
  color,
  planeIndex,
  performanceTier = "medium",
}: {
  color: THREE.ColorRepresentation;
  planeIndex: number;
  performanceTier?: PerformanceTier;
}) {
  const curve = useMemo(() => {
    const points = [];
    const radius = planeIndex === 0 ? 4.5 : planeIndex === 1 ? 6 : 7.5;
    const segments = 64; // Enough for smooth circles

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, 0));
    }

    const path = new THREE.CatmullRomCurve3(points);
    path.closed = true;
    return path;
  }, [planeIndex]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.elapsedTime;
      groupRef.current.rotation.x =
        time * 0.45 * (planeIndex === 0 ? 1.2 : planeIndex === 1 ? 0.8 : 0.6);
      groupRef.current.rotation.y =
        time * 0.35 * (planeIndex === 0 ? 0.7 : planeIndex === 1 ? 1.3 : 0.9);
      groupRef.current.rotation.z =
        time * 0.5 * (planeIndex === 0 ? 0.9 : planeIndex === 1 ? 0.6 : 1.2);
    }
  });

  const initialRotation = useMemo<[number, number, number]>(() => {
    if (planeIndex === 0) {
      return [0, 0, 0];
    } else if (planeIndex === 1) {
      return [Math.PI / 2, 0, 0];
    } else {
      return [0, Math.PI / 2, 0];
    }
  }, [planeIndex]);

  return (
    <group ref={groupRef} rotation={initialRotation}>
      <Tube args={[curve, 128, 0.05, 12, true]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </Tube>
    </group>
  );
}

function ParticleSwarm({
  performanceTier = "medium",
}: {
  performanceTier?: PerformanceTier;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  // Increased particle counts for more visual density
  const particleCount =
    performanceTier === "low"
      ? 400
      : performanceTier === "medium"
        ? 1200
        : 2500;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i3] = (Math.random() - 0.5) * 0.08;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.08;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.08;
    }

    return { positions, velocities };
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = pos[i3];
      const y = pos[i3 + 1];
      const z = pos[i3 + 2];

      // Gravity towards center with pulsing - but repel when too close
      const centerDist = Math.sqrt(x * x + y * y + z * z);
      const gravityStrength = Math.sin(time * 0.5) * 0.02 + 0.01;

      // Slow down particles when near center
      const slowdownFactor = centerDist < 3 ? 0.85 : 1.0;

      // Smooth transition between repulsion and attraction
      // Use a blend factor that smoothly transitions from 0 to 1
      const blendStart = 1.5;
      const blendEnd = 3.0;
      const blendFactor = Math.min(
        1,
        Math.max(0, (centerDist - blendStart) / (blendEnd - blendStart)),
      );

      // Repulsion force (strong when close)
      const repulsionForce = (1 - blendFactor) * 0.05;

      // Attraction force (strong when far)
      const attractionForce = blendFactor * gravityStrength;

      // Apply blended forces
      const forceDirection = centerDist > 0 ? 1 / (centerDist + 0.1) : 0;
      velocities[i3] +=
        x * forceDirection * repulsionForce -
        (x / (centerDist + 1)) * attractionForce;
      velocities[i3 + 1] +=
        y * forceDirection * repulsionForce -
        (y / (centerDist + 1)) * attractionForce;
      velocities[i3 + 2] +=
        z * forceDirection * repulsionForce -
        (z / (centerDist + 1)) * attractionForce;

      // Damping (stronger damping when near center)
      const dampingFactor = 0.98 * slowdownFactor;
      velocities[i3] *= dampingFactor;
      velocities[i3 + 1] *= dampingFactor;
      velocities[i3 + 2] *= dampingFactor;

      // Update position
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Boundary conditions
      if (Math.abs(pos[i3]) > 15) velocities[i3] *= -0.5;
      if (Math.abs(pos[i3 + 1]) > 15) velocities[i3 + 1] *= -0.5;
      if (Math.abs(pos[i3 + 2]) > 15) velocities[i3 + 2] *= -0.5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          args={[positions, 3]}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation={true}
        color="#A48FF5"
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function CrystalCluster({
  performanceTier = "medium",
}: {
  performanceTier?: PerformanceTier;
}) {
  // Crystal count
  const crystalCount =
    performanceTier === "low" ? 8 : performanceTier === "medium" ? 14 : 20;

  const crystals = useMemo(() => {
    const items: {
      position: THREE.Vector3;
      rotation: THREE.Euler;
      scale: number;
      colorIndex: number;
    }[] = [];

    for (let index = 0; index < crystalCount; index++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ),
        scale: Math.random() * 0.15 + 0.08,
        colorIndex: index,
      });
    }

    return items;
  }, [crystalCount]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = clock.elapsedTime * 0.08;
    }
  });

  // Skip Float on low performance - it adds overhead
  const content = (
    <group ref={groupRef}>
      {crystals.map((crystal) => (
        <mesh
          key={`crystal-${crystal.colorIndex}`}
          position={crystal.position}
          rotation={crystal.rotation}
          scale={crystal.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={SPECTRUM_COLORS[crystal.colorIndex % SPECTRUM_COLORS.length]}
            emissive={
              SPECTRUM_COLORS[crystal.colorIndex % SPECTRUM_COLORS.length]
            }
            emissiveIntensity={2}
            toneMapped={false}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );

  if (performanceTier === "low") {
    return content;
  }

  return (
    <Float speed={0.8} rotationIntensity={1.5} floatIntensity={1.5}>
      {content}
    </Float>
  );
}

function DynamicLights({
  performanceTier = "medium",
}: {
  performanceTier?: PerformanceTier;
}) {
  // Simplified lighting for lower tiers
  if (performanceTier === "low") {
    return (
      <>
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#A48FF5" />
        <ambientLight intensity={0.4} />
      </>
    );
  }

  return (
    <>
      <pointLight
        position={[8, 8, 8]}
        intensity={1.5}
        color="#A48FF5"
        decay={2}
      />
      <pointLight
        position={[-8, -8, 8]}
        intensity={1}
        color="#E91E63"
        decay={2}
      />
      {performanceTier === "high" && (
        <pointLight
          position={[0, 10, -8]}
          intensity={0.8}
          color="#6F4CFF"
          decay={2}
        />
      )}
      <ambientLight intensity={0.3} />
    </>
  );
}

function CameraRig({
  performanceTier = "medium",
}: {
  performanceTier?: PerformanceTier;
}) {
  const frameCountRef = useRef(0);

  useFrame(({ camera, clock }) => {
    // Camera updates every frame for smooth movement
    frameCountRef.current++;

    const t = clock.getElapsedTime();

    // Start outside the quantum foam and slowly move in
    // Initial radius is 18 (outside), target radius is ~7 (inside)
    const initialRadius = 18;
    const targetRadius = 7;
    const transitionDuration = 8; // seconds to spend mostly outside

    // Smooth easing function for the transition (ease-out)
    const transitionProgress = Math.min(t / transitionDuration, 1);
    const easedProgress = 1 - Math.pow(1 - transitionProgress, 3); // cubic ease-out

    // Interpolate between initial and target radius
    const baseRadius =
      initialRadius - (initialRadius - targetRadius) * easedProgress;

    // Add the oscillation after transition, but damped during transition
    const oscillationStrength = easedProgress * 1.5;
    const radius = baseRadius + Math.sin(t * 0.28) * oscillationStrength;

    camera.position.x = Math.sin(t * 0.21) * radius;
    camera.position.z = Math.cos(t * 0.168) * radius;
    camera.position.y = 2 + Math.sin(t * 0.252) * 1;

    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  const [performanceTier, setPerformanceTier] =
    useState<PerformanceTier>("medium");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tier = detectPerformanceTier();
    setPerformanceTier(tier);
    setIsReady(true);
  }, []);

  const dpr =
    performanceTier === "low" ? 0.75 : performanceTier === "medium" ? 1 : 1.5;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-10">
        {isReady && (
          <Canvas
            shadows={false}
            dpr={dpr}
            camera={{
              position: [0, 2, 8],
              fov: performanceTier === "low" ? 65 : 55,
            }}
            gl={{
              antialias: false,
              powerPreference:
                performanceTier === "low" ? "low-power" : "default",
              alpha: false,
              stencil: false,
              depth: true,
              failIfMajorPerformanceCaveat: false,
            }}
            frameloop="always"
          >
            <color attach="background" args={["#050510"]} />
            <fog attach="fog" args={["#0a0515", 8, 25]} />

            <CameraRig performanceTier={performanceTier} />
            <DynamicLights performanceTier={performanceTier} />

            <QuantumFoam performanceTier={performanceTier} />
            <ParticleSwarm performanceTier={performanceTier} />

            {/* Crystals on all tiers */}
            <CrystalCluster performanceTier={performanceTier} />

            {/* All 3 rings on all tiers */}
            {SPECTRUM_COLORS.map((color, i) => (
              <RotatingCircle
                key={i}
                color={color}
                planeIndex={i}
                performanceTier={performanceTier}
              />
            ))}

            {/* Environment on medium and high */}
            {performanceTier !== "low" && (
              <Environment resolution={128}>
                <Lightformer
                  form="ring"
                  intensity={8}
                  color="#A890FF"
                  scale={10}
                  target={[0, 0, 0]}
                />
                <Lightformer
                  form="ring"
                  intensity={5}
                  color="#E91E63"
                  scale={12}
                  position={[0, -5, 0]}
                  target={[0, 0, 0]}
                />
              </Environment>
            )}

            {/* Bloom on ALL tiers for glow effect */}
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                intensity={performanceTier === "high" ? 3 : 2.5}
                levels={performanceTier === "high" ? 7 : 5}
                mipmapBlur
              />
            </EffectComposer>
          </Canvas>
        )}
      </div>

      {/* Glow overlay - visible on all devices */}
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,_rgba(168,144,255,0.35),_transparent_60%)]" />
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_center,_rgba(111,76,255,0.15),_transparent_50%)] sm:hidden" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-[#0E1A2B]/10 via-[#0E1A2B]/50 to-[#0E1A2B]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto flex w-full max-w-[min(92vw,1100px)] 2xl:max-w-[1000px] flex-col items-center gap-4 px-6 text-center text-white"
      >
        <motion.span
          variants={itemVariants}
          className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-400/50 bg-purple-500/20 px-4 sm:px-6 py-1.5 text-[0.55rem] sm:text-xs lg:text-sm uppercase tracking-[0.25em] text-purple-100 shadow-[0_0_15px_rgba(168,144,255,0.6),0_0_30px_rgba(168,144,255,0.5),0_0_50px_rgba(168,144,255,0.3),inset_0_0_25px_rgba(168,144,255,0.2)] backdrop-blur-sm"
          style={{
            textShadow:
              "0 0 8px rgba(168,144,255,1), 0 0 16px rgba(168,144,255,0.8), 0 0 32px rgba(168,144,255,0.6), 0 0 50px rgba(168,144,255,0.4)",
          }}
        >
          Formerly Optical Society of America
        </motion.span>
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[min(88vw,960px)] 2xl:max-w-[840px] px-2"
        >
          {/* Blurred glass effect behind logo that fades into background */}
          <div
            className="absolute -inset-x-32 -inset-y-20 rounded-[2rem]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 40%, transparent 75%)",
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />
          <Image
            src="/logo_dark.png"
            alt="BVP Optica Student Chapter"
            width={1200}
            height={400}
            priority
            className="relative mx-auto h-auto w-full max-w-[min(88vw,880px)] 2xl:max-w-[800px] object-contain"
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 900px"
          />
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="mt-4 sm:mt-6 max-w-3xl text-balance text-sm sm:text-base md:text-lg lg:text-xl text-white/90"
        >
          Explore the world of optics, photonics, and quantum technology with
          the BVP Optica student chapter.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-6 sm:mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-[min(90vw,620px)] px-2"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/join"
              className="inline-flex min-w-[140px] sm:min-w-[180px] items-center justify-center rounded-button bg-gradient-to-r from-purple-600 to-pink-600 px-5 sm:px-8 py-2.5 sm:py-3 font-accent text-sm sm:text-base font-semibold text-white shadow-[0_24px_60px_-24px_rgba(168,144,255,0.95)] transition-all duration-300 hover:shadow-[0_40px_80px_-24px_rgba(168,144,255,1.2)] hover:from-purple-500 hover:to-pink-500"
            >
              Join Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/events"
              className="inline-flex min-w-[140px] sm:min-w-[180px] items-center justify-center rounded-button border border-white/30 px-5 sm:px-8 py-2.5 sm:py-3 font-accent text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-pink-500 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(168,144,255,0.5)]"
            >
              View Our Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
