import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({ where: { id: id } });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserFriends = async (req, res) => {
  try {
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
