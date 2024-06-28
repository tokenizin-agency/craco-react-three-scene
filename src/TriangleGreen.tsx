import { Canvas } from '@react-three/fiber'

const TriangleGreen = () => {
  return (
    <Canvas>
      <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="green" />
      </mesh>
    </Canvas>
  )
}

export default TriangleGreen
