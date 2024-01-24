import React from "react";

const CloseBtn = () => {
  const handleCloseBtn = () => {
    window.history.back();
  };

  return (
    <button
      className="absolute top-4 right-4 bg bg-white text-xl text-black font-bold px-3 py-0.5 rounded-full"
      onClick={handleCloseBtn}
    >
      X
    </button>
  );
};

export default CloseBtn;
