// middleman to handle auth
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

function authMiddleware(req, res, next) {
  // get token from  request
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
