import CityScene from "../components/CityScene";
import ScrollToBegin from "../components/ScrollToBegin";
import NavBar from "../components/NavBar";
import AllGames from "./AllGames";
import { useEffect, useState } from "react";
import { CityFarBG } from "../client/assets/CityFarBG";

const Experience = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="top-0 w-screen fixed z-[600]  bg-white bg-opacity-80">
        <NavBar />
      </div>
      <div>
        <AllGames />
      </div>
      <div className="bottom-28 xl:bottom-48  absolute z-20">
        <ScrollToBegin />
      </div>
      <div className="fixed -z-20">
        <CityScene />
      </div>
    </div>
  );
};

export default Experience;
