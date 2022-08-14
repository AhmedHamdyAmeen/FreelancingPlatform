const { check } = require("express-validator");

module.exports.post = [
  check("name")
    .notEmpty()
    .withMessage("skill name is required")
    .isString()
    .withMessage("skill name should be string")
    .isLength({ min: 3, max: 20 })
    .withMessage("skill name length should be between 3,20"),

  check("categories")
    .isArray({ max: 10 })
    .optional()
    .withMessage("skill categories should be array of numbers less than 11"),
];

module.exports.put = [
  check("name")
    .optional()
    .isString()
    .withMessage("skill name should be string")
    .isLength({ min: 3, max: 20 })
    .withMessage("skill name length should be between 3,20"),

  check("categories")
    .isArray()
    .optional()
    .withMessage("skill categories should be array of numbers"),
];

module.exports.getDelete = [
  check("id").isNumeric().withMessage("skill id should be number"),
];
