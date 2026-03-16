import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load tasks");
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-2xl mb-4">My Tasks</h1>

        {error && <p className="text-red-500">{error}</p>}

        {tasks.map((task) => (
          <div key={task._id} className="border dark:border-gray-600 p-3 mb-2">
            {task.title} - {task.status}
          </div>
        ))}
      </div>
    </div>
  );
}
