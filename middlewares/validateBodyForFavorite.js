const { HttpError } = require("../helpers");

const validateBodyForFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing field favorite");
    } else if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBodyForFavorite;
