"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Globe = ({ width = 800, height = 800 }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  // Enhanced star positions with varying sizes
  const starPositions = useMemo(() => {
    const positions = [];
    const sizes = [];
    const colors = [];

    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(x, y, z);

      // Varying star sizes
      sizes.push(Math.random() * 2);

      // Random star colors (white to blue)
      const color = new THREE.Color();
      color.setHSL(0.6, Math.random() * 0.3, 0.9);
      colors.push(color.r, color.g, color.b);
    }

    return {
      positions: new Float32Array(positions),
      sizes: new Float32Array(sizes),
      colors: new Float32Array(colors),
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with enhanced background
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000833, 0.0003);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 200;

    // Enhanced controls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 400;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.5;

    // Texture loader with loading manager
    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // Enhanced globe materials with normal mapping
    const globeGeometry = new THREE.SphereGeometry(100, 128, 128);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      map: textureLoader.load("/earth-map.jpg"),
      bumpMap: textureLoader.load("/earth-bump.jpg"),
      normalMap: textureLoader.load("/earth-normal.jpg"),
      roughnessMap: textureLoader.load("/earth-roughness.jpg"),
      bumpScale: 2,
      emissiveMap: textureLoader.load("/earth-night.jpg"),
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 1.5,
      metalness: 0.1,
      roughness: 0.8,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      transparent: true,
      opacity: 0.99,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Enhanced clouds with dynamic movement
    const cloudGeometry = new THREE.SphereGeometry(102, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load("/earth-clouds.png"),
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Enhanced atmosphere with dynamic aurora effects
    const atmosphereGeometry = new THREE.SphereGeometry(103, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        time: { value: 0 },
        viewVector: { value: camera.position },
        sunPosition: { value: new THREE.Vector3(500, 0, 200) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float intensity;
        uniform vec3 viewVector;
        uniform vec3 sunPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vec3 viewDirection = normalize(viewVector - position);
          vec3 sunDirection = normalize(sunPosition - position);
          intensity = pow(1.0 - abs(dot(vNormal, viewDirection)), 3.0) *
                     (0.5 + 0.5 * max(dot(vNormal, sunDirection), 0.0));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float intensity;
        uniform float time;

        void main() {
          vec3 baseGlow = vec3(0.1, 0.4, 1.0);
          vec3 auroraColor = vec3(0.1, 1.0, 0.5);
          float aurora = pow(sin(vPosition.y * 0.1 + time + sin(vPosition.x * 0.05) * 2.0), 2.0);
          vec3 finalColor = mix(baseGlow, auroraColor, aurora * 0.5);
          finalColor *= intensity;
          gl_FragColor = vec4(finalColor, intensity * 0.8);
        }
      `,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Enhanced star field
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions.positions, 3),
    );
    starsGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(starPositions.sizes, 1),
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starPositions.colors, 3),
    );

    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * uniform.pixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - (ll * 2.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Enhanced city markers with interactive features
    const cities = [
      { name: "New York", lat: 40.7128, lng: -74.006, population: "8.4M" },
      { name: "London", lat: 51.5074, lng: -0.1278, population: "9.0M" },
      { name: "Tokyo", lat: 35.6762, lng: 139.6503, population: "37.4M" },
      { name: "Sydney", lat: -33.8688, lng: 151.2093, population: "5.3M" },
      { name: "Dubai", lat: 25.2048, lng: 55.2708, population: "3.4M" },
      { name: "Singapore", lat: 1.3521, lng: 103.8198, population: "5.7M" },
      { name: "Mumbai", lat: 19.076, lng: 72.8777, population: "20.4M" },
      { name: "São Paulo", lat: -23.5505, lng: -46.6333, population: "22.0M" },
    ];

    // Create city markers with enhanced visuals
    const markerGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const markers = [];

    cities.forEach((city) => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lng + 180) * (Math.PI / 180);
      const radius = 101;

      // Create marker with glow effect
      const markerMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ffff) },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            gl_FragColor = vec4(color, 1.0) * intensity;
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.x = radius * Math.sin(phi) * Math.cos(theta);
      marker.position.y = radius * Math.cos(phi);
      marker.position.z = radius * Math.sin(phi) * Math.sin(theta);

      // Add connection lines between cities
      if (markers.length > 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          marker.position,
          markers[markers.length - 1].mesh.position,
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.3,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }

      scene.add(marker);
      markers.push({
        mesh: marker,
        city: city,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(500, 0, 200);
    scene.add(sunLight);

    // Dynamic colored lights
    const lights = [
      { color: 0x00ffff, intensity: 2, distance: 500, decay: 1.5 },
      { color: 0xff00ff, intensity: 2, distance: 500, decay: 1.5 },
      { color: 0xffff00, intensity: 2, distance: 500, decay: 1.5 },
    ].map(({ color, intensity, distance, decay }) => {
      const light = new THREE.PointLight(color, intensity, distance, decay);
      scene.add(light);
      return light;
    });

    // Animation loop with enhanced effects
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Update shaders and materials
      atmosphereMaterial.uniforms.time.value = time;
      atmosphereMaterial.uniforms.viewVector.value = camera.position;
      starsMaterial.uniforms.time.value = time;

      // Rotate clouds with varying speed
      clouds.rotation.y += 0.0005 * (1 + 0.5 * Math.sin(time * 0.2));

      // Animate markers and update city labels
      markers.forEach((marker, index) => {
        const pulseScale = 1 + Math.sin(time * 2 + marker.phase) * 0.2;
        marker.mesh.scale.setScalar(pulseScale);
        marker.mesh.material.uniforms.time.value = time;

        // Pulse intensity based on selection
        if (selectedCity === marker.city.name) {
          marker.mesh.scale.setScalar(pulseScale * 1.5);
        }
      });

      // Animate lights
      lights.forEach((light, i) => {
        const angle = time * 0.5 + (i * Math.PI * 2) / lights.length;
        light.position.x = Math.sin(angle) * 300;
        light.position.z = Math.cos(angle) * 300;
        light.intensity = 2 + Math.sin(time * 2) * 0.5;
      });

      controls.update();
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
      starsMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio();
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
          if (object.material.normalMap) object.material.normalMap.dispose();
          if (object.material.roughnessMap)
            object.material.roughnessMap.dispose();
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
  }, [width, height, starPositions, isAutoRotate, selectedCity]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      {/* Controls Panel */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors backdrop-blur-md bg-opacity-80"
          onClick={() => setIsAutoRotate(!isAutoRotate)}
        >
          {isAutoRotate ? "Stop Rotation" : "Start Rotation"}
        </button>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
            <div className="text-white text-xl font-semibold">
              Loading Globe...
            </div>
          </div>
        </div>
      )}

      {/* City Information Panel */}
      {selectedCity && (
        <div className="absolute top-4 left-4 p-4 bg-black bg-opacity-50 backdrop-blur-md rounded-lg text-white">
          <h3 className="text-xl font-bold mb-2">{selectedCity}</h3>
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-300"
            onClick={() => setSelectedCity(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Control Instructions */}

      {/* Stats Panel */}
    </div>
  );
};

export default Globe;
