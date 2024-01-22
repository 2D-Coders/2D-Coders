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
        <ul className="flex gap-6">
          <Link to="/doodle">
            <div>1</div>
          </Link>
          <div>1</div>
          <div>1</div>
          <button onClick={handleLogOut}>Log Out</button>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
