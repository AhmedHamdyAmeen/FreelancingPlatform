const express = require("express");
const { body, param } = require("express-validator");


const questionController = require("../controllers/question.controller");
const validationMW = require("../middlewares/validationMW");
const questionValidation = require("../middlewares/question.MW");
const questionRoute = express.Router();

questionRoute
  .route("/questions")
  .get(questionController.getAllQuestions)
  .post(
    //     questionValidation,
    //     [body("education.organization").optional({ checkFalsy: true, nullable: true })
    //     .isAlpha().withMessage("question's education is invalid")],
    // validationMW,
    questionController.addQuestion
  )
  .put(questionController.updateQuestion);

questionRoute
  .route("/questions/:id")
  .delete(
    [param("id").isNumeric().withMessage("question id wrong")],
    validationMW,
    questionController.deleteQuestion
  );

module.exports = questionRoute;
