const express = require("express");
const { param } = require("express-validator");

const testController = require("../controllers/test.controller");
const authMW = require("../middlewares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const testValidation = require("../middlewares/tests.MW");
const { allAuth, adminAuth } = require("../middlewares/authAccess.MW");

const testRoute = express.Router();

testRoute
  .route("/tests")

  .get(authMW, allAuth, testController.getAllTests)
  .post(
    authMW,
    adminAuth,
    testValidation.postTestValidator,
    validationMW,
    testController.createTest
  )
  .put(testController.updateTest);

testRoute
  .route("/tests/:id")
  .all(

    authMW,
    adminAuth,
    [param("id").isNumeric().withMessage("test id wrong")],
    validationMW
  )
  .get(testController.getTestById)
  .delete(testController.deleteTest);

module.exports = testRoute;
