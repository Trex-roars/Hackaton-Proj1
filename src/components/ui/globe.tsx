// globe.tsx
"use client";
import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

interface GlobeProps {
  data: any[];
  globeConfig: {
    pointSize: number;
    globeColor: string;
    showAtmosphere: boolean;
    atmosphereColor: string;
    atmosphereAltitude: number;
    emissive: string;
    emissiveIntensity: number;
    shininess: number;
    polygonColor: string;
    ambientLight: string;
    directionalLeftLight: string;
    directionalTopLight: string;
    pointLight: string;
    arcTime: number;
    arcLength: number;
    rings: number;
    maxRings: number;
    initialPosition: { lat: number; lng: number };
    autoRotate: boolean;
    autoRotateSpeed: number;
  };
}

export function World({ data, globeConfig }: GlobeProps) {
  const globeRef = useRef<any>();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = globeConfig.autoRotate;
      globeRef.current.controls().autoRotateSpeed = globeConfig.autoRotateSpeed;
    }
  }, [globeConfig.autoRotate, globeConfig.autoRotateSpeed]);

  return (
    <Globe
      ref={globeRef}
      width={window.innerWidth}
      height={window.innerHeight}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundColor="rgba(0,0,0,0)"
      arcsData={data}
      arcColor="color"
      arcDashLength={globeConfig.arcLength}
      arcDashGap={1}
      arcDashAnimateTime={globeConfig.arcTime}
      arcAltitude="arcAlt"
      atmosphereColor={globeConfig.atmosphereColor}
      atmosphereAltitude={globeConfig.atmosphereAltitude}
      showAtmosphere={globeConfig.showAtmosphere}
    />
  );
}
