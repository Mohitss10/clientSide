import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `...`; // same as your code
const fragment = `...`; // same as your code

export default function DarkVeilWithBG(props) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas.parentElement;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: props.hueShift || 0 },
        uNoise: { value: props.noiseIntensity || 0 },
        uScan: { value: props.scanlineIntensity || 0 },
        uScanFreq: { value: props.scanlineFrequency || 0 },
        uWarp: { value: props.warpAmount || 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w * (props.resolutionScale || 1), h * (props.resolutionScale || 1));
      program.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let frame = 0;

    const loop = () => {
      program.uniforms.uTime.value =
        ((performance.now() - start) / 1000) * (props.speed || 0.5);
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [props]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ✅ Radial Gradient Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* ✅ Shader Canvas Layer */}
      <canvas ref={ref} className="w-full h-full block" />
    </div>
  );
}
