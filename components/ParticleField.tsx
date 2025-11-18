import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ParticleField: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // particles
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 60
      positions[i3 + 1] = (Math.random() - 0.5) * 40
      positions[i3 + 2] = (Math.random() - 0.5) * 60
      speeds[i] = 0.001 + Math.random() * 0.01
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      size: 0.15,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // subtle directional light to give depth
    const l = new THREE.DirectionalLight(0xffffff, 0.2)
    l.position.set(5, 10, 7)
    scene.add(l)

    let frameId: number
    const clock = new THREE.Clock()

    function animate() {
      const t = clock.getElapsedTime()
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // jitter + slow upward motion + sinus wave for organic feel
        posAttr.array[i3] += Math.sin(t * speeds[i] + i) * 0.003
        posAttr.array[i3 + 1] += speeds[i] * 0.02
        posAttr.array[i3 + 2] += Math.cos(t * speeds[i] + i) * 0.002

        // wrap-around to keep particles in bounds
        if (posAttr.array[i3 + 1] > 25) posAttr.array[i3 + 1] = -25
      }
      posAttr.needsUpdate = true

      // slow rotation of entire field
      points.rotation.y += 0.0008
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    // responsive
    function onResize() {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    animate()

    // cleanup
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      // remove canvas
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild)
      }
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas w-full h-full absolute inset-0" />
}

export default ParticleField
