import React from "react";
import { Link } from "react-router-dom";

const GameCards = ({ id, url }) => {
  return (
    <div>
      <div
        id={id}
        className="w-[30rem] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center "
      >
        <Link to={url}>
          <div className="left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
            PLAY
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GameCards;
