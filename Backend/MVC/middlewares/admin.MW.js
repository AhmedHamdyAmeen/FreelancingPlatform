const { check } = require("express-validator");

module.exports.signupValidator = [
  // numeric auto incremented id
  check("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("admin's id must be a number"),

  /**********signup**********/
  //name
  check("firstName")
    .notEmpty()
    .withMessage("admin's first name reqiured")
    .isAlpha()
    .withMessage("admin's firstname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("admin firstname lenghth should be > 3"),
  check("lastName")
    .notEmpty()
    .withMessage("admin's last name reqiured")
    .isAlpha()
    .withMessage("admin's lastname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("admin lastname lenghth should be > 3"),
  //email
  check("email")
    .notEmpty()
    .withMessage("admin's email reqiured")
    .isEmail()
    .withMessage("admin's email invalid"),
  //password
  check("password")
    .notEmpty()
    .withMessage("admin's password reqiured")
    .isLength({ min: 8, max: 15 })
    .withMessage("admin's password should be 8~15"),
];

module.exports.putValidator = [
  // numeric auto incremented id
  param("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("admin's id must be a number"),

  //name
  check("firstName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("admin's firstname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("admin firstname lenghth should be > 3"),

  check("lastName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("admin's lastname should be characters")
    .isLength({ min: 3, max: 14 })
    .withMessage("admin lastname lenghth should be > 3"),

  /**********update profile**********/
  //address
  check("postalCode")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("admin's postalCode is invalid")
    .isLength({ min: 5, max: 5 })
    .withMessage("admin's postalCode is invalid"),
  check("city")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("admin's city must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("admin's city is invalid"),
  check("state")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("admin's state must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("admin's state is invalid"),
  check("address")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("admin's address is invalid")
    .isLength({ min: 5, max: 20 })
    .withMessage("admin's address is invalid"),

  //title
  check("title")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 5, max: 15 })
    .withMessage("admin's title must be 5~15"),

  //image
  check("profileImage")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 5 })
    .withMessage("admin's image is invalid"),
];
