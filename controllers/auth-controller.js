const fs = require("fs/promises");
const path = require("path");
const { ctrlWrapper } = require("../decorators");
const userService = require("../models/user");
const Jimp = require("jimp");

const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const newUser = await userService.regNewUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const verify = async (req, res) => {
  const { verificationToken } = req.params;
  await userService.verify(verificationToken);
  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  await userService.resendVerifyEmail(email);
  res.json({ message: "Verification email sent" });
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

const logout = async (req, res) => {
  const { _id } = req.user;
  await userService.logout(_id);
  res.status(204).json({});
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, originalname } = req.file;
  const newName = `${_id}_${originalname}`;
  const newPath = path.join(avatarsPath, newName);
  const resultUpload = await Jimp.read(oldPath);
  resultUpload.resize(250, 250).write(oldPath);
  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", newName);
  await userService.updateAvatar(_id, avatarURL);
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
