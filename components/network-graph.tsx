"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"

// Node component representing a lead
function Node({ position, name, company, industry, score, onClick }) {
  const nodeRef = useRef()
  const color = getIndustryColor(industry)
  const size = 0.3 + (score / 100) * 0.3

  useFrame(({ clock }) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={nodeRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <Text
        position={[0, size + 0.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        {name}
      </Text>
      <Text
        position={[0, size + 0.4, 0]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        {company}
      </Text>
    </group>
  )
}

// Edge component connecting nodes
function Edge({ start, end }) {
  const edgeRef = useRef()

  useFrame(({ clock }) => {
    if (edgeRef.current) {
      const material = edgeRef.current.material
      material.dashOffset = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <line ref={edgeRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineDashedMaterial color="#475569" dashSize={0.1} gapSize={0.05} opacity={0.4} transparent linewidth={1} />
    </line>
  )
}

// Helper function to get color based on industry
function getIndustryColor(industry) {
  const industryColors = {
    Software: "#3b82f6",
    Marketing: "#8b5cf6",
    Finance: "#10b981",
    "Venture Capital": "#f59e0b",
    Sales: "#ef4444",
    "Data & Analytics": "#6366f1",
  }

  return industryColors[industry] || "#64748b"
}

// Main component
export function NetworkGraph({ leads }) {
  // Generate positions for nodes
  const nodePositions = useMemo(() => {
    return leads.map((_, index) => {
      const angle = (index / leads.length) * Math.PI * 2
      const radius = 4
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      return [x, 0, z]
    })
  }, [leads])

  // Generate edges between nodes
  const edges = useMemo(() => {
    const result = []

    // Connect to center
    for (let i = 0; i < nodePositions.length; i++) {
      result.push({
        start: nodePositions[i],
        end: [0, 0, 0],
      })
    }

    // Connect nodes in a circle
    for (let i = 0; i < nodePositions.length; i++) {
      const nextIndex = (i + 1) % nodePositions.length
      result.push({
        start: nodePositions[i],
        end: nodePositions[nextIndex],
      })
    }

    return result
  }, [nodePositions])

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Center node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Lead nodes */}
      {leads.map((lead, index) => (
        <Node
          key={lead.id}
          position={nodePositions[index]}
          name={lead.name}
          company={lead.company}
          industry={lead.industry}
          score={lead.score}
          onClick={() => console.log("Clicked on", lead.name)}
        />
      ))}

      {/* Connections */}
      {edges.map((edge, index) => (
        <Edge key={index} start={edge.start} end={edge.end} />
      ))}

      <OrbitControls enablePan={false} minDistance={5} maxDistance={15} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

