const emailValidator = require("email-validator");

module.exports = {
  isValidEmail: (email) => emailValidator.validate(email),
};
