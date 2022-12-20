import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password, name, picturePath } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email: email, password: hashedPassword, name: name, picture: picturePath });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
};
