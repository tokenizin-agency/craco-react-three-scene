import * as THREE from 'three'
import { Suspense, useEffect, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF } from '@react-three/drei'
import { FullPageChat } from 'flowise-embed-react'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!chatOpen && (
        <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 15 }}>
          <color attach="background" args={['black']} />
          <fog attach="fog" args={['black', 15, 20]} />
          <Suspense fallback={null}>
            <group position={[0, -1, 0]}>
              <Carla
                onClick={() => {
                  alert('test')
                  setChatOpen(true)
                }}
                rotation={[0, Math.PI - 0.4, 0]}
                position={[-1.2, 0, 0.6]}
                scale={[0.26, 0.26, 0.26]}
              />
              {/* <TriangleGreen /> */}
              <VideoText position={[0, 1.3, -2]} />
              <Ground />
            </group>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.5} />
            <directionalLight position={[-50, 0, -40]} intensity={0.9} />
            <Intro />
          </Suspense>
        </Canvas>
      )}
      {chatOpen && <FullPageChat chatflowid="b47a9d48-d729-456e-bc27-0872cc8523ca" apiHost="https://flowiseai-railway-production-083ca.up.railway.app" />}
    </div>
  )
}

function Carla(props: any) {
  const { scene } = useGLTF('/carla-draco.glb')
  return <primitive object={scene} {...props} />
}

function VideoText(props: JSX.IntrinsicElements['mesh']) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <Text font="/Inter-Bold.woff" fontSize={1.5} letterSpacing={-0.1} {...props}>
      DAOBLE
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </Text>
  )
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      {(Material: any, props: any) => (
        <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={new THREE.Vector2(2, 2)} {...props} />
      )}
    </Reflector>
  )
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}
