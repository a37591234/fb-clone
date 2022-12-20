import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import db from "./db/config.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import authRoute from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(authRoute);

const PORT = process.env.PORT || 6001;

const test = async () => {
  try {
    await db.authenticate();
    await app.listen(PORT);
    console.log(`Server PORT: ${PORT} is listening`);
  } catch (err) {
    console.log(err);
  }
};

test();
