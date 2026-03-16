import React, { useEffect } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import Signup from "./Pages/Signup";
import { Login } from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { TaskManager } from "./Pages/TaskManager";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

export default function App() {

 useEffect(() => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />

        <Route
          path="/tasks"
          element={<PrivateRoute element={<TaskManager />} />}
        />

      </Routes>

    </BrowserRouter>
  );
}