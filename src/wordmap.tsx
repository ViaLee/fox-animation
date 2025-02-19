// 示例数据转换
import { feature } from "topojson-client";
import { multiPolygon } from "@turf/helpers";
import { Canvas } from "@react-three/fiber";

// Globe组件核心逻辑
import { useLoader } from "@react-three/fiber";
import { TextureLoader, SphereGeometry, MeshPhongMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { Line } from "@react-three/drei";

const processGeoData = (topojson) => {
  return feature(topojson, topojson.objects.countries).features;
};

const Globe = () => {
  const [texture, bumpMap] = useLoader(TextureLoader, [
    "/textures/earthmap.jpg",
    "/textures/elev_bump.jpg",
  ]);

  return (
    <mesh geometry={new SphereGeometry(100, 64, 64)}>
      <MeshPhongMaterial map={texture} bumpMap={bumpMap} bumpScale={0.05} />
    </mesh>
  );
};

const ProvinceBorders = ({ data }) => {
  return data.features.map((feature, i) => (
    <Line
      key={i}
      points={feature.geometry.coordinates}
      color="#ff2200"
      lineWidth={0.5}
    />
  ));
};

const Wordmap = () => {
  return (
    <Canvas camera={{ position: [0, 0, 300], fov: 45 }}>
      <Globe />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default Wordmap;
