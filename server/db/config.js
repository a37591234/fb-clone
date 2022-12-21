import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const db = new Sequelize("facebook", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default db;
