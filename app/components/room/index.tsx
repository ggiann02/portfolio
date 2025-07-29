"use client"

import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import dynamic from "next/dynamic"
import * as THREE from "three"

// Your room model component
const RoomModel3D: React.FC = () => {
  const { scene } = useGLTF('/roomcheck.glb')
  
  // Clone the scene to avoid potential issues with Chrome
  const clonedScene = scene.clone()
  
  // Remove any wireframe or bounding box helpers
  clonedScene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      // Ensure material is not wireframe
      if (mesh.material) {
        const material = mesh.material as THREE.Material
        if ('wireframe' in material) {
          (material as any).wireframe = false
        }
        // Remove any debug materials
        if (material.name && material.name.includes('bbox')) {
          mesh.visible = false
        }
      }
    }
    // Remove any helper objects (bounding boxes, wireframes, etc.)
    if (
      child.type === 'BoxHelper' || 
      child.type === 'Box3Helper' || 
      child.type === 'WireframeGeometry' ||
      child.type === 'LineSegments' ||
      child.name.includes('helper') ||
      child.name.includes('bbox') ||
      child.name.includes('wireframe') ||
      child.name.includes('bound')
    ) {
      child.visible = false
    }
  })
  
  return <primitive object={clonedScene} scale={1} rotation={[0, Math.PI, 0]} />
}

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-2xl">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
  </div>
)

// Three.js Canvas component wrapped to prevent SSR
const ThreeJSCanvas: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{ 
        position: [3, 1.5, 3], 
        fov: 40
      }}
      style={{ background: 'transparent' }}
      gl={{
        powerPreference: "default",
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        premultipliedAlpha: false,
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
        precision: "mediump"
      }}
      dpr={1}
      linear={false}
      flat={false}
      frameloop="demand"
      onCreated={() => {
        console.log('Three.js WebGL context created')
      }}
    >
      <Environment preset="apartment" />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <RoomModel3D />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={8}
        minDistance={1}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  )
}

// Dynamically import the Canvas to prevent SSR
const DynamicThreeJSCanvas = dynamic(() => Promise.resolve(ThreeJSCanvas), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

// Main component that wraps the 3D scene
const RoomModel: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <LoadingSpinner />
  }

  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicThreeJSCanvas />
      </Suspense>
    </div>
  )
}

export default RoomModel
