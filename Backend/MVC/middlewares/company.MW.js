const { body, param } = require("express-validator");

module.exports.bodyValidator = [
  body("id").isNumeric().withMessage("id should be number"),
];

module.exports.paramValidator = [
  param("id").isNumeric().withMessage("id should be number"),
];

module.exports.signUpValidator = [
  body("name").isAlpha().withMessage("name should be string"),
  body("email").isEmail().withMessage("company email invalid"),
  body("password")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}")
    .withMessage("company password invalid"),
];

module.exports.detailsValidator = [
  body("logo").isAlpha().withMessage("logo should be string"),
  body("website")
    .matches(
      "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)"
    )
    .withMessage("website not valid"),
  body("secondEmail").isEmail().withMessage("company email invalid"),
  body("phoneNumber")
    .matches("^01[0125][0-9]{8}$")
    .withMessage("phonenumber invaild"),
  body("location.postalCode")
    .optional()
    .isNumeric()
    .isLength({ min: 5, max: 5 })
    .withMessage("You entered invalid postalCode"),
  body("location.city")
    .optional()
    .isString()
    .withMessage("City name must be String"),
  body("location.address")
    .optional()
    .isString()
    .withMessage("Address must be String"),
  body("location.state")
    .optional()
    .isString()
    .withMessage("Address must be String"),
  body("description")
    .isString()
    .isLength({ min: 100, max: 500 })
    .withMessage("description must be a String"),
];

module.exports.infoValidator = [
  // body("isBlocked").Boolean().withMessage("isblocked should be boolean"),
  // body("isVerified").Boolean().withMessage("isVerfied should be boolean"),
  body("analytics.earnings")
    .optional()
    .isNumeric()
    .withMessage("earnings must be a string"),
  body("analytics.jobs")
    .optional()
    .isNumeric()
    .withMessage("jobs must be a string"),
  body("analytics.hours")
    .optional()
    .isNumeric()
    .withMessage("hours must be a string"),
  body("analytics.views")
    .optional()
    .isNumeric()
    .withMessage("views must be a string"),
  body("wallet").optional().isNumeric().withMessage("wallet must be a Number"),
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

