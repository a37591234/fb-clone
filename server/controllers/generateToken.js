import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  try {
    const payload = { id: user.id, name: user.name };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "30d" });
    return Promise.resolve({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default generateToken;
