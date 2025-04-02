import * as THREE from 'three';

const init3 = () => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        75, // 视角
        window.innerWidth / window.innerHeight, // 宽高比
        0.1, // 近平面
        1000 // 远平面
    );

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置为窗口大小
    document.body.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    // 创建网格
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 设置相机位置
    camera.position.z = 5;

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // 环境光颜色和强度
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 强度为 1
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 动画函数
    const animate = () => {
        requestAnimationFrame(animate);

        // 旋转立方体
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // 渲染场景
        renderer.render(scene, camera);
    };

    animate();

    // 画布自适应窗口大小
    window.addEventListener('resize', () => {
        // 渲染器宽高比
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 相机宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 相机投影矩阵
        camera.updateProjectionMatrix();
    });
};

export default init3;