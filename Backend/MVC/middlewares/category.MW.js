const { check } = require("express-validator");

module.exports.post = [
  // check("name")
  //   .notEmpty()
  //   .withMessage("category name is required")
  //   .isString()
  //   .withMessage("category name should be string")
  //   .isLength({ min: 3, max: 20 })
  //   .withMessage("category name length should be between 3,15"),

  check("image")
    .isString()
    .optional()
    .withMessage("category image should be string"),
];

module.exports.put = [
  check("name")
    .isString()
    .optional()
    .withMessage("category name should be string")
    .isLength({ min: 3, max: 20 })
    .withMessage("category name length should be between 3,15"),

  check("image")
    .isString()
    .optional()
    .withMessage("category image should be string"),
];

module.exports.paramId = [
  check("id").isNumeric().withMessage("category id should be numeric"),
];
