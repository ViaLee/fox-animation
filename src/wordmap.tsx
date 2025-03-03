/*
// 示例数据转换
import { feature } from "topojson-client"; // 处理数据
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

*/

import React, { useEffect, useRef } from "react";
import L from "leaflet";

const Wordmap = ({ center, zoom }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker(center).addTo(map).bindPopup("Hello, React Leaflet!").openPopup();

    const polyline = [
      [51.505, -0.09],
      [51.515, -0.1],
      [51.525, -0.11],
    ];

    L.polyline(polyline, { color: "red" }).addTo(map);

    map.on("click", (e) => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
    });

    return () => map.remove();
  }, [center, zoom]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
};

const Worldmap = () => {
  const defaultCenter = [121.44341299999996, 31.218516]; // 伦敦的经纬度
  const defaultZoom = 13;

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Leaflet Map Example</h1>
      </header>
      <Wordmap center={defaultCenter} zoom={defaultZoom} />
    </div>
  );
};

export default Worldmap;
