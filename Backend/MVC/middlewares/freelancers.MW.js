const { check, param } = require("express-validator");
const { languages } = require("../helpers/enums");

module.exports.putValidator = [
  // numeric auto incremented id
  param("id")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's id must be a number"),

  //name
  check("firstName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's firstname should be characters")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer firstname lenghth should be > 3"),

  check("lastName")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's lastname should be characters")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer lastname lenghth should be > 3"),

  /**********update profile**********/
  //phone
  check("phoneNumber")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 11, max: 11 })
    .withMessage("freelancer's phoneNumber is invalid"),

  //address
  check("postalCode")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's postalCode is invalid")
    .isLength({ min: 5, max: 5 })
    .withMessage("freelancer's postalCode is invalid"),
  check("city")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's city must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's city is invalid"),
  check("state")
    .optional({ checkFalsy: true, nullable: true })
    .isAlpha()
    .withMessage("freelancer's state must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's state is invalid"),
  check("address")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("freelancer's address is invalid")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's address is invalid"),

  //hourly rate
  check("hourlyRate")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's hourly rate is invalid"),

  //hour per week
  check("hoursPerWeek")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("freelancer's hoursPerWeek is invalid"),

  //title
  check("title")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's title must be 2~30"),

  //description
  check("description")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 100, max: 500 })
    .withMessage("freelancer's description is invalid"),
  //image
  check("profileImage")
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ min: 5 })
    .withMessage("freelancer's image is invalid"),

  //languages
  check("languages")
    .optional({ checkFalsy: true, nullable: true })
    .isIn(languages)
    .withMessage("freelancer's languages is invalid"),

  //certificates
  //organization
  check("organization")
    .optional({ checkFal0sy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's certificateOrganization is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's certificate organization must be 2~30"),
  //YYYY-MM-DD
  check("issued")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's certificateOrganization is required")
    .isDate()
    .withMessage(
      "freelancer's certificate issued date date must be in 'YYYY-MM-DD' format"
    ),
  //url
  check("url")
    .optional({ checkFalsy: true, nullable: true })
    .isURL()
    .withMessage("freelancer's certificate url is invalid"),
  //id
  check("certificateId")
    .optional({ checkFalsy: true, nullable: true })
    .isString()
    .withMessage("freelancer's certificateId is invalid"),

  //expiration date
  check("expirationDate")
    .optional({ checkFalsy: true, nullable: true })
    .isDate()
    .withMessage("freelancer's expiration date must be in 'YYYY-MM-DD' format"),

  //education
  check("degree")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's degree is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's degree must be 2~30"),
  //area of study
  check("areaOfStudy")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancer's degree is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("freelancer's degree must be 2~30"),

  //start date
  check("startDate")
    .optional({ checkFalsy: true, nullable: true })
    .isDate()
    .withMessage("freelancer's start date must be in 'YYYY-MM-DD' format"),
  //end date
  check("endDate")
    .optional({ checkFalsy: true, nullable: true })
    .isDate()
    .withMessage("freelancer's end date must be in 'YYYY-MM-DD' format"),

  //portfolio
  check("projectTitle")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("portfolio projectTitle is required")
    .isString()
    .withMessage("portfolio projectTitle should be string"),
  check("relatedJob")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("portfolio relatedJob should be number"),
  check("completionDate")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage("freelancers completionDate is required")
    .isDate()
    .withMessage("freelancers completionDate should be date"),
  check("files")
    .optional({ checkFalsy: true, nullable: true })
    .isArray()
    .withMessage("freelancers files should be array"),
  check("skills")
    .optional({ checkFalsy: true, nullable: true })
    .isArray()
    .withMessage("freelancers skills should be array"),
];

module.exports.testimonialValidator = [
  check("rating")
    .notEmpty()
    .withMessage("freelancer testimonial rating is required")
    .isNumeric()
    .withMessage("testimonial rating should be number")
    .isLength({ min: 1, max: 5 })
    .withMessage("freelancer testimonial rating length should be between 1,5"),

  check("issued")
    .notEmpty()
    .withMessage("freelancer testimonial issued is required")
    .isDate()
    .withMessage("freelancer testimonial issued should be date"),

  check("comment")
    .notEmpty()
    .withMessage("freelancertestimonial comment is required")
    .isString({ min: 2, max: 500 })
    .withMessage(
      "freelancer testimonial comment should be a string between 50 and 1000"
    ),

  check("project")
    .notEmpty()
    .withMessage("freelancer testimonial project is required")
    .isNumeric()
    .withMessage("freelancer testimonial project should be number"),
];

module.exports.putInfoValidator = [
  check("isVerified")
    .optional({ checkFalsy: true, nullable: true })
    .isBoolean()
    .withMessage("user's verified state is invalid"),

  check("connects")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's connects should be a number")
    .isLength({ min: 0, max: 500 })
    .withMessage("user's connects must be between 0~1000"),

  check("wallet")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's wallet is invalid"),

  check("projects")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's projects is invalid"),

  check("skills")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's skills is invalid"),


  //analytics
  //earnings
  check("earnings")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's earnings should be a number"),

  //jobs
  check("jobs")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's earnings should be a number"),

  //hours
  check("hours")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's hours should be a number"),

  //views
  check("views")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric()
    .withMessage("user's views should be a number"),
];
