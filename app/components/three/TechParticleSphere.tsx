"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Optimized TechParticleSphere
 * - adaptive particle count (mobile => fewer particles)
 * - capped pixel ratio
 * - throttle heavy particle updates (waves/explode) to reduce CPU
 * - always-applied light rotation for smooth perception
 * - clamped scroll zoom (minZ / maxZ)
 */

export default function TechParticleSphere() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // size
    const width = Math.max(1, mount.clientWidth);
    const height = Math.max(1, mount.clientHeight);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Zoom clamp (these control how small/large the sphere can appear)
    const minCameraZ = 1;   // closest (largest sphere)
    const maxCameraZ = 5;   // farthest (smallest sphere)

    // Entrance settings
    let entranceProgress = 0;
    const entranceSpeed = 0.01;
    camera.position.z = 7; // start far (small) for entrance (you can tweak)

    // Adaptive particle count for perf (mobile => fewer)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const particleCount = isMobile ? 1200 : 2000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // cap pixel ratio to reduce GPU load
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.pointerEvents = "none"; // no blocking

    // Buffers
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const radius = 2;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(0.6, 0.8, 0.55 + Math.random() * 0.2);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0, // fade-in on entrance
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // core + ring
    const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0b74ff,
      transparent: true,
      opacity: 0, // entrance fade in
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0b74ff,
      transparent: true,
      opacity: 0.10,
    });
    
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 4;
    // scene.add(ring);

    // SCROLL
    let scrollY = 0;
    function onScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
    }
    window.addEventListener("scroll", onScroll);

    // Resize handler
    function onResize() {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // To throttle heavy updates
    let lastTime = 0;
    let accum = 0;
    const heavyUpdateInterval = 40; // ms -> ~25 updates/sec for heavy work

    const clock = new THREE.Clock();
    let animationId = 0;

    // Helper: compute scroll zoom clamped
    function getScrollZoomClamped() {
      // invert: top => far (maxCameraZ), bottom => near (minCameraZ)
      const t = Math.min(scrollY * 0.0005, 1); // normalized [0..1]
      const eased = 1 - Math.pow(1 - t, 3); // ease
      const target = maxCameraZ + (minCameraZ - maxCameraZ) * eased;
      // clamp just in case
      return Math.min(Math.max(target, minCameraZ), maxCameraZ);
    }

    // Lightweight continuous variables for rotation
    const baseRotY = isMobile ? 0.0009 : 0.0012;
    const baseRotX = isMobile ? 0.00025 : 0.0004;

    // Heavy particle update function (waves + optional explode) - run infrequently
    function heavyUpdate(elapsed: number) {
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // subtle wave
        const wave = Math.sin(elapsed * 2 + i * 0.1) * 0.08;
        pos[i3] += (originalPositions[i3] * (1 + wave) - pos[i3]) * 0.04;
        pos[i3 + 1] += (originalPositions[i3 + 1] * (1 + wave) - pos[i3 + 1]) * 0.04;
        pos[i3 + 2] += (originalPositions[i3 + 2] * (1 + wave) - pos[i3 + 2]) * 0.04;
      }
      geometry.attributes.position.needsUpdate = true;
    }

    // Main animation loop: always render each requestAnimationFrame for smoothness,
    // but only run heavyUpdate() every heavyUpdateInterval ms.
    function animate(time: number) {
      animationId = requestAnimationFrame(animate);

      // time is in ms
      const delta = time - lastTime;
      lastTime = time;
      accum += delta;

      const elapsed = clock.getElapsedTime();

      // Entrance animation (fade + zoom from starting z=7)
      if (entranceProgress < 1) {
        entranceProgress += entranceSpeed;
        const ease = 1 - Math.pow(1 - Math.min(entranceProgress, 1), 3);
        material.opacity = 0.35 * ease;
        coreMat.opacity = 0.04 * ease;
        // animate camera from start (7) to a mid resting point (5), but scroll zoom will override after entrance
        const startZ = 7;
        const midZ = 5;
        camera.position.z = startZ + (midZ - startZ) * ease;
      } else {
        // smooth camera zoom towards scroll target with clamping
        const targetZ = getScrollZoomClamped();
        camera.position.z += (targetZ - camera.position.z) * 0.06;
      }

      // Always apply small base rotation so it never feels static
      // Also add a scroll-based temporary boost (not too large)
      const scrollBoost = Math.min(scrollY * 0.00002, 0.015);
      particles.rotation.y += baseRotY + scrollBoost;
      particles.rotation.x += baseRotX + scrollBoost * 0.4;
      core.rotation.y -= (baseRotY + scrollBoost * 0.8);
      ring.rotation.z += (baseRotY + scrollBoost * 0.5);

      // only run heavy particle math occasionally
      if (accum >= heavyUpdateInterval) {
        heavyUpdate(elapsed);
        accum = 0;
      }

      renderer.render(scene, camera);
    }

    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.innerHTML = "";
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen z-[-1]" />;
}
