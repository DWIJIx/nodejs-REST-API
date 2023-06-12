const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userSchemaMongoose } = require("../schemas/users-schemas");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const User = mongoose.model("user", userSchemaMongoose);

const regNewUser = async ({ password, email, subscription = "starter" }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  return newUser;
};

const login = async ({ password, email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  return {
    token,
    email: user.email,
    subscription: user.subscription,
  };
};

module.exports = {
  regNewUser,
  login,
  User,
};
