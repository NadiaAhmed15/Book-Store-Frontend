import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../global";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post(`${SERVER_URL}/user/login`, { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log("Username:", username);

        // Store data in Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);

        // Show success message
        enqueueSnackbar("Login Successfully", { variant: "success" });

        // Navigate to the home page
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        // Show error message
        enqueueSnackbar("Login failed", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, // Replace with your desired image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)", // Slight transparency
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center mb-4">Login</h1>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
