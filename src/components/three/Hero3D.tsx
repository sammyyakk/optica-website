'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/lib/theme/ThemeProvider';

// Custom particle shader material
const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute vec3 aRandomness;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Animate particles with wave motion
    modelPosition.x += sin(uTime + aRandomness.x * 10.0) * 0.5;
    modelPosition.y += cos(uTime + aRandomness.y * 10.0) * 0.5;
    modelPosition.z += sin(uTime * 0.5 + aRandomness.z * 10.0) * 0.3;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  
  void main() {
    // Create circular particles with gradient
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    
    // Mix colors based on time
    vec3 color = mix(uColor1, uColor2, sin(uTime * 0.5) * 0.5 + 0.5);
    
    gl_FragColor = vec4(color, strength);
  }
`;

interface ParticleFieldProps {
  count?: number;
}

function ParticleField({ count = 5000 }: ParticleFieldProps) {
  const { theme } = useTheme();
  const particlesRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Generate particle positions and attributes
  const [positions, scales, randomness] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      scales[i] = Math.random();
      
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    return [positions, scales, randomness];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 3.0 },
    uColor1: { 
      value: theme === 'dark' 
        ? new THREE.Color('#6C63FF') // Quantum Violet
        : new THREE.Color('#0072CE') // Optica Blue
    },
    uColor2: { 
      value: theme === 'dark'
        ? new THREE.Color('#FFC300') // Photon Gold
        : new THREE.Color('#E91E63') // Laser Magenta
    },
  }), [theme]);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Rotate particle field slowly
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  // Update colors on theme change
  useEffect(() => {
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uColor1.value = theme === 'dark' 
        ? new THREE.Color('#6C63FF')
        : new THREE.Color('#0072CE');
      material.uniforms.uColor2.value = theme === 'dark'
        ? new THREE.Color('#FFC300')
        : new THREE.Color('#E91E63');
    }
  }, [theme]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={count}
          array={randomness}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating geometry shapes
function FloatingShapes() {
  const { theme } = useTheme();
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const sphere3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = Math.sin(time * 0.5) * 2;
      sphere1Ref.current.rotation.x += 0.01;
      sphere1Ref.current.rotation.y += 0.02;
    }
    
    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = Math.cos(time * 0.7) * 1.5;
      sphere2Ref.current.rotation.x -= 0.01;
      sphere2Ref.current.rotation.z += 0.01;
    }
    
    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(time * 0.3 + Math.PI) * 1.8;
      sphere3Ref.current.rotation.y -= 0.015;
      sphere3Ref.current.rotation.z -= 0.01;
    }
  });

  const color1 = theme === 'dark' ? '#6C63FF' : '#0072CE';
  const color2 = theme === 'dark' ? '#FFC300' : '#E91E63';
  const color3 = theme === 'dark' ? '#E91E63' : '#6C63FF';

  return (
    <>
      <mesh ref={sphere1Ref} position={[-4, 0, -5]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color={color1} 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      <mesh ref={sphere2Ref} position={[4, 0, -6]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color={color2} 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      <mesh ref={sphere3Ref} position={[0, 2, -7]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color={color3} 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);

  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <CameraController />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6C63FF" />
        
        {/* Particle field */}
        <ParticleField count={5000} />
        
        {/* Floating shapes */}
        <FloatingShapes />
        
        {/* Optional orbit controls for development */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
