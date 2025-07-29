"use client"

import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"

// Your room model component
const RoomModel3D: React.FC = () => {
  const { scene } = useGLTF('/room.glb')
  
  // Clone the scene to avoid potential issues with Chrome
  const clonedScene = scene.clone()
  
  return <primitive object={clonedScene} scale={1} />
}

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-2xl">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
  </div>
)

// Error fallback component
const ErrorFallback: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full bg-red-50 rounded-2xl border-2 border-red-200">
    <div className="text-center p-4">
      <div className="text-red-600 font-medium mb-2">3D Model Unavailable</div>
      <div className="text-sm text-red-500">Your browser may not support WebGL</div>
    </div>
  </div>
)

// Main component that wraps the 3D scene
const RoomModel: React.FC = () => {
  const [hasWebGL, setHasWebGL] = React.useState<boolean | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    // Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
        
        if (!gl) {
          setHasWebGL(false)
          setError('WebGL not supported')
          return false
        }
        
        // Check for specific Chrome issues
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          console.log('WebGL Renderer:', renderer)
        }
        
        setHasWebGL(true)
        return true
      } catch (err) {
        console.error('WebGL check failed:', err)
        setHasWebGL(false)
        setError(`WebGL error: ${err}`)
        return false
      }
    }

    checkWebGL()
  }, [])

  // Show loading while checking WebGL
  if (hasWebGL === null) {
    return <LoadingSpinner />
  }

  // Show error if no WebGL support
  if (!hasWebGL || error) {
    return <ErrorFallback />
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          camera={{ position: [5, 2, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{
            powerPreference: "default",
            antialias: false, // Try disabling antialiasing for Chrome
            alpha: true,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            premultipliedAlpha: false, // Change this for Chrome
            stencil: false,
            depth: true,
            logarithmicDepthBuffer: false,
            precision: "mediump" // Lower precision for Chrome compatibility
          }}
          dpr={1} // Fixed DPR for Chrome
          linear={false} // Try disabling linear
          flat={false} // Try disabling flat
          frameloop="demand" // Only render when needed
          onCreated={({ gl, scene }) => {
            console.log('Three.js WebGL context created')
            console.log('Three.js renderer info:', gl.info)
            console.log('WebGL context:', gl.getContext())
          }}
          onError={(error) => {
            console.error('Three.js Canvas error:', error)
            setError(`Canvas error: ${error}`)
          }}
        >
          {/* Environment and lighting */}
          <Environment preset="apartment" />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Your 3D Room Model */}
          <RoomModel3D />

          {/* Camera controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxDistance={15}
            minDistance={3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default RoomModel