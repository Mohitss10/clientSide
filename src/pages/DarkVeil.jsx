import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`;

/* your full fragment shader (same as you provided) */
const fragment = ` ... (keep your long fragment string here exactly as before) ... `;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    // Create renderer with alpha so background shows through
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
      alpha: true,
      antialias: true,
    });

    const gl = renderer.gl;
    // ensure transparent clear
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);
      const pixelW = Math.floor(w * resolutionScale);
      const pixelH = Math.floor(h * resolutionScale);

      // Set renderer to pixel resolution (this sets canvas width/height)
      renderer.setSize(pixelW, pixelH);

      // Tell shader the actual pixel resolution
      program.uniforms.uResolution.value.set(pixelW, pixelH);

      // Make sure canvas CSS size fills parent (in CSS pixels)
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let rafId = null;

    const loop = () => {
      // update time + dynamic uniforms each frame
      program.uniforms.uTime.value =
        ((performance.now() - start) / 1000) * speed;
      program.uniforms.uHueShift.value = hueShift;
      program.uniforms.uNoise.value = noiseIntensity;
      program.uniforms.uScan.value = scanlineIntensity;
      program.uniforms.uScanFreq.value = scanlineFrequency;
      program.uniforms.uWarp.value = warpAmount;

      // Optional: clear to transparent before render
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      try {
        mesh.geometry?.dispose?.();
        mesh.program?.dispose?.();
        renderer.gl.getExtension?.("WEBGL_lose_context")?.loseContext?.();
      } catch (e) {
        // ignore
      }
    };
  }, [
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    speed,
    scanlineFrequency,
    warpAmount,
    resolutionScale,
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background radial gradient (inline style ensures it works without Tailwind arbitrary) */}
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
        }}
      />

      {/* Shader canvas sits on top and is transparent so gradient shows through */}
      <canvas
        ref={ref}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
}
