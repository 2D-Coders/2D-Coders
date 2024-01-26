import BackDropImg from "../components/BackDropImg";
import Register from "./Register";

const Home = () => {
  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="flex flex-col w-screen h-fit">
        <Register />
      </div>
      <BackDropImg />
    </div>
  );
};

export default Home;
