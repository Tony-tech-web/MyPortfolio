import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';



// Animated floating particles
function Particles({ count = 100 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * factor) / 10),
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2 * factor) / 10),
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3 * factor) / 10)
      );

      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;

    // Animate light
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 10;
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 10;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="#3b82f6" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#8b5cf6" />
      </instancedMesh>
    </>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <FloatingShape
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        />
      ))}
    </group>
  );
}

function FloatingShape({ position, rotation }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  const shape = Math.random() > 0.5 ? 'box' : 'sphere';

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      {shape === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <sphereGeometry args={[0.5, 32, 32]} />
      )}
      <meshStandardMaterial
        color={Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6'}
        emissive={Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6'}
        emissiveIntensity={0.2}
        wireframe={Math.random() > 0.7}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Main Animated Background Component
const AnimatedBackground3D = ({ 
  className = '',
  intensity = 0.3,
  particleCount = 50,
  showShapes = true,
  style = {}
}) => {
  return (
    <div 
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ opacity: intensity, ...style }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Particles count={particleCount} />
        {showShapes && <FloatingShapes />}
      </Canvas>
    </div>
  );
};

export default AnimatedBackground3D;

