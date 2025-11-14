import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function BlueprintHouse() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.set(0, 8, 20)
    camera.lookAt(0, 4, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x0a0a0a, 0)
    containerRef.current.appendChild(renderer.domElement)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 })
    const house = new THREE.Group()

    // Main body
    const mainBodyGeom = new THREE.BoxGeometry(8, 5, 6)
    const mainBodyEdges = new THREE.EdgesGeometry(mainBodyGeom)
    const mainBodyLines = new THREE.LineSegments(mainBodyEdges, lineMaterial)
    mainBodyLines.position.y = 2.5
    house.add(mainBodyLines)

    // Main roof
    const roofGeom = new THREE.BufferGeometry()
    const roofVertices = new Float32Array([
      -4.25, 5, 3.25, 4.25, 5, 3.25, 4.25, 5, 3.25, 0, 7.5, 3.25, 0, 7.5, 3.25, -4.25, 5, 3.25,
      -4.25, 5, -3.25, 4.25, 5, -3.25, 4.25, 5, -3.25, 0, 7.5, -3.25, 0, 7.5, -3.25, -4.25, 5, -3.25,
      -4.25, 5, 3.25, -4.25, 5, -3.25, 4.25, 5, 3.25, 4.25, 5, -3.25, 0, 7.5, 3.25, 0, 7.5, -3.25
    ])
    roofGeom.setAttribute('position', new THREE.BufferAttribute(roofVertices, 3))
    house.add(new THREE.LineSegments(roofGeom, lineMaterial))

    // Cross gable
    const crossGableGeom = new THREE.BoxGeometry(4, 4, 3)
    const crossGableEdges = new THREE.EdgesGeometry(crossGableGeom)
    const crossGableLines = new THREE.LineSegments(crossGableEdges, lineMaterial)
    crossGableLines.position.set(0, 2, 4.5)
    house.add(crossGableLines)

    // Cross gable roof
    const crossRoofGeom = new THREE.BufferGeometry()
    const crossRoofVertices = new Float32Array([
      -2, 4, 6, 2, 4, 6, 2, 4, 6, 0, 6, 6, 0, 6, 6, -2, 4, 6,
      -2, 4, 6, -2, 4, 3, 2, 4, 6, 2, 4, 3, 0, 6, 6, 0, 6, 3
    ])
    crossRoofGeom.setAttribute('position', new THREE.BufferAttribute(crossRoofVertices, 3))
    house.add(new THREE.LineSegments(crossRoofGeom, lineMaterial))

    // Left section
    const leftSectionGeom = new THREE.BoxGeometry(4, 2.5, 5.5)
    const leftSectionEdges = new THREE.EdgesGeometry(leftSectionGeom)
    const leftSectionLines = new THREE.LineSegments(leftSectionEdges, lineMaterial)
    leftSectionLines.position.set(-6, 1.25, 0)
    house.add(leftSectionLines)

    // Right section
    const rightSectionGeom = new THREE.BoxGeometry(4, 2.5, 5.5)
    const rightSectionEdges = new THREE.EdgesGeometry(rightSectionGeom)
    const rightSectionLines = new THREE.LineSegments(rightSectionEdges, lineMaterial)
    rightSectionLines.position.set(6, 1.25, 0)
    house.add(rightSectionLines)

    // Windows
    const windowGeom = new THREE.PlaneGeometry(1, 1)
    const windowEdges = new THREE.EdgesGeometry(windowGeom)
    const windows = [
      [-2, 3.5, 3.04], [2, 3.5, 3.04], [-2, 1.5, 3.04], [2, 1.5, 3.04],
      [-6, 1.25, 2.79], [6, 1.25, 2.79]
    ]
    windows.forEach(pos => {
      const w = new THREE.LineSegments(windowEdges, lineMaterial)
      w.position.set(...pos)
      house.add(w)
    })

    // Chimney
    const chimneyGeom = new THREE.BoxGeometry(0.5, 2, 0.5)
    const chimneyEdges = new THREE.EdgesGeometry(chimneyGeom)
    const chimneyLines = new THREE.LineSegments(chimneyEdges, lineMaterial)
    chimneyLines.position.set(2.5, 6, -1)
    house.add(chimneyLines)

    scene.add(house)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      house.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

export default BlueprintHouse
