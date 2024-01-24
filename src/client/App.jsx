import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame />} />
      <Route path="/flappyBird" element={<FlappyBird />} />
    </Routes>
  );
}

export default App;
