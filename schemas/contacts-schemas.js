const mongoose = require("mongoose");

const Joi = require("joi");
const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required().messages({
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
  name: Joi.string().alphanum().min(2).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const UpdateStatusContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const contactsSchemasMongoose = new mongoose.Schema({
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
});

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  UpdateStatusContactSchema,
  contactsSchemasMongoose,
};
