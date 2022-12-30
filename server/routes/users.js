import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);

export default router;
