const express = require("express");
const { body, param } = require("express-validator");

const updateController = require("../controllers/updateController");

const validationMW = require("../middlewares/validationMW");
const updateValidation = require("../middlewares/updateValidation");
const updateRoute = express.Router();

updateRoute
  .route("/updates")
  .get(updateController.getAllUpdates)
  .post(
    //     updateValidation,
    //     [body("education.organization").optional({ checkFalsy: true, nullable: true })
    //     .isAlpha().withMessage("update's education is invalid")],
    // validationMW,
    updateController.addUpdate
  )
  .put(updateController.updateUpdate);

updateRoute
  .route("/updates/:id")
  .delete(
    [param("id").isNumeric().withMessage("update id wrong")],
    validationMW,
    updateController.deleteUpdate
  );

module.exports = updateRoute;
