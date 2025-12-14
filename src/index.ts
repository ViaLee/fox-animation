import * as THREE from "three";
import React, { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// gltf加载器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const init = () => {
  console.log("初始化Three.js场景...");
  // 确保容器存在
  const container = document.getElementById("three-container");
  if (!container) {
    console.error("找不到three-container元素");
    return;
  }
  console.log("找到three-container元素");

  // 创建场景
  const scene = new THREE.Scene();
  // 添加背景色以便看到canvas
  scene.background = new THREE.Color(0xdddddd);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45, //视角
    container.clientWidth / container.clientHeight,
    0.1, //近平面
    1000 //远平面
  );
  // 将相机向后移动以便看到模型
  camera.position.z = 5;

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  // 启用阴影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 清空容器并添加渲染器
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // 添加光源以便看到模型
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // 添加轨道遥杆 可指定观察对象
  const controls = new OrbitControls(camera, renderer.domElement);
  // 阻尼惯性 系数
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // 自动旋转
  // controls.autoRotate = true;

  // 设置相机位置
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // --------------------------------导入模型
  // 实例化加载器 gltf
  // 配置DRACOLoader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  );

  // 将DRACOLoader设置到GLTFLoader
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  // 加载模型 - 使用/public目录下的文件应以/开头
  console.log("开始加载模型...");
  gltfLoader.load(
    "/want.glb",
    // 成功回调
    (gltf) => {
      console.log("模型加载成功", gltf);
      scene.add(gltf.scene);

      // 输出场景中的所有对象
      console.log("场景中的对象:", gltf.scene);
      const objectNames: string[] = [];
      gltf.scene.traverse((child) => {
        console.log("对象名称:", child.name, "类型:", child.type);
        objectNames.push(child.name);
      });
      console.log("所有对象名称:", objectNames);

      // 尝试隐藏灯光（如果存在）
      const leftLight = gltf.scene.getObjectByName("左");
      if (leftLight) {
        leftLight.visible = false;
        console.log("已隐藏左灯光");
      }

      const rightLight = gltf.scene.getObjectByName("右");
      if (rightLight) {
        rightLight.visible = false;
        console.log("已隐藏右灯光");
      }

      // 尝试获取火的效果对象
      const fire = gltf.scene
        .getObjectByName("空物体005")
        ?.getObjectByName("立方体009");
      if (fire) {
        fire.visible = false;
        console.log("已隐藏火效果");
      }

      // 将模型置于合适的位置和大小
      gltf.scene.position.set(0, 0, 0);

      // 计算模型的包围盒以便调整相机
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      console.log("模型中心:", center);
      console.log("模型尺寸:", size);

      // 调整相机位置以便更好地查看模型
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5; // 增加一些边距

      camera.position.z = cameraZ;
      camera.lookAt(center);

      console.log("调整后的相机位置:", camera.position);

      // 添加颜色变化功能
      let colorIndex = 0;
      const colors = [
        new THREE.Color(0xff0000), // 红色
        new THREE.Color(0x00ff00), // 绿色
        new THREE.Color(0x0000ff), // 蓝色
        new THREE.Color(0xffff00), // 黄色
        new THREE.Color(0xff00ff), // 紫色
        new THREE.Color(0x00ffff), // 青色
        new THREE.Color(0xffffff), // 白色
      ];

      // 创建颜色变化函数
      const changeModelColor = () => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            // 为每个网格创建新的材质以避免共享材质问题
            if (Array.isArray(mesh.material)) {
              // 处理材质数组
              mesh.material = mesh.material.map((material) => {
                // 检查材质类型并相应地设置颜色
                if ((material as THREE.MeshStandardMaterial).color) {
                  const newMaterial = material.clone();
                  (newMaterial as THREE.MeshStandardMaterial).color =
                    colors[colorIndex];
                  return newMaterial;
                }
                return material;
              });
            } else {
              // 处理单个材质
              if ((mesh.material as THREE.MeshStandardMaterial).color) {
                const newMaterial = mesh.material.clone();
                (newMaterial as THREE.MeshStandardMaterial).color =
                  colors[colorIndex];
                mesh.material = newMaterial;
              }
            }
          }
        });
        colorIndex = (colorIndex + 1) % colors.length;
      };

      // 每3秒自动更换颜色
      setInterval(changeModelColor, 3000);

      // 添加点击事件监听器来手动更改颜色
      renderer.domElement.addEventListener("click", changeModelColor);
    },
    // 进度回调
    (progress) => {
      console.log("加载进度:", (progress.loaded / progress.total) * 100 + "%");
    },
    // 错误回调
    (error) => {
      console.error("模型加载失败:", error);
      // 添加一个错误提示立方体
      const errorGeometry = new THREE.BoxGeometry(1, 1, 1);
      const errorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const errorCube = new THREE.Mesh(errorGeometry, errorMaterial);
      scene.add(errorCube);
    }
  );

  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    // 渲染
    renderer.render(scene, camera);
  };

  console.log("启动动画循环...");
  animate();

  /*  画布自适应窗口大小 */
  const handleResize = () => {
    if (!container) return;
    // 渲染器宽高比
    renderer.setSize(container.clientWidth, container.clientHeight);
    // 相机宽高比
    camera.aspect = container.clientWidth / container.clientHeight;
    // 相机投影矩阵
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);
};

// 将Three.js场景包装成React组件
const ThreeScene = () => {
  // 使用useEffect确保只在客户端执行
  useEffect(() => {
    init();
  }, []);

  return React.createElement("div", {
    id: "three-container",
    style: { width: "100vw", height: "100vh" },
  });
};

export default ThreeScene;
