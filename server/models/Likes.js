import { DataTypes } from "sequelize";
import db from "../db/config.js";

const Like = db.define(
  "Like",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Like;
