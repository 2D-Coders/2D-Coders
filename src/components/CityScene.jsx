import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CarModel } from "../client/assets/CarModel";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CityClouds } from "../client/assets/CityClouds";
import { CityFarBG } from "../client/assets/CityFarBG";
import { City } from "../client/assets/City";
import { CityCars } from "../client/assets/CityCars";

const CityScene = () => {
  const defaultPosition = [-16, -2, 0];
  const trafficDefaultPosition = [26, -1.74, 0];
  const [position, setPosition] = useState(defaultPosition);
  const [traffic, setTraffic] = useState(trafficDefaultPosition);

  // move car and camera along the x-axis on scroll
  const handleMouseScroll = (e) => {
    let sensitivity = 0.02;
    let currentPosition = position[0] + e.deltaY;

    // Update the car's position based on the mouse scroll
    setPosition([
      position[0] + e.deltaY * sensitivity,
      position[1],
      position[2],
    ]);
    // Update the traffic's position based on the mouse scroll
    setTraffic([traffic[0] - e.deltaY * sensitivity, traffic[1], traffic[2]]);

    if (position[0] > 12) {
      // reset car position
      setPosition(defaultPosition);
      return;
    }

    if (currentPosition < 0) {
      // reset car position
      setPosition(defaultPosition);
      setTraffic(trafficDefaultPosition);

      return;
    }

    if (traffic[0] < -26) {
      // reset traffic position
      setTraffic(trafficDefaultPosition);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleMouseScroll);
    return () => {
      window.removeEventListener("wheel", handleMouseScroll);
    };
  }, [position, traffic]);

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <Canvas
        className="w-screen h-screen bg-blue-100"
        shadows={{ type: "perspective", dithering: true }}
      >
        <PerspectiveCamera makeDefault position={[0, -1, 10]} fov={56} />
        <directionalLight
          intensity={6}
          // intensity={0.4}
          position={[8, 20, 16]}
          rotation={[Math.PI / 4, 0, 0]}
        />
        <ambientLight
          intensity={1}
          // intensity={0.15}
        />

        <CarModel
          position={position}
          rotation={[0, Math.PI, 0]}
          scale={[1.1, 1.1, 1.1]}
        />

        <CityClouds position={[12, 2, -24]} />
        <CityFarBG position={[-16, 16, -16]} />
        <CityCars position={traffic} scale={[0.78, 0.78, 0.78]} />
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

export default CityScene;
