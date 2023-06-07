const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");
const contactAddSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const contactsSchemaMongoose = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

contactsSchemaMongoose.post("save", handleMongooseError);

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  updateStatusContactSchema,
  contactsSchemaMongoose,
};
