import ScrollToTop from "../components/ScrollToTop";
import GameCards from "./GameCards";

const AllGames = () => {
  return (
    <>
      <section className=" w-screen flex flex-col justify-center items-center mt-[200rem] mb-28 bg-blue-50 bg-opacity-30">
        {/* <div className="text-6xl font-bold my-4 bg-black py-4 px-6 rounded-lg flex justify-center items-center">
          Top 3 Games
        </div> */}

        <section className="flex justify-center px-10 w-screen">
          <GameCards id="flappyBg" url="/flappyBird" />
          <GameCards id="doodleBG" url="/doodlejump" />
          <GameCards id="chromeDino" url="/chromeDino" />
        </section>
        <ScrollToTop />
      </section>
    </>
  );
};

export default AllGames;
