import axios from "axios";
import React, { useEffect, useState } from "react";
import LogIn from "./Login";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  const [checkToken, setCheckToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckToken(true);
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    // run axios to register user
    try {
      const response = await axios.post("auth/register", {
        username,
        password,
        email,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);

      if (response.data.token) {
        setToggleLogin(true);
        console.log("Register successful");
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  return (
    <>
      <section>
        {!toggleLogin ? (
          <div className="container-center  w-[60rem] h-[40rem] rounded-lg mx-auto text-black bg-white bg-opacity-80 cursor-default">
            <div className="container-center flex gap-4 my-4">
              <h1>Register</h1>
              <p>Please enter a username, password, and email</p>
            </div>
            <form className="text-white">
              <input
                className="py-1.5 px-4 rounded-md my-2 focus:shadow-lg focus:shadow-gray-400 focus:outline-1"
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
              <input
                className="py-1.5 px-4 rounded-md my-2"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
            <button
              onClick={handleRegister}
              className="btn-wht2blk-outline mb-6"
              type="submit"
            >
              Submit
            </button>
            <p>
              Already have an account,
              <span>
                <a
                  className="font-bold mx-1.5 cursor-pointer"
                  onClick={setToggleLogin}
                >
                  click here
                </a>
              </span>
              to login
            </p>
          </div>
        ) : (
          <LogIn />
        )}
      </section>
    </>
  );
};

export default Register;
