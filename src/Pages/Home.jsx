import CitySceneBG from "../components/CitySceneBG";
import Register from "./Register";

const Home = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="flex flex-col w-screen h-fit">
        <Register />
      </div>
      <div className="absolute -z-20 blur-lg">
        <CitySceneBG />
      </div>
    </div>
  );
};

export default Home;
