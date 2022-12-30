import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:postId/like", verifyToken, likePost);

/* CREATE */
router.post("/", verifyToken, createPost);

export default router;
