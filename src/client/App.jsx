import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import SpaceInvader from "../Pages/SpaceInvaders";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";
import ChromeDino from "../Pages/ChromeDino";
import Account from "../Pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame />} />
      <Route path="/flappyBird" element={<FlappyBird />} />
      <Route path="/chromeDino" element={<ChromeDino />} />
      <Route path="/account" element={<Account />} />

      <Route path="/spaceInvader" element={<SpaceInvader />} />
    </Routes>
  );
}

export default App;
