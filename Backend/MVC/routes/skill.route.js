const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/skill.Controller");
const mw = require("../middlewares/skill.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(authorization.allAuth, controller.getAllSkills)
  .post(authorization.adminAuth, mw.post, validationMW, controller.createSkill);

router
  .route("/:id")
  .put(authorization.adminAuth, mw.put, validationMW, controller.updateSkill)
  .all(mw.getDelete, validationMW)
  .get(authorization.allAuth, controller.getSkillById)
  .delete(authorization.adminAuth, controller.deleteSkill);

module.exports = router;
