import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.patch("/:id/like", likePost);

/* CREATE */
router.post("/", createPost);

export default router;
