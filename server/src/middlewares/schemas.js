const Joi = require("joi");

const addUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  type: Joi.string().valid("admin", "member", "user").required(),
  active: Joi.number().integer().min(0).max(1).default(1),
});

module.exports = { addUserSchema };
