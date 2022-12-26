import Post from "../models/Post.js";
import Like from "../models/Likes.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, desc, img } = req.body;
    const post = await Post.create({
      userId: userId,
      desc: desc,
      img: img,
      createdAt: Date.now(),
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json(err);
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.findAll({ raw: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.findAll({ where: { userId: +userId }, raw: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findByPk(id, { raw: true });
    const isLiked = await Like.findOne({ where: { userId: userId, postId: +id } });

    if (!post) return res.status(404).json(`Post's not found`);
    if (isLiked) {
      await Like.destroy({ where: { userId: userId, postId: +id } });
      await Post.decrement("likes", { where: { id: +id } });
    } else {
      await Like.create({ userId: userId, postId: +id });
      await Post.increment("likes", { where: { id: +id } });
    }
    res.status(200).json(`Successfully like or unlike`);
  } catch {
    res.status(409).json(err);
  }
};
