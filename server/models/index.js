import User from "./User.js";
import Post from "./Post.js";
import Like from "./Likes.js";

User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User);

User.hasMany(Like, {
  foreignKey: "likesUserId",
});
Like.belongsTo(User);
