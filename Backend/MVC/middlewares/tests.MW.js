const { check } = require("express-validator");

module.exports.postTestValidator = [
  //id
  check("id").optional().isNumeric().withMessage("invalid test id"),
  //duration
  check("duration").isNumeric().withMessage("test duration must be a number (in minutes)"),
  //category
  check("skills").isNumeric().withMessage("test skills id must be a number"),
  //body
  check("body")
    .isString()
    .withMessage("test body must be string"),
  //badges
  check("badges").notEmpty().isAlpha().withMessage("invalid test badge").isLength({max:25}),
];
