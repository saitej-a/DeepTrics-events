import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

interface HeroSceneProps {
  active: boolean
  reduced: boolean
  mobile: boolean
}

/** A single floating metallic form. */
function Ribbon({
  position,
  scale,
  color,
  metalness = 1,
  roughness = 0.24,
  kind = 'knot',
  seed = 0,
}: {
  position: [number, number, number]
  scale: number
  color: string
  metalness?: number
  roughness?: number
  kind?: 'knot' | 'ring' | 'sphere'
  seed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!ref.current) return
    const speed = 0.25 + seed * 0.03
    ref.current.rotation.x = t * speed * 0.6 + seed
    ref.current.rotation.y = t * speed + seed * 1.3
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + seed * 2) * 0.25
    ref.current.rotation.z = Math.sin(t * 0.4 + seed) * 0.12
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {kind === 'knot' && <torusKnotGeometry args={[1, 0.32, 220, 36]} />}
      {kind === 'ring' && <torusGeometry args={[1, 0.22, 32, 120]} />}
      {kind === 'sphere' && <icosahedronGeometry args={[1, 3]} />}
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        envMapIntensity={1.1}
      />
    </mesh>
  )
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      arr[i * 3 + 2] = r * Math.cos(phi) - 1.5
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c6a46c"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Rig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree()

  useFrame((state, delta) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    const targetX = pointer.x * 0.9
    const targetY = pointer.y * 0.55 + Math.sin(t * 0.16) * 0.12
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 2.4)
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2.4)
    camera.lookAt(0, 0, -0.2)
  })

  return null
}

/** Render one frame even when frameloop is paused (reduced-motion path). */
function InvalidateOnce() {
  const invalidate = useThree((s) => s.invalidate)
  useMemo(() => {
    invalidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export function HeroScene({ active, reduced, mobile }: HeroSceneProps) {
  const frameloop = reduced || !active ? 'never' : 'always'

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      frameloop={frameloop}
      aria-hidden="true"
    >
      {reduced ? <InvalidateOnce /> : null}
      <fog attach="fog" args={['#090909', 7, 16]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} color="#fff4e6" />
      <pointLight position={[-6, -2, -4]} intensity={18} color="#c6a46c" distance={30} />
      <pointLight position={[5, 3, 2]} intensity={8} color="#f4efe7" distance={20} />

      <Ribbon position={[-3.4, 1.1, -1.6]} scale={1.15} color="#c6a46c" kind="knot" seed={0.4} />
      <Ribbon position={[3.5, -0.6, -2.4]} scale={0.9} color="#f4efe7" kind="ring" seed={1.1} roughness={0.5} />
      <Ribbon position={[1.6, 1.9, -0.8]} scale={0.55} color="#b7aa97" kind="sphere" seed={2.3} roughness={0.4} />
      <Ribbon position={[3.8, 1.7, -0.6]} scale={0.7} color="#c6a46c" kind="knot" seed={3.2} />
      <Ribbon position={[-4.2, -1.4, -3]} scale={1.0} color="#8a7a60" kind="ring" seed={0.8} roughness={0.55} />
      <Ribbon position={[-0.6, -2.3, -2]} scale={0.6} color="#f4efe7" kind="sphere" seed={1.7} roughness={0.45} />

      <Particles count={mobile ? 140 : 320} />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={4} position={[0, 5, 2]} scale={[12, 4, 1]} color="#fff2dd" />
        <Lightformer intensity={3} position={[-6, 0, 1]} scale={[2, 8, 1]} color="#c6a46c" />
        <Lightformer intensity={2} position={[6, -2, 0]} scale={[2, 6, 1]} color="#f4efe7" />
        <Lightformer intensity={2} position={[0, -4, 3]} scale={[10, 2, 1]} color="#7a6a52" />
      </Environment>

      <Rig reduced={reduced} />
    </Canvas>
  )
}
