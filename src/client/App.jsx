import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";
import ChromeDino from "../Pages/ChromeDino"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame />} />
      <Route path="/flappyBird" element={<FlappyBird />} />
      <Route path="/chromeDino" element={<ChromeDino />} />
    </Routes>
  );
}

export default App;
