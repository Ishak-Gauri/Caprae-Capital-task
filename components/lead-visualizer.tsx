"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment, ContactShadows, Html } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Phone, Linkedin, Globe, CheckCircle2 } from "lucide-react"
import * as THREE from "three"

// Lead profile component
function LeadProfile({ lead, position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Html transform distanceFactor={10} position={[0, 0, 0]} className="w-64">
        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{lead.name}</CardTitle>
              {lead.verified && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            </div>
            <div className="text-sm text-muted-foreground">{lead.title}</div>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>{lead.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">{lead.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">{lead.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm">{lead.website}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4 text-primary" />
              <span className="text-sm">{lead.linkedin}</span>
            </div>
            <div className="pt-2">
              <Badge className="bg-primary">{lead.score} Quality Score</Badge>
            </div>
          </CardContent>
        </Card>
      </Html>
    </group>
  )
}

// Quality score ring
function QualityRing({ score, position = [0, 0, 0] }) {
  const ringRef = useRef()
  const { clock } = useThree()

  // Calculate color based on score
  const getColor = (score) => {
    if (score >= 90) return new THREE.Color("#22c55e") // Green
    if (score >= 80) return new THREE.Color("#3b82f6") // Blue
    if (score >= 70) return new THREE.Color("#f59e0b") // Amber
    return new THREE.Color("#ef4444") // Red
  }

  const color = getColor(score)

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <torusGeometry args={[5, 0.2, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 0, 0.5]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {score}
      </Text>
    </group>
  )
}

// Company sphere
function CompanySphere({ lead, position = [0, 0, 0] }) {
  const sphereRef = useRef()

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005
    }
  })

  // Map industry to color
  const getIndustryColor = (industry) => {
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

  const color = getIndustryColor(lead.industry)

  return (
    <group position={position}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {lead.company}
      </Text>
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.5}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        {lead.industry}
      </Text>
    </group>
  )
}

// Connection lines
function ConnectionLines({ startPosition, endPosition }) {
  const lineRef = useRef()
  const { clock } = useThree()

  useFrame(() => {
    if (lineRef.current) {
      const material = lineRef.current.material
      material.dashOffset = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={2}
          array={new Float32Array([...startPosition, ...endPosition])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineDashedMaterial color="#94a3b8" dashSize={0.5} gapSize={0.3} opacity={0.7} transparent linewidth={1} />
    </line>
  )
}

// Main component
export function LeadVisualizer({ lead }) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      <group position={[0, 0, 0]}>
        <LeadProfile lead={lead} position={[-8, 0, 0]} />
        <QualityRing score={lead.score} position={[0, 0, 0]} />
        <CompanySphere lead={lead} position={[8, 0, 0]} />

        <ConnectionLines startPosition={[-8, 0, 0]} endPosition={[0, 0, 0]} />
        <ConnectionLines startPosition={[0, 0, 0]} endPosition={[8, 0, 0]} />
      </group>

      <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={1.5} far={5} />

      <OrbitControls enablePan={false} minDistance={10} maxDistance={30} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

