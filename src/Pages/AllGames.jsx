import ScrollToTop from "../Components/ScrollToTop";
import { Link } from "react-router-dom";

const AllGames = () => {
  return (
    <>
      <section className="w-screen flex justify-center items-center mt-[200rem] mb-28">
        <div
          id="flappyBg"
          className="w-[1000px] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center "
        >
          <Link to="/flappyBird">
            <div className="left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
              PLAY
            </div>
          </Link>
        </div>

        <div
          id="doodleBG"
          className=" w-[1000px] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center"
        >
          <Link to="/doodlejump">
            <div className=" left-0 cursor-pointer bottom-0 absolute text-6xl bg-black w-full font-sans p-4 mb-4">
              PLAY
            </div>
          </Link>
        </div>

        <div
          id="chromeDino"
          className=" w-[1000px] h-[700px] bg-green-50 m-12 rounded-xl shadow-2xl relative flex justify-center items-center"
        >
          <Link to="/chromeDino">
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
