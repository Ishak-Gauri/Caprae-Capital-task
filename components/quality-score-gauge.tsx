"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"

function ScoreRing({ score, maxScore = 100 }) {
  const ringRef = useRef()
  const percentage = score / maxScore
  const color = getScoreColor(score)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group>
      {/* Background ring */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Score ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.5, 2, 64, 64, 0, percentage * Math.PI * 2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>

      {/* Score text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {score}
      </Text>

      <Text
        position={[0, -0.6, 0.1]}
        fontSize={0.3}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        Quality Score
      </Text>
    </group>
  )
}

function getScoreColor(score) {
  if (score >= 90) return "#22c55e" // Green
  if (score >= 80) return "#3b82f6" // Blue
  if (score >= 70) return "#f59e0b" // Amber
  return "#ef4444" // Red
}

export function QualityScoreGauge({ score = 85 }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ScoreRing score={score} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

