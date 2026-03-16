const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json("No token");
  }

  // Support Authorization: Bearer <token>
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  console.log("Auth token:", token);
  console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verify failed:", error?.message);
    res.status(401).json("Invalid Token");
  }
};

module.exports = authMiddleware;
