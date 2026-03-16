import React from "react";

export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div>
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="mt-2">
        Status:<span className="ml-2 font-semibold">{task.status}</span>
      </p>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => onComplete(task._id)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Complete
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
