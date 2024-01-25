import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <section className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="flex">
        {user && (
          <div>
            <h1>{user.username}</h1>
          </div>
        )}
        {myHighScores && (
          <div className="flex gap-2">
            {myHighScores.map((highscore) => {
              return (
                <div key={highscore.id}>
                  {highscore.userId === user.id ? (
                    <h1>{highscore.score}</h1>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AccountTest;
