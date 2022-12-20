import { DataTypes } from "sequelize";
import db from "../db/config.js";

const User = db.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default User;
