import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function CityClouds(props) {
  const { nodes, materials } = useGLTF("/models/City_clouds.gltf");
  const meshRef = useRef();

  // Animation function
  useFrame((state, delta) => {
    // Update the x position of the mesh to create animation
    meshRef.current.position.x += 0.0 * delta;

    // Reset x position if it goes beyond a certain point
    if (meshRef.current.position.x > 20) {
      meshRef.current.position.x = -20; // Reset to the starting point
    }
  });

  return (
    <group ref={meshRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.035"]}
        position={[0.482, -0.313, 1.564]}
      />
    </group>
  );
}

useGLTF.preload("/models/City_clouds.gltf");
