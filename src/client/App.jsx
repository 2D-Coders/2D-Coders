import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Register from "../Pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
