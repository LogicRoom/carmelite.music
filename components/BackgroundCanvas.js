import { useEffect, useRef } from "react";
import { initBackgroundAnimation } from "../lib/backgroundAnimation";
import styles from "./BackgroundCanvas.module.css";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    return initBackgroundAnimation(canvasRef.current);
  }, []);

  return <canvas id="background-canvas" ref={canvasRef} className={styles.canvas} />;
}
