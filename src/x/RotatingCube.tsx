import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'


const RotatingCube = () => {
    const meshRef = useRef<THREE.Mesh>(null!)
    // 渲染之前循环 动画
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (

        <mesh ref={meshRef}>
            <cylinderGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color="#468585" emissive={'#468585'} />
        </mesh>
    )
}

export default RotatingCube