const express = require("express");
const {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { loginVA } = require("../middlewares/login.MW");
const validationMW = require("../middlewares/validation.MW");
const { signUpVA } = require("../middlewares/client.MW");

const router = express.Router();

router.post("/signup/:userType", signUpVA, validationMW, signUp);

router.post("/activate-account/:userType", activateAccount);

router.post("/forgot-password/:userType", forgotPassword);
router.post("/reset-password/:userType", resetPassword);



router // user generic login (admin & client & Freelancer & company )
  .route("/login/:userType")
  .post(loginVA, validationMW, userLogin);


module.exports = router;
