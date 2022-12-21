import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import db from "./db/config.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(express.static(__dirname + "/public"));

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 6001;

const start = async () => {
  try {
    await db.authenticate();
    await app.listen(PORT);
    console.log(`Server PORT: ${PORT} is listening`);
  } catch (err) {
    console.log(err);
  }
};

start();
