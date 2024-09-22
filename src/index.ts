import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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

    // 创建三角形
    const geometry1 = new THREE.BufferGeometry();
    // 创建顶点数据, 逆时针正面
    const vertices = new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0
    ])
    // 添加属性
    geometry1.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    // 添加材质
    const g1Material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    })
    const plane = new THREE.Mesh(geometry1, g1Material)
    scene.add(plane)

    //创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })  //材质 十六进制
    const parentMaterial = new THREE.MeshBasicMaterial({ color: '#ff7f50' })  //材质
    parentMaterial.wireframe = true  //线框材质
    const parentCube = new THREE.Mesh(geometry, parentMaterial)
    const cube = new THREE.Mesh(geometry, material); //创建网格

    scene.add(parentCube)
    parentCube.add(cube)

    parentCube.position.set(-3, 0, 0)
    cube.position.set(3, 0, 0)
    // cube.scale.set(1,1,1,) //各轴放大倍数 相对于父级
    // 旋转  欧拉角
    cube.rotation.x = Math.PI / 4 //45度  相对于父级

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

    const animate = () => {
        controls.update()
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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


    // 添加调试工具栏
    const gui = new GUI()
    const eventObj = {
        FullScreen: function () {
            document.body.requestFullscreen();
            console.log('全屏');
        },
        ExitFullScreen: function () {
            document.exitFullscreen();
        }
    }
    gui.add(eventObj, 'FullScreen');   //.name('重命名')
    gui.add(eventObj, 'ExitFullScreen')


    // 控制位置
    // 创建层级 展开
    // gui.add(cube.position, 'x', -5, 5).name('立方体位置')// 限制x的范围方式一
    const folder = gui.addFolder('立方体')
    folder.add(cube.position, 'x').min(-10).max(10).step(1).name('x').onChange((val) => {
        console.log('x变化')
    })// 限制x的范围方式二
    // folder.add(cube.position, 'y').min(-10).max(10).step(1).name('y').onFinishChange((val) => {
    //     console.log('x变化')
    // })
    folder.add(cube.position, 'z').min(-10).max(10).step(1).name('z')

    // folder.add(parentMaterial, 'wireframe').name('父元素线框模式')

    // // 颜色修改
    // folder.addColor({ cubeColor: '#00ff00' }, 'cubeColor').name('子立方体颜色').onChange((val) => {
    //     cube.material.color.set(val)
    // })

}

export default init;

// export const a = 1;