(async () => {
  const axios = require("axios");
  try {
    const login = await axios.post("http://localhost:5000/api/auth/login", {
      email: "test2@example.com",
      password: "password123",
    });
    const token = login.data.token;
    console.log("token", token);

    const tasksRes = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("tasks", tasksRes.data);
  } catch (e) {
    console.error("error", e.response?.status, e.response?.data, e.message);
  }
})();
