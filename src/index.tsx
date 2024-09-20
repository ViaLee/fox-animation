import { useEffect } from 'react'
import * as THREE from 'three';

function Initial() {

    const init = () => {
        // 创建场景
        const scene = new THREE.Scene();
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            45,//视角
            window.innerWidth / window.innerHeight,
            0.1,  //近平面
            1000  //远平面
        )

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight); //设置为窗口大小
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1); //创建几何体
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })  //材质
        const cube = new THREE.Mesh(geometry, material); //创建网格

        scene.add(cube)

        // 设置相机位置
        camera.position.z = 5;
        camera.lookAt(0, 0, 0);

        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            // 渲染
            renderer.render(scene, camera)
        }

        animate()
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <div>
                3d
            </div>

        </>
    )
}

export default Initial
