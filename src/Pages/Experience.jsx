import CityScene from "../components/CityScene";
import ScrollToBegin from "../components/ScrollToBegin";
import Register from "./Register";
import Login from "./Login";
import NavBar from "../components/NavBar";

const Experience = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="flex flex-col w-screen h-fit">
        <Register />
      </div>
      <div className="top-0 w-screen absolute z-20 bg-white bg-opacity-50">
        <NavBar />
      </div>
      <div className="bottom-28 absolute z-20 animate-bounce">
        <ScrollToBegin />
      </div>
      <div className="absolute -z-20">
        <CityScene />
      </div>
    </div>
  );
};

export default Experience;
