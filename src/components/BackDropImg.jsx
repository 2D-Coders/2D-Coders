import React from "react";

const BackDropImg = () => {
  return (
    <div className="absolute -z-20 blur-lg">
      <img
        className="bg-cover bg-center w-screen h-screen"
        src="../../public/textures/CityImage.png"
        alt="background img"
      />
    </div>
  );
};

export default BackDropImg;
