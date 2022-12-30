import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "./generateToken.js";

export const register = async (req, res) => {
  try {
    const { email, password, name, picturePath } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) return res.status(409).json({ message: `User already exists` });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email: email, password: hashedPassword, name: name, picturePath: picturePath });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user) return res.status(404).json({ message: `User does not exist` });

    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).json({ message: `Wrong password` });

    const { token } = await generateToken(user);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
