import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="text-black">
      <nav className="flex justify-between px-20 py-4 items-center">
        <h2>GameZone</h2>
        <ul className="flex gap-6 items-center">
          <li>
            <a href="#">Highscores</a>
          </li>
          <li>
            <a href="#">Account</a>
          </li>

          <button
            className="bg-black rounded-xl px-4 py-1 text-white hover:bg-slate-700"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
