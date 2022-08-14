const express = require("express");
const path = require("node:path");
const { body, param, query } = require("express-validator");
const { imageExtRegex } = require("../helpers/regex");
const multer = require("multer");
// Set Storage Engine
const storage = multer.diskStorage({
  destination: `public/profileImages/clients`,
  filename: (request, response, next) => {
    next(null, request.params.id + path.extname(response.originalname));
  },
});

const fileFilter = (req, file, next) => {
  if (!file.originalname.match(imageExtRegex)) {
    next(new Error("Please upload a valid image (.jpg)"));
  } else next(undefined, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter,
});

const {
  getAllClients,
  getClientById,
  // signUp,
  updateClient,
  deleteClient,
  updateTestimonials,
  updatePassword,
  blockClient,
  uploadImage,
  deleteTestimonial,
} = require("../controllers/client.controller");

const {
  updateVA,
  // signUpVA,
  updatePasswordVA,
  blockClientVA,
  testimonialVA,
} = require("../middlewares/client.MW");

const { putValidator } = require("../middlewares/freelancers.MW");

const {
  adminAuth,
  clientAuth,
  AdminAndClientAuth,
  allAuth,
  freelancerAuth,
  freelancerAndCompanyAuth,
} = require("../middlewares/usersAuth.MW");
const validationMW = require("../middlewares/validation.MW");
const authMW = require("../middlewares/auth.MW");

const router = express.Router();

// authMw => roleAuth (authorization) => validationArray => validationMW => controller
router.route("/client").get(authMW, adminAuth, getAllClients);

router
  .route("/client/:id")
  .all([param("id").isNumeric().withMessage("Id isn't correct")])
  .get(authMW, allAuth, getClientById)
  .put(authMW, AdminAndClientAuth, putValidator, validationMW, updateClient)
  .delete(authMW, adminAuth, deleteClient);

router.put(
  "/client/:id/uploadImage",
  authMW,
  AdminAndClientAuth,
  upload.single("image"),
  uploadImage
); // client

router.put(
  "/client/:id/updatePassword",
  updatePasswordVA,
  validationMW,
  updatePassword
); // ^ authorization handled by using token

router.put(
  "/client/:id/blockClient",
  authMW,
  adminAuth,
  blockClientVA,
  validationMW,
  blockClient
);

router
  .route("/client/:id/testimonials")
  .put(authMW, freelancerAuth, updateTestimonials)
  .delete(
    authMW,
    freelancerAndCompanyAuth,
    testimonialVA,
    validationMW,
    deleteTestimonial
  );

module.exports = router;