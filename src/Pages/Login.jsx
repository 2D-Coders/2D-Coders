import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("123");
  const [cantLogIn, setCantLogIn] = useState(false);
  const [succesLogIn, setSuccesLogIn] = useState(false);

  const navigate = useNavigate();

  const wrongPasswordUsername = () => {
    setCantLogIn(true);
    setTimeout(() => {
      setCantLogIn(false);
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("auth/login", {
        username,
        password,
      });

      console.log(response);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccesLogIn(true);
        navigate("/Home");
      } else {
        wrongPasswordUsername();
      }
    } catch (error) {
      // Handle the error, e.g., log it or display an error message
      console.error("Error during login:", error);
      wrongPasswordUsername();
    }
  };

  return (
    <>
      <section>
        {!succesLogIn ? (
          <div className="text-black container-center  w-[60rem] h-[40rem] rounded-lg mx-auto bg-white bg-opacity-80 cursor-default">
            <div className="container-center flex gap-4 my-4">
              <h1>Log In</h1>
              <p>Please enter your username and password</p>
            </div>
            <form className="text-white">
              <input
                className="py-1.5 px-4 rounded-md my-2"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                className="py-1.5 px-4 rounded-md my-2"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </form>
            {cantLogIn && (
              <p className=" my-2">
                Wrong username or password, please try again
              </p>
            )}
            <button
              onClick={handleLogin}
              className="btn-wht2blk-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Login;
