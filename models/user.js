const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userSchemaMongoose } = require("../schemas/users-schemas");
const { HttpError, sendEmail } = require("../helpers");
const { SECRET_KEY, PROJECT_URL } = process.env;
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const User = mongoose.model("user", userSchemaMongoose);

const regNewUser = async ({ password, email, subscription = "starter" }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    password: hashPassword,
    email,
    avatarURL,
    subscription,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target = "_black" href="${PROJECT_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  sendEmail(verifyEmail);

  return newUser;
};

const verify = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const resendVerifyEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email is wrong");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target = "_black" href="${PROJECT_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  sendEmail(verifyEmail);
};

const login = async ({ password, email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Verification failed");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async (id, avatarURL) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

const updateAvatar = async (id, avatarURL) => {
  await User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
  regNewUser,
  verify,
  resendVerifyEmail,
  login,
  User,
  logout,
  updateAvatar,
};
