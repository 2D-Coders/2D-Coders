import React from "react";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("register");
    // run axios to register user
    // if successful, redirect to login page
  };

  return (
    <>
      <section className="w-screen h-screen center-vertical">
        <div className="container-center">
          <form>
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
          </form>
          <button onClick={handleRegister} className="btn" type="submit">
            Register
          </button>
        </div>
      </section>
    </>
  );
};

export default Register;
