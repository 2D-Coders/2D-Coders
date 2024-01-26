import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const goToAllGames = () => {
  //   navigate("/");
  // };

  const goToAccount = () => {
    navigate("/account");
  };

  return (
    <div className="top-0 w-screen fixed z-[600]  bg-white bg-opacity-80 text-black">
      <nav className="flex justify-between px-20 py-4 items-center">
        <Link to={"/experience"}>
          <h2> GameZone</h2>
        </Link>
        <ul className="flex gap-6 items-center">
          {/* <li>
            <button onClick={goToAllGames}>Games</button>
          </li> */}
          <li>
            <button onClick={goToAccount}>Account</button>
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
