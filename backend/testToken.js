const axios = require("axios");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjdkYzU1NTZhODFiNGIwMjFkZjI1NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzczNjYwNTI2fQ.DL5h9vHSkLeIKeg5Hi6ZNzFMMwqpFkapcadRbSmr1nc";

axios
  .get("http://localhost:5000/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => console.log("Success:", res.data))
  .catch((err) =>
    console.log("Error:", err.response?.status, err.response?.data),
  );
