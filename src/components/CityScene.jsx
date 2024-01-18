import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CarModel } from "../client/assets/CarModel";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CityClouds } from "../client/assets/CityClouds";
import { CityFarBG } from "../client/assets/CityFarBG";
import { City } from "../client/assets/City";

const CityScene = () => {
  const defaultPosition = [-16, -2, 0];
  const [position, setPosition] = useState(defaultPosition);
  const [cameraX, setCameraX] = useState(0);
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0]);
  const [cities, setCities] = useState([]);

  // move car and camera along the x-axis on scroll
  const handleMouseScroll = (e) => {
    e.preventDefault();

    let sensitivity = 0.01;

    // Update the car's position based on the mouse scroll
    setPosition([
      position[0] + e.deltaY * sensitivity,
      position[1],
      position[2],
    ]);

    if (position[0] > 16) {
      // reset car position
      setPosition(defaultPosition);
    }

    // // Update the x-coordinate of the camera's position based on the mouse scroll
    // if (position[0] > 0) {
    //   setCameraX((prevX) => prevX + e.deltaY * sensitivity);
    //   return;
    // } else {
    //   setCameraX(0);
    // }
  };

  // useEffect(() => {
  //   if (position[0] > 0) {
  //     // Update the camera target to follow the car's position
  //     setCameraTarget([position[0] - 1, position[1] + 2, position[2]]);
  //     return;
  //   }
  // }, [position]);

  useEffect(() => {
    window.addEventListener("wheel", handleMouseScroll);
    return () => {
      window.removeEventListener("wheel", handleMouseScroll);
    };
  }, [position]);

  useEffect(() => {
    // Create an array of City components with different X-coordinates
    const clonedCities = Array.from({ length: 1 }, (_, index) => (
      <City
        key={index}
        position={[index * 51, -1.8, 0]}
        scale={[0.7, 0.7, 0.7]}
      />
    ));

    setCities(clonedCities);
  }, []);

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <Canvas
        className="w-screen h-screen bg-blue-100"
        shadows={{ type: "perspective", dithering: true }}
      >
        <PerspectiveCamera makeDefault position={[cameraX, -1, 10]} />
        <directionalLight
          intensity={6}
          position={[8, 20, 16]}
          rotation={[Math.PI / 4, 0, 0]}
        />

        <ambientLight intensity={1} />
        <CarModel position={position} rotation={[0, Math.PI, 0]} />
        <CityClouds position={[12, 2, -24]} />
        <CityClouds position={[-12, -2, -30]} />
        <CityFarBG position={[-16, 10, -10]} scale={[0.5, 0.5, 0.5]} />

        {cities}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={cameraTarget}
        />
      </Canvas>
    </div>
  );
};

export default CityScene;
