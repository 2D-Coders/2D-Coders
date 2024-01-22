import { ArrowUpIcon } from "lucide-react";
import DoodleJumpGame from "./DoodleJumpGame";
import FlappyBird from "./FlappyBird";
import { useState } from "react";

const AllGames = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreenBtn = () => {
    setFullscreen(!fullscreen);
  };

  const handleUpBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="w-screen flex flex-col justify-center items-center mt-[300rem] xl:mt-[560rem]">
        <div
          className={`${
            fullscreen
              ? "w-screen h-screen p-20 transition-all duration-500 ease-in-out"
              : "w-[1000px] h-[700px]"
          }  my-28  relative flex flex-col justify-center items-center`}
        >
          <DoodleJumpGame />
          {!fullscreen ? (
            <button
              onClick={handleFullscreenBtn}
              className="p-4 bg-red-400 absolute"
            >
              PLAY
            </button>
          ) : (
            <button
              onClick={handleFullscreenBtn}
              className="absolute top-20 right-10 font-bold"
            >
              X
            </button>
          )}
        </div>
        <div className="w-[1000px] h-[700px] bg-green-50 my-28 rounded-xl shadow-2xl relative flex justify-center items-center">
          <FlappyBird />
        </div>
        <div className="w-[1000px] h-[700px] bg-green-50 my-64 rounded-xl shadow-2xl">
          Hello
        </div>
        <div className="w-[1000px] h-[700px] bg-green-50 my-64 rounded-xl shadow-2xl">
          Hello
        </div>
        <div className="w-[1000px] h-[700px] bg-green-50 my-64 rounded-xl shadow-2xl">
          Hello
        </div>
        <div className="w-[1000px] h-[700px] bg-green-50 my-64 rounded-xl shadow-2xl">
          Hello
        </div>
        <ArrowUpIcon
          className="fixed cursor-pointer right-10 bottom-10 z-50 w-10 h-10 p-2 rounded-full bg-white text-black"
          onClick={handleUpBtn}
        />
      </section>
    </>
  );
};

export default AllGames;
