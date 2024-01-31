import { Route, Routes } from "react-router-dom";
import Experience from "../Pages/Experience";
import DoodleJumpGame from "../Pages/DoodleJumpGame";
import SpaceInvader from "../Pages/SpaceInvaders";
import FlappyBird from "../Pages/FlappyBird";
import Home from "../Pages/Home";
import ChromeDino from "../Pages/ChromeDino";
import Account from "../Pages/Account";
import Jumpman from "../Pages/Jumpman";

function App() {
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   const getMe = async () => {
  //     try {
  //       const response = await axios.get("/api/users/me", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setUser(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   getMe();
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/doodleJump" element={<DoodleJumpGame />} />
      <Route path="/flappyBird" element={<FlappyBird />} />
      <Route path="/chromeDino" element={<ChromeDino />} />
      <Route path="/account" element={<Account />} />
      
      <Route path="/spaceInvader" element={<SpaceInvader />} />
      <Route path="/Jumpman" element={<Jumpman />} /> 
    </Routes>
  );
}

export default App;
