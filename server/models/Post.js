import { DataTypes } from "sequelize";
import db from "../db/config.js";

const Post = db.define(
  "Post",
  {
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
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Post;
