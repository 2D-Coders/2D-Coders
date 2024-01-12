import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  return (
    <>
      <section className="w-screen h-screen center-vertical bg-gray-50">
        <div className="container-center  w-[60rem] h-[40rem] rounded-lg mx-auto text-black">
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
            className="btn-wht2blk-outline"
            type="submit"
          >
            Submit
          </button>
          <p>
            Already have an account,
            <span>
              <a className="font-bold" href="/login">
                {" "}
                click here{" "}
              </a>
            </span>
            to login
          </p>
        </div>
        <BackButton />
      </section>
    </>
  );
};

export default Register;
