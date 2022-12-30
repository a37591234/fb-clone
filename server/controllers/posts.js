import Post from "../models/Post.js";
import Like from "../models/Likes.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const post = await Post.create({
      userId: userId,
      description: description,
      picturePath: picturePath,
      createdAt: Date.now(),
    });
    res.status(201).json({ post: post });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({ where: { userId: +userId }, raw: true });
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findByPk(postId, { raw: true });
    const isLiked = await Like.findOne({ where: { userId: userId, postId: +postId } });

    if (!post) return res.status(404).json({ messgae: `Post's not found` });

    if (isLiked) {
      await Like.destroy({ where: { userId: userId, postId: +postId } });
      await Post.decrement("likes", { where: { postId: +postId } });
    } else {
      await Like.create({ userId: userId, postId: +postId });
      await Post.increment("likes", { where: { postId: +postId } });
    }
    res.status(200).json({ message: `Successfully like or unlike` });
  } catch {
    res.status(409).json({ error: err.message });
  }
};
