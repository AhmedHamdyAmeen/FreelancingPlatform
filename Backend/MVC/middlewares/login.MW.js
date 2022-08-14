const { check } = require("express-validator");
const { passwordRegex } = require("./../helpers/regex");


module.exports.loginVA = [
  /**********login**********/

  //email
  check("email")
    .notEmpty()
    .withMessage("user's email reqiured")
    .isEmail()
    .withMessage("user's email invalid"),
  //password
  check("password")
    .notEmpty()
    .withMessage("user's password reqiured")
    .matches(passwordRegex)
    .withMessage(
      "user's password should contain at least one digit, one uppercase letter, one lowercase letter, one special character"
    )
    .isLength({ min: 8, max: 15 })
    .withMessage("user's password should be 8~15"),
];

module.exports.oldPasswordVA = [
  check("oldPassword")
    .notEmpty()
    .withMessage("users's password required")
];

module.exports.ChangePasswordVA = [
  check("oldPassword")
    .notEmpty()
    .withMessage("Old Password required"),

  check("password")
    .notEmpty()
    .withMessage("New password required")
    .isLength({ min: 8, max: 15 })
    .withMessage("user's password should be 8~15"),
];

module.exports.signupVA = [
  // numeric auto incremented id
  check("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's id must be a number"),

  /**********signup**********/
  //name
  check("firstName")
    .notEmpty()
    .withMessage("user's first name reqiured")
    .isAlpha()
    .withMessage("user's firstname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("user firstname lenghth should be > 3"),
  check("lastName")
    .notEmpty()
    .withMessage("user's last name reqiured")
    .isAlpha()
    .withMessage("user's lastname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("user lastname lenghth should be > 3"),

  //email
  check("email")
    .notEmpty()
    .withMessage("user's email reqiured")
    .isEmail()
    .withMessage("user's email invalid"),
  //password
  check("password")
    .notEmpty()
    .withMessage("user's password reqiured")
    .matches(passwordRegex)
    .withMessage(
      "user's password should contain at least one digit, one uppercase letter, one lowercase letter, one special character"
    )
    .isLength({ min: 8, max: 15 })
    .withMessage("user's password should be 8~15"),
];
