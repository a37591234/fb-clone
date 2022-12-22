import User from "../models/User.js";
import Relationship from "../models/Relationship.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Relationship.findAll({ where: { followerUserId: id } });
    const friends = await Promise.all(user.followedUserId.map((id) => User.findByPk(id)));
    const formattedFriends = friends.map(({ id, name, picture }) => {
      id, name, picture;
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};
