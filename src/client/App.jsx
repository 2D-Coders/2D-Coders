import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame />} />
      <Route path="/flappyBird" element={<FlappyBird />} />
      {/* <Route path="/doodle" element={<DoodleJumpGame />} /> */}
    </Routes>
  );
}

export default App;
