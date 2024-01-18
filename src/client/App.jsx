import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<DoodleJumpGame />} />
    </Routes>
  );
}

export default App;
