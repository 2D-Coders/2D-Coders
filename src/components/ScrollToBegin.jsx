import React, { useEffect } from "react";

const ScrollToBegin = () => {
  useEffect(() => {
    const handleScroll = () => {
      let scroll = window.scrollY;
      let opacity = 1 - scroll / 300;

      // Check if the element with class "scroll-down" exists before manipulating its style
      const scrollDownElement = document.querySelector(".scroll-down");
      if (scrollDownElement) {
        scrollDownElement.style.opacity = opacity;
      }
    };

    // Add event listener to handle scroll
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-semibold bold scroll-down text-center animate-bounce ">
      <h1 className="text-6xl mb-4">WELCOME</h1>
      <h1 className="text-2xl mb-4">Scroll to begin</h1>
    </div>
  );
};

export default ScrollToBegin;
