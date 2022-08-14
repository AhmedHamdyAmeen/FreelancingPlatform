const express = require("express");
const { body, param, query } = require("express-validator");
const companyRoute = express.Router();
const controller = require("../controllers/company.controller");

let validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");

const {
  AdminAndCompanyAuth,
  companyAuth,
} = require("../middlewares/authAccess.MW");

const { putInfoValidator } = require("../middlewares/freelancers.MW");

const companyValidtion = require("../middlewares/company.MW");

companyRoute
  .route("/company")
  //get
  .get(authMW, validationMW, controller.getAllComapny);

//signUp step2 (put details by id)
companyRoute
  .route("/company/:id/Details")
  .put(
    authMW,
    companyAuth,
    validationMW,
    companyValidtion.paramValidator,
    companyValidtion.detailsValidator,
    controller.imageUpload,
    controller.updateCompanyDetails
  );

//signUp step 3 ( put info by id)
companyRoute
  .route("/company/:id/info")
  .put(
    authMW,
    companyAuth,
    companyValidtion.paramValidator,
    putInfoValidator,
    validationMW,
    controller.updateCompanyInfo
  );

//get by id (puplic view)
companyRoute
  .route("/company/:id/public")
  .get(
    authMW,
    companyValidtion.paramValidator,
    validationMW,
    controller.getCampanyByIdPuplic
  );

//get by id (private view)
companyRoute
  .route("/company/:id/private")
  .get(
    authMW,
    companyAuth,
    companyValidtion.paramValidator,
    validationMW,
    controller.getCampanyByIdPrivate
  );

//delete
companyRoute
  .route("/company/:id")
  .delete(
    authMW,
    AdminAndCompanyAuth,
    companyValidtion.paramValidator,
    validationMW,
    controller.deleteCompany
  );

//testimonials
companyRoute
  .route("company/:id/update/testimonials")
  .put(
    authMW,
    AdminAndCompanyAuth,
    companyValidtion.paramValidator,
    companyValidtion.testimonialValidator,
    validationMW,
    controller.CompanyupdateTestimonials
  );

module.exports = companyRoute;
