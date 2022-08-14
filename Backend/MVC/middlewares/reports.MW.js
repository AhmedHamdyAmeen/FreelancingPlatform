const { check } = require("express-validator");
const { reportTypes } = require("../helpers/enums");

module.exports.postReportValidator = [
  //id
  check("id").optional().isNumeric().withMessage("invalid report id"),
  //category
  check("category").isIn(reportTypes).withMessage("invalid report category"),
  //id
  check("body")
    .optional()
    .isString()
    .withMessage("report body must be string")
    .isLength({ min: 100, max: 500 })
    .withMessage("report body must be between 100~500 characters"),

  //reported
  check("reported").isNumeric().withMessage("invalid reported id"),
];
