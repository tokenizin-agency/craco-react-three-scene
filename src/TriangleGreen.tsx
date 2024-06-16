import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshBasicMaterial } from 'three'
import { Sphere, SphereGeometry } from 'three'

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
