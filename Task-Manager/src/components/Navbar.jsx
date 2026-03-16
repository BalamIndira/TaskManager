import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

const toggleDark = () => {
  const html = document.documentElement;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

  return (
    <div className="bg-blue-600 dark:bg-gray-900 text-white p-4 flex justify-between">

      <h1 className="font-bold text-lg">Task Manager</h1>

      <div className="space-x-4">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/tasks">Tasks</Link>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

        <button
          onClick={toggleDark}
          className="bg-gray-800 dark:bg-gray-600 px-3 py-1 rounded"
        >
          Dark / Light
        </button>

      </div>
    </div>
  );
};