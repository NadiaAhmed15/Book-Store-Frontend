import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SERVER_URL } from "../global";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = () => {
    axios
      .post(`${SERVER_URL}/user/signup`, { username, email, password })
      .then((res) => {
        setMessage(true);
        enqueueSnackbar("Sign Up Successfully, A verification link has been sent to your email. Please check your inbox.", { variant: "success" });
        navigate("/"); // Redirect to login after successful sign-up
      })
      .catch((error) => {
        enqueueSnackbar("Sign Up failed", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7134987/pexels-photo-7134987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, // Background image URL
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
        <h1 className="text-center mb-4">Sign Up</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
        {message && (
          <div
            className="text-center mt-3"
            style={{
              color: "green", 
              fontWeight: "bold", 
              fontSize: "1.1rem",
              padding: "10px",
              backgroundColor: "rgba(0, 255, 0, 0.1)", // Optional background color
              borderRadius: "5px"
            }}
          >
            <p>A verification link has been sent to your email. Please check your inbox.</p>
          </div>
        )}
        <button className="btn btn-primary w-100 mt-3" onClick={handleSignUp}>
          Sign Up
        </button>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
