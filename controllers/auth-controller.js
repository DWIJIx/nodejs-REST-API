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

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
