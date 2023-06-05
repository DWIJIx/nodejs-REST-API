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
});

module.exports = {
  contactAddSchema,
};
