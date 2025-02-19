import { useEffect } from "react";
import mapshaper from "mapshaper";

const MapChart = () => {
  useEffect(() => {
    mapshaper.gui.start({
      container: "#mapshaper-container",
    });
  }, []);

  return (
    <>
      <div id="mapshaper-container"></div>
    </>
  );
};

export default MapChart;
