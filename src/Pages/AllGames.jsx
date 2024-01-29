import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";

const AllGames = () => {
  return (
    <>
      <section className="w-screen flex flex-col justify-center items-center mt-[200rem] mb-28 bg-blue-50 bg-opacity-30">
        <div className="text-6xl font-bold my-4 text-black">Top 3 Games</div>
        <section className="flex justify-center px-10 w-screen">
          <div
            id="flappyBg"
            className="w-[30rem] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center "
          >
            <Link to="/flappyBird">
              <div className="left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
                PLAY
              </div>
            </Link>
          </div>

          <div
            id="doodleBG"
            className=" w-[30rem] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center"
          >
            <Link to="/doodlejump">
              <div className=" left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
                PLAY
              </div>
            </Link>
          </div>

          <div
            id="chromeDino"
            className=" w-[30rem] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center"
          >
            <Link to="/chromeDino">
              <div className=" left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
                PLAY
              </div>
            </Link>
          </div>
        </section>

        <div
          id="spaceInvaderBody"
          className=" w-[1000px] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center"
        >
          <Link to="/spaceInvader">
            <div className=" left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
              PLAY
            </div>
          </Link>
        </div>

        <ScrollToTop />
      </section>
    </>
  );
};

export default AllGames;

// have game div bounce on hover
