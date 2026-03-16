import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import axios from "axios";

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
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
        navigate("/login");
      } else {
        setError("Failed to load tasks");
      }
    }
  };

  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status: "completed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchTasks();
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <Navbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-gray-100 p-4 rounded mb-6">
          <input
            className="border p-2 mr-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 mr-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Task
          </button>
        </div>

        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onComplete={completeTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
