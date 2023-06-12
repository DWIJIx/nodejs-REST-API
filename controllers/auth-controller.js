const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const userService = require("../models/user");

const register = async (req, res) => {
  const newUser = await userService.regNewUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const result = await userService.login(req.body);

  res.json(result);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
};
