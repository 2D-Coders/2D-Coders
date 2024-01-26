import CityScene from "../components/CityScene";
import ScrollToBegin from "../components/ScrollToBegin";
import NavBar from "../components/NavBar";
import AllGames from "./AllGames";

const Experience = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <NavBar />
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
