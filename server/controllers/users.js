import User from "../models/User.js";
import Relationship from "../models/Relationship.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { userId: userId }, raw: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Relationship.findAll({ attributes: ["followedUserId"], where: { followerUserId: userId }, raw: true });
    const formattedFollowedUserId = await Promise.all(user.map((x) => x.followedUserId));
    const friends = await Promise.all(formattedFollowedUserId.map((userId) => User.findByPk(userId, { attributes: ["userId", "name", "picturePath"], raw: true })));

    res.status(200).json({ friends: friends });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await Relationship.findAll({ where: { followerUserId: +userId }, raw: true, attributes: ["followedUserId"] });
    const formattedFollowedUserId = await Promise.all(user.map((x) => x.followedUserId));

    if (formattedFollowedUserId.includes(+friendId)) {
      await Relationship.destroy({ where: { followerUserId: +userId, followedUserId: +friendId } });
    } else {
      await Relationship.create({ followerUserId: +userId, followedUserId: +friendId });
    }

    res.status(200).json({ message: `Friendlist updated` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
