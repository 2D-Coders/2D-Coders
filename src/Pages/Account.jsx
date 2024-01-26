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
        console.log(response.data);
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
        <div className="bg-white p-20 rounded-lg">
          <div className="flex justify-center items-center bg-slate-400 p-4 mb m-8 rounded-lg">
            {user && (
              <div>
                <h1>{user.username}</h1>
              </div>
            )}
          </div>
          <div className="flex gap-20">
            <section className="w-[20rem] h-[30rem] rounded-lg bg-slate-300 text-black">
              <h1>Flappy Bird</h1>
              <div>
                {myHighScores && (
                  <div className="flex flex-col">
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
            <section className="w-[20rem] h-[30rem] rounded-lg bg-slate-300 text-black">
              <h1>Doodle Jump</h1>
              <div>
                {myHighScores && (
                  <div className="flex flex-col">
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
            <section className="w-[20rem] h-[30rem] rounded-lg bg-slate-300 text-black">
              <h1>Chrome Dino</h1>
              <div>
                {myHighScores && (
                  <div className="flex flex-col">
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
            <section className="w-[20rem] h-[30rem] rounded-lg bg-slate-300 text-black">
              <h1>SpaceInvader</h1>
              <div>
                {myHighScores && (
                  <div className="flex flex-col">
                    {myHighScores.map((highscore) => {
                      return (
                        <div key={highscore.id}>
                          {highscore.userId === user.id &&
                          highscore.gameId === 4 ? (
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
      </section>
      <div className="blur-lg">
        <CitySceneBG />
      </div>
    </>
  );
};

export default AccountTest;

/* {highscore.userId === user.id &&
                          highscore.gameId === 1 ? (
                            <h1>{highscore.score}</h1>
                          ) : null} */
