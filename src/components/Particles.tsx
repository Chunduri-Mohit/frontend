// src/components/Particles.tsx
import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 25 });
    camera.position.set(0, 0, 20);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: window.innerWidth / window.innerHeight });
    };
    window.addEventListener("resize", resize);
    resize();

    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
    });

    const vertex = `
      attribute vec3 position;
      uniform mat4 modelMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 projectionMatrix;
      void main() {
        vec4 mvPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
        gl_PointSize = 75.0/ length(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragment = `
      precision highp float;
      void main() {
        gl_FragColor = vec4(1.0);
      }
    `;

    const program = new Program(gl, { vertex, fragment, transparent: true });
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    const animate = () => {
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 0] += velocities[i * 3 + 0];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap particles
        for (let j = 0; j < 3; j++) {
          if (positions[i * 3 + j] > 10) positions[i * 3 + j] = -10;
          if (positions[i * 3 + j] < -10) positions[i * 3 + j] = 10;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render({ scene: particles, camera });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default Particles;
