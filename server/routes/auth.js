import express from "express";
import upload from "../middleware/upload.js";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/register", upload.single("picture"), register);

export default router;
