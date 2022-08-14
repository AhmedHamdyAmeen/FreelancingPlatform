const express = require("express");
const { param } = require("express-validator");

const reportController = require("../controllers/report.controller");
const authMW = require("../middlewares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const { allAuth, adminAuth } = require("../middlewares/authAccess.MW");
const { postReportValidator } = require("../middlewares/reports.MW");

const reportRoute = express.Router();


reportRoute
    .route("/reports")
    .get(authMW, adminAuth, reportController.getAllReports)
    .post(
        authMW,
        allAuth,
        postReportValidator,
        validationMW,
        reportController.createReport
    );
//   .put(reportController.updateReport); //not applicable so far

reportRoute
  .route("/reports/:id")
  .all(
    authMW,
    adminAuth,
    [param("id").isNumeric().withMessage("report id wrong")],
    validationMW
  )
  .get(reportController.getReportById)
  .delete(reportController.deleteReport);

module.exports = reportRoute;