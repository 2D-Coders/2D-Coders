import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";
import ChromeDino from "../Pages/ChromeDino";
import Account from "../Pages/Account";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getMe();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame user={user} />} />
      <Route path="/flappyBird" element={<FlappyBird user={user} />} />
      <Route path="/chromeDino" element={<ChromeDino user={user} />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
