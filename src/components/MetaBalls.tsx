import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Vec2, Camera } from 'ogl';

type MetaBallsProps = {
  color?: string;
  speed?: number;
  animationSize?: number;
  ballCount?: number;
  enableTransparency?: boolean;
  blurMarginPx?: number;
};

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform vec2 iAnimationArea;
uniform int iBallCount;
uniform vec3 iMetaBalls[50];
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
    vec2 coord = uv * iAnimationArea;
    float total = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBallCount) break;
        total += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    outColor = vec4(iColor * f, enableTransparency ? f : 1.0);
}
`;

const MAX_BALLS = 50;

type BallParams = {
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
  radius: number;
};

const MetaBalls: React.FC<MetaBallsProps> = ({
  color = '#ffffff',
  speed = 0.3,
  animationSize = 30,
  ballCount = 10,
  enableTransparency = false,
  blurMarginPx = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: 1, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r, g, b] = parseHexColor(color);

    const metaBallsUniform: Vec3[] = [];
    for (let i = 0; i < MAX_BALLS; i++) metaBallsUniform.push(new Vec3(0, 0, 0));

    const effectiveBallCount = Math.min(ballCount, MAX_BALLS);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime:              { value: 0 },
        iColor:             { value: new Vec3(r, g, b) },
        iAnimationArea:     { value: new Vec2(0, 0) },
        iResolution:        { value: new Vec3(0, 0, 1) },
        iBallCount:         { value: effectiveBallCount },
        iMetaBalls:         { value: metaBallsUniform },
        enableTransparency: { value: enableTransparency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const state = {
      halfW: 10,
      halfH: 10,
      blurMarginShader: 0,
    };

    // Params Lissajous générés une fois, stables pour toute la durée de vie du composant
    const ballParams: BallParams[] = [];
    for (let i = 0; i < MAX_BALLS; i++) {
      const rand = (offset: number) => seededRandom(i * 10 + offset);
      ballParams.push({
        freqX:  (0.3 + rand(0) * 0.7) * speed,
        freqY:  (0.3 + rand(1) * 0.7) * speed * (1 + (rand(2) - 0.5) * 0.4),
        phaseX: rand(3) * Math.PI * 2,
        phaseY: rand(4) * Math.PI * 2,
        radius: 0.5 + rand(5) * 1.5,
      });
    }

    function resize() {
      if (!container) return;
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);

      // CHANGEMENT : scale basé sur la width au lieu de la height
      // → l'espace shader est maintenant cohérent avec la largeur perçue
      const scale = animationSize / width;
      const areaW = width  * scale; // = animationSize, constant
      const areaH = height * scale; // proportionnel au ratio hauteur/largeur

      program.uniforms.iAnimationArea.value.set(areaW, areaH);
      program.uniforms.iResolution.value.set(width, height, 1);

      state.halfW = areaW / 2;
      state.halfH = areaH / 2;

      // Conversion blur px → unités shader, basé sur la width maintenant
      state.blurMarginShader = (blurMarginPx / width) * areaW;
    }

    window.addEventListener('resize', resize);
    resize();

    const startTime = performance.now();
    let animationFrameId: number;

    function update(t: number) {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      const { halfW, halfH, blurMarginShader } = state;

      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParams[i];
        const ampX = Math.max(halfW - p.radius - blurMarginShader, 0);
        const ampY = Math.max(halfH - p.radius - blurMarginShader, 0);
        const x = Math.sin(elapsed * p.freqX + p.phaseX) * ampX;
        const y = Math.sin(elapsed * p.freqY + p.phaseY) * ampY;
        metaBallsUniform[i].set(x, y, p.radius);
      }

      renderer.render({ scene, camera });
    }

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, speed, animationSize, ballCount, enableTransparency, blurMarginPx]);

  return <div ref={containerRef} className="w-full h-full relative" />;
};

export default MetaBalls;