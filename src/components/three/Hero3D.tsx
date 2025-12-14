"use client";

import Link from "next/link";
import Image from "next/image";
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

function QuantumFoam({ isMobile = false, isTablet = false }: { isMobile?: boolean; isTablet?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Adaptive detail based on device
  const detail = isMobile ? 8 : isTablet ? 12 : 20;
  const uNoiseDensity = isMobile ? 1.5 : isTablet ? 2.0 : 2.5;
  const uNoiseStrength = isMobile ? 0.15 : isTablet ? 0.2 : 0.25;
  const sphereSize = isMobile ? 6 : 8;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseDensity: { value: uNoiseDensity },
      uNoiseStrength: { value: uNoiseStrength },
    }),
    [uNoiseDensity, uNoiseStrength]
  );

  // Throttle updates - mobile every 3rd frame, tablet every 2nd frame
  const frameCount = useRef(0);
  const skipFrames = isMobile ? 3 : isTablet ? 2 : 1;
  
  useFrame(({ clock }) => {
    frameCount.current++;
    if (frameCount.current % skipFrames !== 0) return;
    
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
  isMobile = false,
}: {
  color: THREE.ColorRepresentation;
  planeIndex: number;
  isMobile?: boolean;
}) {
  const curve = useMemo(() => {
    const points = [];
    const radius = planeIndex === 0 ? 4.5 : planeIndex === 1 ? 6 : 7.5;
    const segments = isMobile ? 64 : 128;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, 0));
    }

    const path = new THREE.CatmullRomCurve3(points);
    path.closed = true;
    return path;
  }, [planeIndex, isMobile]);

  const groupRef = useRef<THREE.Group>(null);
  const frameCount = useRef(0);

  useFrame(({ clock }) => {
    // Skip every other frame on mobile
    frameCount.current++;
    if (isMobile && frameCount.current % 2 !== 0) return;
    
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
      <Tube args={[curve, isMobile ? 128 : 256, 0.05, isMobile ? 12 : 24, true]}>
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={isMobile ? 3 : 5}
          toneMapped={false}
        />
      </Tube>
    </group>
  );
}

function ParticleSwarm({ isMobile = false, isTablet = false }: { isMobile?: boolean; isTablet?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 300 : isTablet ? 800 : 1500;
  const frameCountRef = useRef(0);
  const skipFrames = isMobile ? 2 : 1;

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
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    // Skip frames on mobile for performance
    frameCountRef.current++;
    if (frameCountRef.current % skipFrames !== 0) return;

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
        Math.max(0, (centerDist - blendStart) / (blendEnd - blendStart))
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
        opacity={0.8}
      />
    </points>
  );
}

function CrystalCluster({ isMobile = false, isTablet = false }: { isMobile?: boolean; isTablet?: boolean }) {
  const crystalCount = isMobile ? 12 : isTablet ? 20 : 35;
  
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
        colorIndex: index,
      });
    }

    return items;
  }, [crystalCount]);

  const groupRef = useRef<THREE.Group>(null);
  const frameCountRef = useRef(0);

  useFrame(({ clock }) => {
    frameCountRef.current++;
    if (isMobile && frameCountRef.current % 2 !== 0) return;
    
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.elapsedTime * 0.15;
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={isMobile ? 2 : 3.5} floatIntensity={isMobile ? 2 : 3.5}>
      <group ref={groupRef}>
        {crystals.map((crystal) => (
          <mesh
            key={`crystal-${crystal.colorIndex}`}
            position={crystal.position}
            rotation={crystal.rotation}
            scale={crystal.scale}
          >
            <octahedronGeometry args={[1, isMobile ? 1 : 2]} />
            {isMobile ? (
              <meshStandardMaterial
                color={SPECTRUM_COLORS[crystal.colorIndex % SPECTRUM_COLORS.length]}
                emissive={SPECTRUM_COLORS[crystal.colorIndex % SPECTRUM_COLORS.length]}
                emissiveIntensity={0.3}
                transparent={true}
                opacity={0.8}
              />
            ) : (
              <meshPhysicalMaterial
                roughness={0.02}
                metalness={0.05}
                transmission={0.98}
                thickness={2}
                ior={2.5}
                color="#FFFFFF"
                emissive={SPECTRUM_COLORS[crystal.colorIndex % SPECTRUM_COLORS.length]}
                emissiveIntensity={0.2}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                reflectivity={0.8}
                envMapIntensity={2}
                transparent={true}
                opacity={0.95}
              />
            )}
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

function CameraRig({ isMobile = false }: { isMobile?: boolean }) {
  const frameCountRef = useRef(0);
  
  useFrame(({ camera, clock }) => {
    frameCountRef.current++;
    if (isMobile && frameCountRef.current % 2 !== 0) return;
    
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect device type based on screen width only
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsReady(true);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-10">
        {isReady && (
          <Canvas
            shadows={!isMobile}
            dpr={isMobile ? 1 : isTablet ? 1.5 : 2}
            camera={{ position: [0, 2, 8], fov: isMobile ? 60 : 50 }}
            gl={{
              antialias: !isMobile,
              powerPreference: "default",
              alpha: false,
              stencil: false,
              depth: true,
            }}
          >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", isMobile ? 8 : 10, isMobile ? 25 : 30]} />

          <CameraRig isMobile={isMobile} />
          <DynamicLights />

          <QuantumFoam isMobile={isMobile} isTablet={isTablet} />
          <ParticleSwarm isMobile={isMobile} isTablet={isTablet} />
          <CrystalCluster isMobile={isMobile} isTablet={isTablet} />

          {SPECTRUM_COLORS.map((color, i) => (
            <RotatingCircle key={i} color={color} planeIndex={i} isMobile={isMobile} />
          ))}

          {!isMobile && (
            <ContactShadows
              position={[0, -5, 0]}
              opacity={0.8}
              scale={25}
              blur={2}
              far={12}
            />
          )}

          {!isMobile && (
            <Environment resolution={isTablet ? 128 : 256}>
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
          )}

          {!isMobile && (
            <EffectComposer multisampling={isTablet ? 2 : 4}>
              <Bloom
                luminanceThreshold={0.15}
                luminanceSmoothing={0.9}
                intensity={isTablet ? 1.5 : 2.5}
                levels={isTablet ? 5 : 9}
              />
            </EffectComposer>
          )}
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
          className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 py-1.5 text-[0.55rem] sm:text-xs lg:text-sm uppercase tracking-[0.25em] text-white/80"
        >
          Formerly Optical Society of America
        </motion.span>
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[min(88vw,960px)] 2xl:max-w-[840px] px-2"
        >
          <Image
            src="/logo_dark.png"
            alt="BVP Optica Student Chapter"
            width={1200}
            height={400}
            priority
            className="mx-auto h-auto w-full max-w-[min(88vw,880px)] 2xl:max-w-[800px] object-contain"
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
