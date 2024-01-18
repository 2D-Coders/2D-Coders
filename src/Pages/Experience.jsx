import CityScene from "../components/CityScene";
import ScrollToBegin from "../components/ScrollToBegin";
import Register from "./Register";
import Login from "./Login";
import NavBar from "../components/NavBar";

const Experience = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      {/* <Register /> */}
      {/* <Login /> */}
      <NavBar />
      <ScrollToBegin />

      <CityScene />
    </div>
  );
};

export default Experience;
