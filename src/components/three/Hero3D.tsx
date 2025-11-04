"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Tube,
} from "@react-three/drei";
import { cubicBezier } from "motion";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
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

// New "Quantum Foam" background
const quantumFoamVertexShader = `
  uniform float uTime;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  
  // 3D Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;
    float noise = snoise(pos * uNoiseDensity + uTime * 0.2);
    pos += normal * noise * uNoiseStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const quantumFoamFragmentShader = `
  void main() {
    gl_FragColor = vec4(0.07, 0.01, 0.21, 0.15); // Corresponds to #120339
  }
`;

function QuantumFoam() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uNoiseDensity = 2.5;
  const uNoiseStrength = 0.25;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseDensity: { value: uNoiseDensity },
      uNoiseStrength: { value: uNoiseStrength },
    }),
    [uNoiseDensity, uNoiseStrength]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[7, 20]} />
      <shaderMaterial
        vertexShader={quantumFoamVertexShader}
        fragmentShader={quantumFoamFragmentShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
}

// Simple rotating circles on different planes
function RotatingCircle({
  color,
  planeIndex,
}: {
  color: THREE.ColorRepresentation;
  planeIndex: number;
}) {
  const curve = useMemo(() => {
    const points = [];
    // Different radius for each circle: small (4), bigger (5.5), biggest (7)
    const radius = planeIndex === 0 ? 4 : planeIndex === 1 ? 5.5 : 7;

    // Create a simple circle with 64 points
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
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
      // All circles rotate simultaneously on all axes for a cool gyroscope effect
      groupRef.current.rotation.x =
        time * 0.3 * (planeIndex === 0 ? 1 : planeIndex === 1 ? 0.7 : 0.5);
      groupRef.current.rotation.y =
        time * 0.25 * (planeIndex === 0 ? 0.5 : planeIndex === 1 ? 1 : 0.7);
      groupRef.current.rotation.z =
        time * 0.35 * (planeIndex === 0 ? 0.7 : planeIndex === 1 ? 0.5 : 1);
    }
  });

  // Set initial rotation to orient the circle on the correct plane
  const initialRotation = useMemo(() => {
    if (planeIndex === 0) {
      return [0, 0, 0]; // XY plane (horizontal)
    } else if (planeIndex === 1) {
      return [Math.PI / 2, 0, 0]; // XZ plane (vertical, front-back)
    } else {
      return [0, Math.PI / 2, 0]; // YZ plane (vertical, left-right)
    }
  }, [planeIndex]);

  return (
    <group ref={groupRef} rotation={initialRotation as any}>
      <Tube args={[curve, 128, 0.03, 16, true]}>
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={5}
          toneMapped={false}
        />
      </Tube>
    </group>
  );
}

function CrystalCluster() {
  const roughness = 0.02;
  const transmission = 1.0;
  const thickness = 2.5;

  const crystals = useMemo(() => {
    return new Array(25).fill(0).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.4 + 0.15,
    }));
  }, []);

  return (
    <Float speed={0.8} rotationIntensity={2.5} floatIntensity={2.5}>
      <group>
        {crystals.map((crystal, i) => (
          <mesh
            key={i}
            position={crystal.position}
            rotation={crystal.rotation}
            scale={crystal.scale}
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              roughness={roughness}
              transmission={transmission}
              thickness={thickness}
              ior={2.33}
              color="#A48FF5"
              emissive="#A48FF5"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.15) * 9;
    camera.position.z = Math.cos(t * 0.15) * 9;
    camera.position.y = 2.5 + Math.sin(t * 0.25) * 1.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0E1A2B]"
    >
      <div className="absolute inset-0 -z-10">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 2, 8], fov: 50 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#0E1A2B"]} />
          <fog attach="fog" args={["#0E1A2B", 8, 20]} />

          <CameraRig />

          <QuantumFoam />
          <CrystalCluster />

          {SPECTRUM_COLORS.map((color, i) => (
            <RotatingCircle key={i} color={color} planeIndex={i} />
          ))}

          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.6}
            scale={20}
            blur={1.5}
            far={10}
          />

          <Environment resolution={256}>
            <Lightformer
              form="ring"
              intensity={8}
              color="#A890FF"
              scale={10}
              target={[0, 0, 0]}
            />
          </Environment>
        </Canvas>
      </div>

      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,_rgba(168,144,255,0.28),_transparent_55%)]" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-[#0E1A2B]/15 via-[#0E1A2B]/55 to-[#0E1A2B]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center text-text-primary"
      >
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-white/80"
        >
          Optica Student Chapter
        </motion.span>
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl leading-[1.1] text-white drop-shadow-[0_20px_45px_rgba(10,6,36,0.45)] sm:text-6xl md:text-7xl"
        >
          Shaping the Future of Light
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-3xl text-base text-text-secondary sm:text-lg md:text-xl"
        >
          Explore the world of optics, photonics, and quantum technology with
          the BVP Optica student chapter.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-button bg-optica-purple px-8 py-3 font-accent text-base font-medium text-optica-black shadow-[0_24px_60px_-24px_rgba(168,144,255,0.85)] transition-colors duration-300 hover:bg-white hover:text-optica-black"
            >
              Join Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-button border border-white/30 px-8 py-3 font-accent text-base font-medium text-white transition-colors duration-300 hover:border-optica-purple hover:bg-white/10"
            >
              View Our Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
