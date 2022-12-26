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
    const user = await Relationship.findAll({ attributes: ["followedUserId"], where: { followerUserId: id }, raw: true });
    const formattedFollowedUserId = await Promise.all(user.map((x) => x.followedUserId));
    const friends = await Promise.all(formattedFollowedUserId.map((id) => User.findByPk(id, { attributes: ["id", "name", "picture"], raw: true })));

    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await Relationship.findAll({ where: { followerUserId: id }, raw: true, attributes: ["followedUserId"] });
    const formattedFollowedUserId = await Promise.all(user.map((x) => x.followedUserId));

    if (formattedFollowedUserId.includes(+friendId)) {
      await Relationship.destroy({ where: { followerUserId: +id, followedUserId: +friendId } });
    } else {
      await Relationship.create({ followerUserId: +id, followedUserId: +friendId });
    }

    res.status(200).json(`Friendlist updated`);
  } catch (err) {
    res.status(500).json(err);
  }
};
