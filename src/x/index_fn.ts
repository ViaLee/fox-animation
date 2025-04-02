import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const init3d = () => {
    const canvas: HTMLElement = document.getElementById('canvas');
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F0F0F0')
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        75,//视角
        window.innerWidth / window.innerHeight,
        0.1,  //近平面
        1000  //远平面
    )
    camera.position.z = 5;
    // 创建对象
    // 创建对象
    const geometry = new THREE.DodecahedronGeometry();
    const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
    const dedecahedron = new THREE.Mesh(geometry, material);

    const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
    const boxMaterial = new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = -1.5

    scene.add(dedecahedron);
    scene.add(box);

    // 添加灯光
    // 定向光
    // const light = new THREE.DirectionalLight(0x9CDBA6, 10)
    // 聚光灯
    const light = new THREE.SpotLight(0x006769, 100)
    light.position.set(1, 1, 1)
    scene.add(light);

    // 添加渲染器
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)//像素比

    //轨道
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true; //是否允许平移

    function animate() {
        requestAnimationFrame(animate);

        dedecahedron.rotation.x += 0.01;
        dedecahedron.rotation.y += 0.01;

        box.rotation.y += 0.005;

        controls.update()

        renderer.render(scene, camera)

    }
    animate()

    window.addEventListener('resize', () => {
        // 相机宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        // 相机投影矩阵
        camera.updateProjectionMatrix();
        // 渲染器宽高比
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}
const initFromBlender = () => {
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

    // 添加轨道遥杆 可指定观察对象
    const controls = new OrbitControls(camera, renderer.domElement)
    // 阻尼惯性 系数
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // 自动旋转
    // controls.autoRotate = true;

    // 设置相机位置
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // 环境光颜色和强度
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 100); // 强度为 2
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 添加半球光
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemisphereLight.position.set(0, 1, 0);
    scene.add(hemisphereLight);

    const animate = () => {
        controls.update()
        requestAnimationFrame(animate);
        // 渲染
        renderer.render(scene, camera)
    }

    animate()


    /*  画布自适应窗口大小 */
    window.addEventListener('resize', () => {
        // 渲染器宽高比
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 相机宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        // 相机投影矩阵
        camera.updateProjectionMatrix();
    })

    let params = {}

    // 添加调试工具栏
    const gui = new GUI()

    //雾 线性
    // scene.fog = new THREE.Fog(0x999999, 0.1, 50);
    // 指数
    // scene.fog = new THREE.FogExp2(0x999999,0.1)

    // --------------------------------导入模型
    // 实例化加载器 gltf
    // 加载模型
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        './forest_new.glb',
        (gltf) => {
            console.log('success11', gltf)
            scene.add(gltf.scene)

            const fire = gltf.scene.getObjectByName('空物体005')?.getObjectByName('立方体009') as THREE.Mesh;
            if (fire) {
                fire.visible = false
                console.log('fire存在', fire);
            }
        },
        undefined,
        (error) => {
            console.log('An error happened', error)
        }
    )

    // 压缩
    // let dracoloader = new DRACOLoader();
    // dracoloader.setDecoderPath('')



    // 加载环境贴图
    // const rgbeLoader = new RGBELoader()
    // rgbeLoader.load('./grass.hdr', (envbg => {
    //     envbg.mapping = THREE.EquirectangularReflectionMapping;
    //     scene.environment = envbg
    //     console.log('envbg')
    // }))
}

export default init3d;

// export const a = 1;