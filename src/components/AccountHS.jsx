import axios from "axios";
import React, { useEffect, useState } from "react";

const AccountHS = ({ gameName, gameId }) => {
  const [myHighScores, setMyHighScores] = useState([]);
  const [user, setUser] = useState(null);

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
    <div className="flex flex-col gap-2 ">
      <div className="w-full bg-black text-white h-[4rem] flex justify-center items-center rounded-lg">
        <h1>{gameName}</h1>
      </div>
      <section className="  w-[20rem] h-[30rem] rounded-lg bg-slate-100 text-black">
        <div>
          {myHighScores && (
            <div className="flex flex-col px-2">
              {myHighScores.map((highscore) => {
                return (
                  <div key={highscore.id}>
                    {highscore.userId === user.id &&
                    highscore.gameId === gameId ? (
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
  );
};

export default AccountHS;
