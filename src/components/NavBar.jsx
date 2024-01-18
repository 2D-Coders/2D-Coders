import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-screen h-screen  absolute z-30 text-black">
      <nav className="top-0 flex justify-between px-20 py-10">
        <h1>GameZone</h1>
        <ul className="flex gap-6">
          <Link to="/home">
            <div>1</div>
          </Link>
          <div>1</div>
          <div>1</div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
