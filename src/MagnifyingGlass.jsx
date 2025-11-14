import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function MagnifyingGlass() {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(150, 150)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const magnifyingGlass = new THREE.Group()
    const outlineColor = 0x3b82f6

    // Frame (Torus)
    const frameGeo = new THREE.TorusGeometry(2.5, 0.2, 16, 100)
    const frameEdges = new THREE.EdgesGeometry(frameGeo)
    const frameMaterial = new THREE.LineBasicMaterial({ color: outlineColor, linewidth: 2 })
    const frame = new THREE.LineSegments(frameEdges, frameMaterial)
    magnifyingGlass.add(frame)

    // Lens
    const lensGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.1, 64)
    const lensMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xeeeeff, 
      transparent: true, 
      opacity: 0.15,
      side: THREE.DoubleSide
    })
    const lens = new THREE.Mesh(lensGeo, lensMaterial)
    lens.rotation.x = Math.PI / 2
    magnifyingGlass.add(lens)

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.3, 0.3, 4, 32)
    const handleEdges = new THREE.EdgesGeometry(handleGeo)
    const handleMaterial = new THREE.LineBasicMaterial({ color: outlineColor, linewidth: 2 })
    const handle = new THREE.LineSegments(handleEdges, handleMaterial)
    handle.position.y = -4.5
    magnifyingGlass.add(handle)

    magnifyingGlass.rotation.z = -Math.PI / 4
    scene.add(magnifyingGlass)

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      
      magnifyingGlass.position.x = Math.sin(elapsedTime * 0.5) * 0.5
      magnifyingGlass.position.y = Math.cos(elapsedTime * 0.7) * 0.3
      magnifyingGlass.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2
      magnifyingGlass.rotation.y = Math.cos(elapsedTime * 0.4) * 0.2

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '150px', height: '150px', margin: '0 auto' }} />
}

export default MagnifyingGlass
