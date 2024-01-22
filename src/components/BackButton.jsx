import { ArrowLeftCircle } from "lucide-react";
import React from "react";

const BackButton = () => {
  const handleBackBtn = () => {
    window.history.back();
  };
  return (
    <ArrowLeftCircle
      onClick={handleBackBtn}
      className="absolute z-50 left-8 top-20 text-black  hover:text-orange-600 cursor-pointer"
    />
  );
};

export default BackButton;
