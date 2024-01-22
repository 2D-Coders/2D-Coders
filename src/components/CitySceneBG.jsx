import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CityClouds } from "../client/assets/CityClouds";
import { CityFarBG } from "../client/assets/CityFarBG";
import { City } from "../client/assets/City";

const CitySceneBG = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <Canvas className="w-screen h-screen bg-blue-100">
        <PerspectiveCamera makeDefault position={[0, -1, 10]} fov={56} />
        <directionalLight
          intensity={6}
          position={[8, 20, 16]}
          rotation={[Math.PI / 4, 0, 0]}
        />
        <ambientLight intensity={1} />

        <CityClouds position={[12, 2, -24]} />
        <CityFarBG position={[-16, 16, -16]} />
        <City position={[0, -1.76, 0]} scale={[0.7, 0.7, 0.7]} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          // allow camera rotate only 10 degrees left and right
          minAzimuthAngle={-0.05}
          maxAzimuthAngle={0.05}
          // don't allow camera to rotate up and down
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          // rotate speed
          rotateSpeed={0.02}
        />
      </Canvas>
    </div>
  );
};

export default CitySceneBG;
