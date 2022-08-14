const { body, param } = require("express-validator");

module.exports.bodyValidator = [
  body("id").isNumeric().withMessage("id should be number"),
];

module.exports.paramValidator = [
  param("id").isNumeric().withMessage("id should be number"),
];

module.exports.postValidator = [
  // body("skills").isNumeric().withMessage("skills should be Numeric"),
  body("productName").isString().withMessage("productName should be string"),
  body("description")
    .isString()
    .withMessage("description must be a String")
    .isLength({ min: 100, max: 500 })
    .withMessage("description must be more than 100 char"),
  body("price").isNumeric().withMessage("price should be Numeric"),
  body("ownerId").isNumeric().withMessage("ownerId should be Numeric"),
];

module.exports.putValidator = [
  body("productName")
    .optional()
    .isString()
    .withMessage("productName should be string"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 100, max: 500 })
    .withMessage("description must be a String"),
  body("price").optional().isNumeric().withMessage("price should be Numeric"),
  // body("skills").optional().isNumeric().withMessage("skills should be Numeric"),
];

module.exports.testimonialValidator = [
  body("rating")
    .notEmpty()
    .withMessage("freelancer testimonial rating is required")
    .isNumeric()
    .withMessage("testimonial rating should be number")
    .isLength({ min: 1, max: 5 })
    .withMessage("freelancer testimonial rating length should be between 1,5"),

  body("issued")
    .notEmpty()
    .withMessage("freelancer testimonial issued is required")
    .isDate()
    .withMessage("freelancer testimonial issued should be date"),

  body("comment")
    .notEmpty()
    .withMessage("freelancertestimonial comment is required")
    .isString({ min: 50, max: 1000 })
    .withMessage(
      "freelancer testimonial comment should be a string between 50 and 1000"
    ),

  body("project")
    .notEmpty()
    .withMessage("freelancer testimonial project is required")
    .isNumeric()
    .withMessage("freelancer testimonial project should be number"),
];
