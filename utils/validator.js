const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    // username must be an email
    body("email").isEmail().withMessage('Not a valid e-mail address'),
    // password must be at least 5 chars long
    body("password", "Password must be 6 or more characters").isLength({ min: 6 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.render("registration", { extractedErrors });
};

module.exports = {
  userValidationRules,
  validate
};
