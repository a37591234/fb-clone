import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = await req.get("Authorization");

    if (!token) return res.status(401).json(`Access denied`);
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json(`Access denied`);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
