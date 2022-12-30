import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  try {
    const payload = { userId: user.userId, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    return Promise.resolve({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default generateToken;
