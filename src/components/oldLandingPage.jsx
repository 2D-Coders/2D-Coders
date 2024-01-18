import React from "react";

const OldLandingPage = () => {
  const handleClickBtn = () => {
    console.log("click");
  };
  return (
    <>
      <section className="w-screen center-vertical cursor-default ">
        <div className="container-center h-screen">
          <ul className="container-center gap-2 text-2xl">
            <li className="font-semibold">&lt; 2D_Coders &gt;</li>
            <li className="text-sm font-extralight">presents</li>
            <span className="container-center my-4 gap-2">
              <li className="text-6xl font-bold type-writer">
                NAME OF GAME ????
              </li>
              <li className="font-extralight">May the force be with you</li>
            </span>
          </ul>

          <button className="btn-blue mt-8">LETS DO THIS!</button>
        </div>
      </section>

      <section className="overlay center-vertical text-black">
        <div className=" container-center h-screen bg-gradient-to-t from-green-100 to-blue-200">
          <ul className="container-center gap-2 text-2xl">
            <li className="font-semibold">&lt; 2D_Coders &gt;</li>
            <li className="text-sm ">presents</li>
            <span className="container-center my-4 gap-2">
              <li className="text-6xl font-bold type-writer">
                THE BEST GAME EVER!
              </li>
              <li>
                If you lose, you get nothing, if you win, you still get nothing!
              </li>
            </span>
          </ul>

          <button
            onClick={handleClickBtn}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-md my-4 hover:bg-blue-600 mt-8 hover:ring-4 hover:ring-blue-600"
          >
            LETS DO THIS!
          </button>
        </div>
      </section>
    </>
  );
};

export default OldLandingPage;
