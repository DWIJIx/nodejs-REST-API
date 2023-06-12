const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const userSchemaMongoose = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

userSchemaMongoose.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
});

module.exports = {
  userSchemaMongoose,
  registerSchema,
  loginSchema,
};
