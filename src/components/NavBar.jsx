import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
