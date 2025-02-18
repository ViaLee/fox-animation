import { useEffect } from "react";
import { init } from "./index";

function Initial() {
  useEffect(() => {
    console.log("222");
    init();
    console.log("111");
  }, []);

  return (
    <>
      <div>3d</div>
    </>
  );
}

export default Initial;
