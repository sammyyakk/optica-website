"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Caustics,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Line,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { cubicBezier } from "motion";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Line2 } from "three-stdlib";

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

function AnimatedLightRig() {
  const lights = useRef<(THREE.SpotLight | null)[]>(
    new Array(SPECTRUM_COLORS.length).fill(null)
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    lights.current.forEach((light, index) => {
      if (!light) return;

      const phase = index * (Math.PI / 2);
      const radius = 5.6 + Math.sin(t * 0.45 + phase) * 0.55;
      light.position.x = Math.cos(t * 0.38 + phase) * radius;
      light.position.y = 2.5 + Math.sin(t * 0.55 + phase) * 2.0;
      light.position.z = Math.sin(t * 0.38 + phase) * radius;
      light.intensity = 1.05 + Math.sin(t * 1.1 + phase) * 0.32;
      light.target.position.set(0, 0.9, 0);
      light.target.updateMatrixWorld();
    });
  });

  const register = (index: number) => (light: THREE.SpotLight | null) => {
    lights.current[index] = light;
  };

  return (
    <>
      {SPECTRUM_COLORS.map((color, index) => (
        <spotLight
          key={color}
          ref={register(index)}
          color={color}
          intensity={1.35}
          angle={Math.PI / 6.2}
          penumbra={0.75}
          distance={28}
          decay={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      ))}
      <ambientLight intensity={0.28} color="#A890FF" />
    </>
  );
}

function GlassPrism() {
  const prismRef = useRef<THREE.Mesh>(null);

  const prismGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 0.82;
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 64,
      depth: 2.6,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelSegments: 16,
      curveSegments: 48,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    geometry.rotateX(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => {
    return () => prismGeometry.dispose();
  }, [prismGeometry]);

  useFrame(({ clock }) => {
    if (!prismRef.current) return;
    const t = clock.elapsedTime;
    prismRef.current.rotation.y = t * 0.24;
    prismRef.current.rotation.x = Math.sin(t * 0.18) * 0.15;
    prismRef.current.rotation.z = Math.sin(t * 0.35) * 0.15;
    prismRef.current.position.y = 0.85 + Math.sin(t * 0.7) * 0.18;
  });

  return (
    <Caustics
      causticsOnly={false}
      backside
      ior={1.45}
      backsideIOR={1.12}
      intensity={0.65}
      worldRadius={0.4}
      lightSource={[4.5, 5.6, -2.5]}
      resolution={1024}
      color="#BCA8FF"
    >
      <mesh ref={prismRef} geometry={prismGeometry} castShadow receiveShadow>
        <MeshTransmissionMaterial
          color="#C6B6FF"
          thickness={1.5}
          anisotropy={0.35}
          chromaticAberration={0.2}
          temporalDistortion={0.07}
          distortion={0.18}
          distortionScale={0.4}
          samples={16}
          resolution={640}
          transmission={1}
          ior={1.52}
          roughness={0.07}
          attenuationColor="#BCA8FF"
          attenuationDistance={0.6}
        />
      </mesh>
    </Caustics>
  );
}

function SpectralRibbons({
  count = 3,
  segments = 160,
}: {
  count?: number;
  segments?: number;
}) {
  const { size } = useThree();
  const detailFactor = size.width < 768 ? 0.7 : size.width < 1280 ? 0.85 : 1;
  const activeSegments = Math.max(48, Math.floor(segments * detailFactor));
  const lineRefs = useRef<(Line2 | null)[]>(new Array(count).fill(null));
  const buffers = useMemo(
    () => new Array(count).fill(0).map(() => new Float32Array(activeSegments * 3)),
    [count, activeSegments]
  );
  const seeds = useMemo(
    () => new Array(count).fill(0).map(() => Math.random() * Math.PI * 2),
    [count]
  );
  const basePoints = useMemo(
    () => new Array(activeSegments).fill(0).map(() => new THREE.Vector3()),
    [activeSegments]
  );

  const register = (index: number) => (line: Line2 | null) => {
    lineRefs.current[index] = line;
    if (line) {
      const material = line.material as any;
      material.transparent = true;
      material.opacity = 0.7;
      material.blending = THREE.AdditiveBlending;
      material.toneMapped = false;
      material.dashed = true;
      material.dashScale = 6;
      material.dashSize = 0.35;
      material.gapSize = 0.2;
      material.needsUpdate = true;
    }
  };

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    lineRefs.current.forEach((line, idx) => {
      if (!line) return;
      const positions = buffers[idx];
      const segCount = positions.length / 3;
      const seed = seeds[idx];
      const swirlInfluence = 0.9 + idx * 0.1;
      const heightScale = size.width < 768 ? 1.8 : 2.3;
      
      for (let i = 0; i < segCount; i++) {
        const u = i / (segCount - 1);
        const swirl = u * Math.PI * 2 * swirlInfluence + t * 0.8 + idx * 0.85 + seed;
        const radiusBase = 1.15 + idx * 0.08;
        const radius = radiusBase + Math.sin(u * Math.PI * 3 + t * 0.6 + seed) * 0.4;
        const height = -0.6 + u * heightScale + Math.sin(t * 0.7 + u * 7.2 + seed) * 0.28;

        positions[i * 3 + 0] = Math.cos(swirl) * radius;
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(swirl) * radius;
      }

      (line.geometry as any).setPositions(positions);
      const material = line.material as any;
      material.color = new THREE.Color(SPECTRUM_COLORS[idx % SPECTRUM_COLORS.length]);
      material.opacity = 0.45 + Math.sin(t * 0.5 + idx) * 0.12;
      material.dashOffset = (material.dashOffset ?? 0) - 0.0022;
    });
  });

  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <Line
          key={idx}
          ref={register(idx)}
          points={basePoints}
          color={SPECTRUM_COLORS[idx % SPECTRUM_COLORS.length]}
          lineWidth={size.width < 768 ? 1.6 : 2.2}
        />
      ))}
    </>
  );
}

const photonVertexShader = `
  uniform float uTime;
  attribute float aScale;
  varying float vScale;

  void main() {
    vec3 transformed = position;
    float wave = sin(position.x * 1.3 + uTime * 0.85) * 0.18;
    wave += cos(position.z * 1.05 - uTime * 0.95) * 0.16;
    float swirl = sin((position.x + position.z) * 0.6 + uTime * 0.5) * 0.12;
    transformed.y += wave + swirl;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    float size = clamp(aScale * 32.0, 5.0, 38.0);
    gl_PointSize = size * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vScale = aScale;
  }
`;

const photonFragmentShader = `
  varying float vScale;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = dot(coord, coord);
    float falloff = smoothstep(0.28, 0.0, dist);
    vec3 color = mix(vec3(0.14, 0.11, 0.32), vec3(0.9, 0.84, 1.0), clamp(vScale * 1.4, 0.0, 1.0));
    gl_FragColor = vec4(color, falloff * 0.82);
  }
`;

function PhotonCloud({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const density = size.width < 768 ? 0.6 : size.width < 1280 ? 0.8 : 1;
  const effectiveCount = Math.max(500, Math.floor(count * density));

  const positions = useMemo(() => {
    const array = new Float32Array(effectiveCount * 3);
    for (let i = 0; i < effectiveCount; i++) {
      const i3 = i * 3;
      const radius = THREE.MathUtils.lerp(0.6, 4.4, Math.random());
      const angle = Math.random() * Math.PI * 2;
      const elevation = THREE.MathUtils.lerp(-0.7, 1.9, Math.random());
      array[i3] = Math.cos(angle) * radius;
      array[i3 + 1] = elevation + Math.sin(angle * 2.1) * 0.22;
      array[i3 + 2] = Math.sin(angle) * radius;
    }
    return array;
  }, [effectiveCount]);

  const scales = useMemo(() => {
    const array = new Float32Array(effectiveCount);
    for (let i = 0; i < effectiveCount; i++) {
      array[i] = THREE.MathUtils.lerp(0.28, 0.95, Math.random());
    }
    return array;
  }, [effectiveCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.elapsedTime;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.06;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={photonVertexShader}
        fragmentShader={photonFragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const targetY = 0.6 + Math.sin(t * 0.32) * 0.08;
    const targetZ = 7.2 + Math.sin(t * 0.18) * 0.25;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.045);
    camera.lookAt(0, 0.8, 0);
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
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.6, 7.2], fov: 42 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#0E1A2B"]} />
          <fog attach="fog" args={["#0E1A2B", 12, 30]} />

          <CameraRig />
          <AnimatedLightRig />

          <Float
            speed={1.15}
            rotationIntensity={0.35}
            floatIntensity={0.45}
            position={[0, 0, 0]}
          >
            <GlassPrism />
          </Float>

          <SpectralRibbons />
          <PhotonCloud />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.4, 0]}
            receiveShadow
          >
            <planeGeometry args={[28, 28]} />
            <meshStandardMaterial
              color="#06050D"
              roughness={0.92}
              metalness={0.12}
            />
          </mesh>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.55}
            scale={14}
            blur={2.6}
            far={8}
          />

          <Environment resolution={256} background={false} frames={1}>
            <Lightformer
              form="ring"
              intensity={3.2}
              rotation={[0, Math.PI / 2, 0]}
              position={[0, 2.2, -5.5]}
              scale={[2.5, 2.5, 1]}
              color="#0072CE"
            />
            <Lightformer
              form="rect"
              intensity={2.4}
              position={[-4.2, 3.4, 2.8]}
              scale={[4.5, 6, 1]}
              color="#FFC300"
            />
            <Lightformer
              form="rect"
              intensity={2.1}
              position={[4.6, 2.5, 3.2]}
              scale={[3.5, 5, 1]}
              color="#E91E63"
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
