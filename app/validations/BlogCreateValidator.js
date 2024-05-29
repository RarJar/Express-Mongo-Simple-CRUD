const { body, validationResult } = require("express-validator");

const BlogCreateValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

const validatorMessages = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next();
};

module.exports = {
  BlogCreateValidator,
  validatorMessages,
};
