"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function TechParticleSphere() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const mount = mountRef.current;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        // ENTRANCE ANIMATION
        let entranceProgress = 0;
        let cameraFinalZ = 5;
        camera.position.z = 2; // start closer → zoom out smoothly

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        // Background shouldn't block UI
        renderer.domElement.style.pointerEvents = "none";

        // Particle setup
        const particleCount = 2000;
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

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            const color = new THREE.Color();
            color.setHSL(0.6, 0.8, 0.55 + Math.random() * 0.2);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0, // fade-in on entrance
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Core glow
        const coreGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x0b74ff,
            transparent: true,
            opacity: 0, // fade-in later
            wireframe: true,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Ring
        const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x0b74ff,
            transparent: true,
            opacity: 0.10,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 4;
        scene.add(ring);

        // -----------------------
        // SCROLL SYSTEM
        // -----------------------
        let scrollY = 0;
        function onScroll() {
            scrollY = window.scrollY;
        }
        window.addEventListener("scroll", onScroll);

        // Scroll zoom → small at top, bigger when scrolled
        function getScrollZoom() {
            const zoomOut = 7;  // smaller
            const zoomIn = 3;   // bigger
            const t = Math.min(scrollY * 0.0005, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            return zoomOut + (zoomIn - zoomOut) * eased;
        }

        // Resize
        function onResize() {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener("resize", onResize);

        // Animation loop
        const clock = new THREE.Clock();
        let animationId = 0;

        function animate() {
            animationId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Entrance (fade + smooth zoom)
            if (entranceProgress < 1) {
                entranceProgress += 0.015;
                const ease = 1 - Math.pow(1 - entranceProgress, 3);

                material.opacity = 0.35 * ease;
                coreMat.opacity = 0.04 * ease;

                camera.position.z = 2 + (cameraFinalZ - 2) * ease;
            } else {
                // Scroll zoom effect
                camera.position.z += (getScrollZoom() - camera.position.z) * 0.05;
            }

            // ALWAYS rotating
            const baseRotY = 0.0012;
            const baseRotX = 0.0004;

            // Speed boost while scrolling
            const scrollBoost = Math.min(scrollY * 0.00002, 0.015);

            particles.rotation.y += baseRotY + scrollBoost;
            particles.rotation.x += baseRotX + scrollBoost * 0.4;

            core.rotation.y -= (baseRotY + scrollBoost * 0.8);
            ring.rotation.z += (baseRotY + scrollBoost * 0.5);

            // Particle wave motion
            const pos = geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const wave = Math.sin(elapsed * 2 + i * 0.1) * 0.1;

                pos[i3] += (originalPositions[i3] * (1 + wave) - pos[i3]) * 0.04;
                pos[i3 + 1] += (originalPositions[i3 + 1] * (1 + wave) - pos[i3 + 1]) * 0.04;
                pos[i3 + 2] += (originalPositions[i3 + 2] * (1 + wave) - pos[i3 + 2]) * 0.04;
            }

            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();

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

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 w-screen opacity-60 h-screen z-[-1]"
        />
    );
}
