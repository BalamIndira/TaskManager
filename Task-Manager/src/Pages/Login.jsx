import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      console.log("Attempting login with", email);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      setError("");
      console.log("Navigating to dashboard");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const responseData = err.response?.data;
      const message =
        typeof responseData === "string"
          ? responseData
          : responseData?.message || responseData?.error || "Login failed";
      setError(message);
    }
  };

  return (
    <div>
      <input
        className="border p-2 m-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 m-2">{error}</p>}
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
        Login
      </button>
      <p className="m-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};
