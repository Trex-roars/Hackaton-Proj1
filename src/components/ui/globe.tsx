"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Globe = ({ width = 800, height = 800 }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create point coordinates for background stars
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 200;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 400;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Create Earth texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create main globe
    const globeGeometry = new THREE.SphereGeometry(100, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load("/earth-map.jpg"), // You'll need to add this texture
      bumpMap: textureLoader.load("/earth-bump.jpg"), // And this one
      bumpScale: 1,
      emissiveMap: textureLoader.load("/earth-night.jpg"), // And this one
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 1,
      shininess: 5,
      transparent: true,
      opacity: 0.9,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        void main() {
          float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(
            vec3(0.1, 0.5, 1.0),  // Blue
            vec3(0.4, 0.7, 1.0),  // Light blue
            sin(time * 0.5) * 0.5 + 0.5
          );
          gl_FragColor = vec4(color, intensity);
        }
      `,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add stars background
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Add particle rings
    const ringGeometry = new THREE.RingGeometry(120, 122, 128);
    const ringMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.5,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Points(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(500, 0, 200);
    scene.add(sunLight);

    const pointLight = new THREE.PointLight(0x00ffff, 2, 500, 1.5);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    // Create random markers
    const markers = [];
    for (let i = 0; i < 20; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 101;

      const markerGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);

      marker.position.x = radius * Math.sin(theta) * Math.cos(phi);
      marker.position.y = radius * Math.sin(theta) * Math.sin(phi);
      marker.position.z = radius * Math.cos(theta);

      scene.add(marker);
      markers.push({
        mesh: marker,
        initialY: marker.position.y,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Update atmosphere shader
      atmosphereMaterial.uniforms.time.value = time;

      // Animate markers
      markers.forEach((marker) => {
        marker.mesh.position.y =
          marker.initialY + Math.sin(time + marker.phase) * 2;
        marker.mesh.scale.setScalar(0.8 + Math.sin(time + marker.phase) * 0.2);
      });

      // Rotate ring
      ring.rotation.z += 0.001;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    setIsLoading(false);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          if (object.material.bumpMap) object.material.bumpMap.dispose();
          if (object.material.emissiveMap)
            object.material.emissiveMap.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [width, height, starPositions]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        opacity: isLoading ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default Globe;
