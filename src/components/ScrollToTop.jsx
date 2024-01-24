import { ArrowUpIcon } from "lucide-react";
import React from "react";

const ScrollToTop = () => {
  const handleUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <ArrowUpIcon
      className="fixed cursor-pointer right-10 bottom-10 z-50 w-10 h-10 p-2 rounded-full bg-white text-black"
      onClick={handleUpBtn}
    />
  );
};

export default ScrollToTop;
