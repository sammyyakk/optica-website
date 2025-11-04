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
import { useControls } from "leva";

const SPECTRUM_COLORS = ["#4330FF", "#A890FF", "#6F4CFF", "#E91E63"] as const;

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
    gl_FragColor = vec4(0.5, 0.4, 1.0, 0.15);
  }
`;

function QuantumFoam() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { uNoiseDensity, uNoiseStrength } = useControls("Quantum Foam", {
    uNoiseDensity: { value: 1.5, min: 0.1, max: 5 },
    uNoiseStrength: { value: 0.1, min: 0.01, max: 1 },
  });

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
      <icosahedronGeometry args={[8, 20]} />
      <shaderMaterial
        vertexShader={quantumFoamVertexShader}
        fragmentShader={quantumFoamFragmentShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
}

// New "Entangled Ribbons"
function EntangledRibbon({
  color,
  seed,
}: {
  color: THREE.ColorRepresentation;
  seed: number;
}) {
  const curve = useMemo(() => {
    const points = [];
    const path = new THREE.CatmullRomCurve3();
    const speed = seed * 0.1 + 0.2;
    const amplitude = seed * 1.5 + 2;
    const frequency = seed * 0.2 + 0.1;

    for (let i = 0; i < 100; i++) {
      const t = i / 99;
      const x = Math.sin(t * Math.PI * 2 + seed) * amplitude;
      const y = Math.cos(t * Math.PI * 2 + seed) * amplitude;
      const z = Math.sin(t * Math.PI * 4 * frequency) * (amplitude / 2);
      points.push(new THREE.Vector3(x, y, z));
    }
    path.points = points;
    path.curveType = "catmullrom";
    path.closed = true;
    return path;
  }, [seed]);

  const tubeRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (tubeRef.current) {
      tubeRef.current.rotation.x = clock.elapsedTime * (seed * 0.05);
      tubeRef.current.rotation.y = clock.elapsedTime * (seed * 0.08);
    }
  });

  return (
    <Tube ref={tubeRef} args={[curve, 128, 0.01, 16, false]}>
      <meshStandardMaterial emissive={color} emissiveIntensity={4} toneMapped={false} />
    </Tube>
  );
}

function CrystalCluster() {
  const { roughness, transmission, thickness } = useControls("Crystals", {
    roughness: { value: 0.05, min: 0, max: 0.2 },
    transmission: { value: 1.0, min: 0.8, max: 1.0 },
    thickness: { value: 1.5, min: 0.5, max: 5 },
  });

  const crystals = useMemo(() => {
    return new Array(20).fill(0).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <Float speed={0.5} rotationIntensity={2} floatIntensity={2}>
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
              ior={1.7}
              color="#A890FF"
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
    camera.position.x = Math.sin(t * 0.1) * 8;
    camera.position.z = Math.cos(t * 0.1) * 8;
    camera.position.y = 2 + Math.sin(t * 0.2) * 1;
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
            <EntangledRibbon key={i} color={color} seed={i + 1} />
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
          Explore the world of optics, photonics, and quantum technology with the BVP Optica student chapter.
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
