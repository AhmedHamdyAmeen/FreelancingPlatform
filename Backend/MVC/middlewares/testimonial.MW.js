const { check } = require("express-validator");
const { userTypes } = require("../helpers/enums");

module.exports.createTestimonialMW = [
  check("rating")
    .notEmpty()
    .withMessage("testimonial rating is required")
    .isNumeric()
    .withMessage("testimonial rating should be number")
    .isLength({ min: 1, max: 5 })
    .withMessage("testimonial rating length should be between 1,5"),

  check("comment")
    .notEmpty()
    .withMessage("testimonial comment is required")
    .isString({ min: 100, max: 500 })
    .withMessage("testimonial comment should be a string between 50 and 1000"),
];

// module.exports.put = [
//   check("rating")
//     .isNumeric()
//     .optional()
//     .withMessage("testimonial rating should be number")
//     .isLength({ min: 1, max: 5 })
//     .withMessage("testimonial rating length should be between 1,5"),

//   check("issued")
//     .isDate()
//     .optional()
//     .withMessage("testimonial issued should be date"),

//   check("comment")
//     .isString({ min: 50, max: 1000 })
//     .optional()
//     .withMessage("testimonial comment should be a string between 50 and 1000"),

//   check("project")
//     .isNumeric()
//     .optional()
//     .withMessage("testimonial project should be number"),
// ];

module.exports.deleteTestimonialMW = [
  check("id").isNumeric().withMessage("testimonial project shoud be number"),
  check("userType")
    .isIn(userTypes)
    .withMessage(`userType should be in ${userTypes}`),
];
