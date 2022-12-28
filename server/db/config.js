import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const db = new Sequelize("facebook", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default db;
