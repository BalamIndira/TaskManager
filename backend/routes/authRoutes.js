const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Signup request:", req.body);
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    console.log("Validation failed: missing fields");
    return res.status(400).json("All fields are required");
  }

  if (password.length < 6) {
    console.log("Validation failed: password too short");
    return res.status(400).json("Password must be at least 6 characters");
  }

  try {
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed, creating user");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("User created:", user._id);
    res.json({
      message: "User created successfully",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle duplicate email error (MongoDB unique index)
    if (
      error.code === 11000 ||
      error.code === "11000" ||
      error.message?.includes("E11000")
    ) {
      return res.status(400).json("User already exists");
    }

    res.status(500).json(error.message || "Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(error.message || "Login failed");
  }
});

module.exports = router;
