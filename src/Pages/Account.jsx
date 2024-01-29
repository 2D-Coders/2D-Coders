import axios from "axios";
import React, { useEffect, useState } from "react";
import CitySceneBG from "../components/CitySceneBG";
import NavBar from "../components/NavBar";

const AccountTest = () => {
  const [user, setUser] = useState(null);

  const [myHighScores, setMyHighScores] = useState([]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getMe();
  }, []);

  useEffect(() => {
    const getMyHighScores = async () => {
      try {
        const response = await axios.get("/api/highscores");
        setMyHighScores(response.data);
      } catch (error) {
        console.error("Error fetching highscores:", error);
      }
    };
    getMyHighScores();
  }, []);

  return (
    <>
      <NavBar />
      <section className="absolute z-20 w-screen h-screen flex flex-col justify-center items-center">
        <div className="bg-white bg-opacity-50 p-20 rounded-lg items-center justify-center flex flex-col">
          <div className="flex justify-center items-center bg-blue-900 p-4 mb-8 w-[24rem] rounded-lg">
            {user && (
              <div>
                <h1>{user.username}</h1>
              </div>
            )}
          </div>
          <div className=" flex gap-20">
            <div className="flex flex-col gap-2 ">
              <div className="w-full bg-blue-900 text-white h-[4rem] flex justify-center items-center rounded-lg">
                <h1>Flappy Bird</h1>
              </div>
              <section className="  w-[20rem] h-[30rem] rounded-lg bg-slate-100 text-black">
                <div>
                  {myHighScores && (
                    <div className="flex flex-col px-2">
                      {myHighScores.map((highscore) => {
                        return (
                          <div key={highscore.id}>
                            {highscore.userId === user.id &&
                            highscore.gameId === 1 ? (
                              <h1>{highscore.score}</h1>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="w-full bg-blue-900 text-white h-[4rem] flex justify-center items-center rounded-lg">
                <h1>Doodle Jump</h1>
              </div>
              <section className="  w-[20rem] h-[30rem] rounded-lg bg-slate-100 text-black">
                <div>
                  {myHighScores && (
                    <div className="flex flex-col px-2">
                      {myHighScores.map((highscore) => {
                        return (
                          <div key={highscore.id}>
                            {highscore.userId === user.id &&
                            highscore.gameId === 2 ? (
                              <h1>{highscore.score}</h1>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="w-full bg-blue-900 text-white h-[4rem] flex justify-center items-center rounded-lg">
                <h1>Chrome Dino</h1>
              </div>

              <section className="  w-[20rem] h-[30rem] rounded-lg bg-slate-100 text-black ">
                <div>
                  {myHighScores && (
                    <div className="flex flex-col px-2">
                      {myHighScores.map((highscore) => {
                        return (
                          <div key={highscore.id}>
                            {highscore.userId === user.id &&
                            highscore.gameId === 3 ? (
                              <h1>{highscore.score}</h1>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </div>

          </div>
        </div>
      </section>
      <div className="blur-lg">
        <CitySceneBG />
      </div>
    </>
  );
};

export default AccountTest;
