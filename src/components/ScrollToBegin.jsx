import React from "react";

const ScrollToBegin = () => {
  // fade on scroll
  window.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    let opacity = 1 - scroll / 300;
    document.querySelector(".scroll-down").style.opacity = opacity;
  });

  return (
    <div className="font-semiboldbold scroll-down text-center animate-bounce">
      <h1 className="text-6xl mb-4">WELCOME</h1>
      <p>SCROLL TO BEGIN</p>
    </div>
  );
};

export default ScrollToBegin;
