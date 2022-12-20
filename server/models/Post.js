import { DataTypes } from "sequelize";
import db from "../db/config.js";

export const Post = db.define("Post", {
  desc: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
