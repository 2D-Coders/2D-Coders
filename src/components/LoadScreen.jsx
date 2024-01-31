import React from "react";
import { Loader } from "@react-three/drei";

const LoadScreen = () => {
  return (
    <Loader
      containerStyles={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      barStyles={{
        backgroundColor: "black",
        height: "10px",
      }}
      dataStyles={{
        color: "black",
      }}
    />
  );
};

export default LoadScreen;
