const express = require("express");
const { body, param, query } = require("express-validator");


const validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");
const controller = require("../controllers/search.controller");


const router = express.Router();


// router.use(authMW, (req, res, next) => {
//   if (req.role == "admin") {
//     next();
//   } else {
//     let error = new Error("Not Authorized");
//     error.status = 403;
//     next(error)
//   }
// });

router.route("/search/job").get(controller.getJob);

router.route("/search/profile/:userType?").get(controller.getProfile);

module.exports = router;

