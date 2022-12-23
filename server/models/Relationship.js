import { DataTypes } from "sequelize";
import db from "../db/config.js";

const Relationship = db.define(
  "Relationship",
  {
    followerUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Relationship;
