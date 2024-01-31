import ScrollToTop from "../components/ScrollToTop";
import GameCards from "./GameCards";

const AllGames = () => {
  return (
    <>
      <section className=" w-screen flex flex-col justify-center items-center mt-[200rem] mb-28 bg-blue-50 bg-opacity-30">
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
