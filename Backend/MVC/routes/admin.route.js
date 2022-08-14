const express = require("express");
const { param } = require("express-validator");

const {
  adminLogin,
  addAdmin,
  updateAdminDetails,
  getAdminById,
  getAllAdmins,
  deleteAdmin
} = require("../controllers/admin.controller");

const authMW = require("../middleWares/auth.MW");
const validationMW = require("../middlewares/validation.MW");
const { loginVA } = require("../middlewares/login.MW");
const { adminAuth } = require("../middlewares/authAccess.MW");
const { hashPassword } = require("../middlewares/hashPassword.MW");
// const {
//   signupValidator,
//   putValidator,
// } = require("../middlewares/admin.MW");


const adminRoute = express.Router();

/** admins base route
 */
adminRoute.route("/admin").get(authMW, adminAuth, getAllAdmins);

/** Static Admin Login
 */
adminRoute
  .route("/admin/login")
  .post(loginVA, validationMW, adminLogin);



/**Register route
 */
adminRoute.route("/admin/register").post(
  authMW,
  adminAuth,
  // signupValidator,
  // validationMW,
  hashPassword,
  addAdmin
);

/** update profile details
 */
adminRoute.route("/admin/:id/update/").put(
  authMW,
  adminAuth,
  // putValidator,
  // validationMW,
  updateAdminDetails
);

adminRoute
  .route("/admin/:id")
  .all(
    authMW,
    adminAuth,
    [param("id").isNumeric().withMessage("admin id wrong")],
    validationMW
  )
  .get(getAdminById)
  .delete(deleteAdmin);


module.exports = adminRoute;
