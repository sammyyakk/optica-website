"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Tube,
} from "@react-three/drei";
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

const chromaticAberrationVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float distortion = sin(pos.x * 3.0 + uTime) * 0.05 + 
                      sin(pos.y * 2.0 + uTime * 0.7) * 0.05;
    
    float mouseInfluence = distance(uv, uMouse) * 0.1;
    pos += normal * (distortion - mouseInfluence);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const chromaticAberrationFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    float r = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
    float g = sin(vUv.y * 10.0 + uTime * 0.8) * 0.5 + 0.5;
    float b = sin((vUv.x + vUv.y) * 10.0 + uTime * 1.2) * 0.5 + 0.5;
    
    gl_FragColor = vec4(r * 0.8, g * 0.6, b * 1.0, 0.3);
  }
`;

const quantumFoamVertexShader = `
  uniform float uTime;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  
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
    float noise = snoise(pos * uNoiseDensity + uTime * 0.35);
    float noise2 = snoise(pos * uNoiseDensity * 0.5 + uTime * 0.15);
    pos += normal * (noise * uNoiseStrength + noise2 * uNoiseStrength * 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const quantumFoamFragmentShader = `
  void main() {
    gl_FragColor = vec4(0.12, 0.04, 0.35, 0.12);
  }
`;

function QuantumFoam() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uNoiseDensity = 3.5;
  const uNoiseStrength = 0.4;

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
      <icosahedronGeometry args={[8, 24]} />
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
}: {
  color: THREE.ColorRepresentation;
  planeIndex: number;
}) {
  const curve = useMemo(() => {
    const points = [];
    const radius = planeIndex === 0 ? 4.5 : planeIndex === 1 ? 6 : 7.5;

    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
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

  const initialRotation = useMemo(() => {
    if (planeIndex === 0) {
      return [0, 0, 0];
    } else if (planeIndex === 1) {
      return [Math.PI / 2, 0, 0];
    } else {
      return [0, Math.PI / 2, 0];
    }
  }, [planeIndex]);

  return (
    <group ref={groupRef} rotation={initialRotation as any}>
      <Tube args={[curve, 256, 0.05, 24, true]}>
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={8}
          toneMapped={false}
        />
      </Tube>
    </group>
  );
}

function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;

      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    return { positions, velocities };
  }, []);

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

      // Gravity towards center with pulsing
      const centerDist = Math.sqrt(x * x + y * y + z * z);
      const gravityStrength = Math.sin(time * 0.5) * 0.02 + 0.01;

      velocities[i3] -= (x / (centerDist + 1)) * gravityStrength;
      velocities[i3 + 1] -= (y / (centerDist + 1)) * gravityStrength;
      velocities[i3 + 2] -= (z / (centerDist + 1)) * gravityStrength;

      // Damping
      velocities[i3] *= 0.98;
      velocities[i3 + 1] *= 0.98;
      velocities[i3 + 2] *= 0.98;

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
        opacity={0.8}
      />
    </points>
  );
}

function CrystalCluster() {
  const crystals = useMemo(() => {
    return new Array(35).fill(0).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.2 + 0.1,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.elapsedTime * 0.15;
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={3.5} floatIntensity={3.5}>
      <group ref={groupRef}>
        {crystals.map((crystal, i) => (
          <mesh
            key={i}
            position={crystal.position}
            rotation={crystal.rotation}
            scale={crystal.scale}
          >
            <octahedronGeometry args={[1, 2]} />
            <meshPhysicalMaterial
              roughness={0.02}
              metalness={0.05}
              transmission={0.98}
              thickness={2}
              ior={2.5}
              color="#FFFFFF"
              emissive={SPECTRUM_COLORS[i % SPECTRUM_COLORS.length]}
              emissiveIntensity={0.2}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              reflectivity={0.8}
              envMapIntensity={2}
              transparent={true}
              opacity={0.95}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DynamicLights() {
  return (
    <>
      <pointLight
        position={[8, 8, 8]}
        intensity={2}
        color="#A48FF5"
        decay={2}
      />
      <pointLight
        position={[-8, -8, 8]}
        intensity={1.5}
        color="#E91E63"
        decay={2}
      />
      <pointLight
        position={[0, 10, -8]}
        intensity={1.2}
        color="#6F4CFF"
        decay={2}
      />
      <pointLight
        position={[8, -8, -8]}
        intensity={0.8}
        color="#00FF88"
        decay={2}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const radius = 8 + Math.sin(t * 0.3) * 2;

    camera.position.x = Math.sin(t * 0.2) * radius;
    camera.position.z = Math.cos(t * 0.15) * radius;
    camera.position.y = 2 + Math.sin(t * 0.25) * 1.5 + Math.cos(t * 0.35) * 1;

    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-10">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 2, 8], fov: 50 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 10, 30]} />

          <CameraRig />
          <DynamicLights />

          <QuantumFoam />
          <ParticleSwarm />
          <CrystalCluster />

          {SPECTRUM_COLORS.map((color, i) => (
            <RotatingCircle key={i} color={color} planeIndex={i} />
          ))}

          <ContactShadows
            position={[0, -5, 0]}
            opacity={0.8}
            scale={25}
            blur={2}
            far={12}
          />

          <Environment resolution={256}>
            <Lightformer
              form="ring"
              intensity={12}
              color="#A890FF"
              scale={12}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="ring"
              intensity={8}
              color="#E91E63"
              scale={15}
              position={[0, -5, 0]}
              target={[0, 0, 0]}
            />
          </Environment>

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              intensity={2.5}
              levels={9}
            />
          </EffectComposer>
        </Canvas>
      </div>

      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,_rgba(168,144,255,0.35),_transparent_60%)]" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-[#0E1A2B]/10 via-[#0E1A2B]/50 to-[#0E1A2B]" />

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
          🚀 Optica Student Chapter
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
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/join"
              className="inline-flex items-center justify-center rounded-button bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-accent text-base font-bold text-white shadow-[0_24px_60px_-24px_rgba(168,144,255,0.95)] transition-all duration-300 hover:shadow-[0_40px_80px_-24px_rgba(168,144,255,1.2)] hover:from-purple-500 hover:to-pink-500"
            >
              🌟 Join Us
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-button border border-purple-500/50 px-8 py-3 font-accent text-base font-medium text-white transition-all duration-300 hover:border-pink-500 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(168,144,255,0.5)]"
            >
              ✨ View Our Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
