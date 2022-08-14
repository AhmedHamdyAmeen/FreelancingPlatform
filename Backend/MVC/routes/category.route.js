const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/category.Controller");
const mw = require("../middlewares/category.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(authorization.allAuth, controller.getAllCategories)
  .post(
    authorization.adminAuth,
    mw.post,
    validationMW,
    controller.createCategory
  );

router
  .route("/:id")
  .put(
    authorization.adminAuth,
    mw.paramId,
    mw.put,
    validationMW,
    controller.imageUpload,
    controller.updateCategory
  )
  .all(mw.paramId, validationMW)
  .get(authorization.allAuth, controller.getCategoryById)
  .delete(authorization.adminAuth, controller.deleteCategory);

router
  .route("/:id/uploadImage")
  .post(controller.imageUpload, controller.updateImage);

module.exports = router;
