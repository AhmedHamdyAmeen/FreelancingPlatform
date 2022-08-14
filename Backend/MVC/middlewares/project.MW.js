const { check } = require("express-validator");

module.exports.post = [
  check("title")
    .notEmpty()
    .withMessage("project title is required")
    .isString()
    .withMessage("project title should be string"),

  check("description")
    .notEmpty()
    .withMessage("project description is required")
    .isString()
    .withMessage("project description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("project description length should be between 100,1000"),

  check("isInternship")
    .isBoolean()
    .optional()
    .withMessage("isInternship should be boolean"),

  check("budget")
    .optional()
    .isInt({ min: 5 })
    .withMessage("project budget should be an interger begins form 5"),

  check("skills")
    .notEmpty()
    .withMessage("project skills is required")
    .isArray({ min: 3, max: 20 })
    .withMessage("project skills should be array 3:20"),

  check("duration")
    .notEmpty()
    .withMessage("project duration is required")
    .isNumeric()
    .withMessage("project duration should be number"),

  check("connects")
    .notEmpty()
    .withMessage("project members is required")
    .isInt({ min: 1, max: 20 })
    .withMessage("project members should be array 1:20"),
];

module.exports.put = [
  check("id").isNumeric().withMessage("project id shoud be number"),

  check("title")
    .isString()
    .optional()
    .withMessage("project title should be string"),

  check("description")
    .isString()
    .optional()
    .withMessage("project description should be string")
    .isLength({ min: 100, max: 1000 })
    .withMessage("project description length should be between 100,1000"),

  check("isInternship")
    .isBoolean()
    .optional()
    .withMessage("isInternship should be boolean"),

  check("budget")
    .isInt({ min: 5 })
    .optional()
    .withMessage("project budget should be an interger begins form 5"),

  check("skills")
    .isArray()
    .optional()
    .withMessage("project skills should be array 3:20"),

  check("duration")
    .isNumeric()
    .optional()
    .withMessage("project duration should be number"),

  check("connects")
    .isInt()
    .optional()
    .withMessage("project members should be array 1:20"),
];

module.exports.getDelete = [
  check("id").isNumeric().withMessage("project id shoud be number"),
];

module.exports.createProposal = [
  check("id").isNumeric().withMessage("project id shoud be number"),

  check("text")
    .notEmpty()
    .withMessage("proposal text is required")
    .isString()
    .withMessage("proposal text should be string"),
  check("files")
    .optional()
    .isArray()
    .withMessage("proposal files should be array"),
];
