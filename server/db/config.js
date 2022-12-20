import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("facebook", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default db;
