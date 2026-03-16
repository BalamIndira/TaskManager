(async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test",
        email: `test${Date.now()}@example.com`,
        password: "password123",
        role: "user",
      }),
    });

    console.log("status", res.status);
    const text = await res.text();
    console.log("body", text);
  } catch (err) {
    console.error("fetch error", err);
  }
})();
