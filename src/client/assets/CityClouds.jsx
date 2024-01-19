import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function CityClouds(props) {
  const { nodes, materials } = useGLTF("/models/City_clouds.gltf");
  const meshRef = useRef();

  // Animation function
  useFrame((state, delta) => {
    const speed = 0.03; // Adjust the speed as needed
    const amplitude = 3; // Adjust the amplitude as needed

    // Update the x position of the mesh to create animation
    meshRef.current.position.x += delta * speed;

    // Use sine wave to create a smooth back-and-forth motion
    meshRef.current.position.x =
      Math.sin(state.clock.elapsedTime * speed) * amplitude;
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.035"]}
        position={[0.482, 1, 1.564]}
        scale={[1.5, 1.5, 1.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.035"]}
        position={[-6, -2, -4]}
      />
    </group>
  );
}

useGLTF.preload("/models/City_clouds.gltf");
