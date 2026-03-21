'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleSwarm({ count = 5000, color = "#00f0ff" }) {
  const points = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [count])

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05
      points.current.rotation.x -= delta * 0.02
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function ScanningRings() {
  const group = useRef<THREE.Group>(null!)
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2
        mesh.rotation.z += delta * (i % 2 === 0 ? 0.5 : -0.5)
      })
    }
  })

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3 + i * 1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.3 - i * 0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

export default function ScanningBackground({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        {isActive ? (
          <>
            <ParticleSwarm count={3000} color="#00f0ff" />
            <ParticleSwarm count={2000} color="#ff00ff" />
            <ScanningRings />
          </>
        ) : (
          <ParticleSwarm count={1000} color="#333333" />
        )}
      </Canvas>
    </div>
  )
}
