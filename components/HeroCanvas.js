import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GoldRing({ radius, tube, rotationSpeed, tilt }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    ref.current.rotation.y += rotationSpeed
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
  })
  return (
    <Torus ref={ref} args={[radius, tube, 3, 120]}>
      <meshStandardMaterial
        color="#C9A84C"
        metalness={0.95}
        roughness={0.05}
        emissive="#9A7A2E"
        emissiveIntensity={0.15}
      />
    </Torus>
  )
}

function FloatingSphere({ position, size, speed, delay }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + delay) * 0.3
    ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5 + delay) * 0.15
  })
  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial
        color="#C9A84C"
        metalness={1}
        roughness={0.0}
        emissive="#C9A84C"
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </Sphere>
  )
}

function StarField() {
  const count = 1200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#E8D5A3" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#C9A84C" />
      <pointLight position={[3, 4, 2]} intensity={0.4} color="#ffffff" />

      <StarField />

      <GoldRing radius={2.2} tube={0.012} rotationSpeed={0.003} tilt={Math.PI / 2.8} />
      <GoldRing radius={1.6} tube={0.008} rotationSpeed={-0.005} tilt={Math.PI / 4} />
      <GoldRing radius={2.9} tube={0.006} rotationSpeed={0.002} tilt={Math.PI / 1.8} />

      <FloatingSphere position={[-3.5, 0.5, -2]} size={0.06} speed={0.8} delay={0} />
      <FloatingSphere position={[3.2, -0.8, -1]} size={0.05} speed={1.1} delay={1.5} />
      <FloatingSphere position={[-2, -1.5, 0]} size={0.04} speed={0.7} delay={3} />
      <FloatingSphere position={[2.5, 1.8, -3]} size={0.07} speed={0.9} delay={2} />
      <FloatingSphere position={[0.5, 2.2, -1]} size={0.035} speed={1.3} delay={0.8} />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
