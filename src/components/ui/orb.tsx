"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Color, Vec2 } from "ogl";

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  backgroundColor?: string;
  className?: string;
}

const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 res = uResolution.xy;
    vec2 st = (gl_FragCoord.xy * 2.0 - res) / min(res.x, res.y);
    
    // Mouse interaction distortion
    float d = length(st - uMouse);
    float mouseInfluence = smoothstep(0.8, 0.0, d) * uHover;
    
    vec2 shiftedSt = st + mouseInfluence * 0.15;
    
    float a = 0.0;
    float time = uTime * 0.3;
    
    // Fractal Brownian Motion like effect for the liquid look
    for (float i = 0.0; i < 6.0; ++i) {
      a += cos(i - time - a * shiftedSt.x);
      time += sin(shiftedSt.y * i + a);
    }
    
    vec3 col = vec3(
      cos(shiftedSt.x * a + time) * 0.5 + 0.5,
      cos(shiftedSt.y * a + time) * 0.5 + 0.5,
      sin(a + time) * 0.5 + 0.5
    );
    
    // Tint with uColor (Gold-ish)
    col = mix(col, uColor, 0.7);
    
    // Add some shine/specular
    float shine = pow(max(0.0, 1.0 - length(st)), 3.0);
    col += shine * 0.4;
    
    // Vignette/Circle mask
    float mask = smoothstep(0.95, 0.4, length(st));
    
    gl_FragColor = vec4(col, mask);
  }
`;

export default function Orb({
  hue = 45, // Golden hue
  hoverIntensity = 0.5,
  rotateOnHover = true,
  forceHoverState = false,
  backgroundColor = "transparent",
  className = "",
}: OrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new Vec2(0, 0));
  const targetMouseRef = useRef(new Vec2(0, 0));
  const hoverRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1 });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(0.98, 0.8, 0.1) }, // Luxury Gold (Approx hue 45)
          uResolution: { value: new Vec2() },
          uMouse: { value: new Vec2() },
          uHover: { value: 0 },
        },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 2 - 1;
      const y = -(((e.clientY - top) / height) * 2 - 1);
      targetMouseRef.current.set(x, y);
      hoverRef.current = 1;
    };

    const handleMouseLeave = () => {
      if (!forceHoverState) {
        hoverRef.current = 0;
      }
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    const update = (t: number) => {
      animationId = requestAnimationFrame(update);
      
      program.uniforms.uTime.value = t * 0.001;
      
      // Smooth mouse transition
      mouseRef.current.lerp(targetMouseRef.current, 0.05);
      program.uniforms.uMouse.value.copy(mouseRef.current);
      
      // Smooth hover transition
      const targetHover = forceHoverState ? 1 : hoverRef.current;
      program.uniforms.uHover.value += (targetHover * hoverIntensity - program.uniforms.uHover.value) * 0.1;

      renderer.render({ scene: mesh });
    };

    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      gl.canvas.remove();
    };
  }, [hue, hoverIntensity, forceHoverState]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
    />
  );
}
