import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


function Initial() {
  useEffect(() => {
    console.log("222");
    init();
    console.log("111");
  }, []);

  useEffect(() => {
    console.log('111');
  }, [])

  return (
    <>
      <Canvas style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <OrbitControls enableZoom enablePan enableRotate />
        <directionalLight position={[1, 2, 3]} intensity={10} color={0x9CDBA6} />
        {/* 颜色画布 */}
        <color attach={"background"} args={["#F0F0F0"]} />

      </Canvas>
    </>
  )
}

export default Initial;
