import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrentUser = () => {
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
  return (
    <>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )}
    </>
  );
};

export default CurrentUser;
