const express = require("express");

const authorization = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/team.Controller");
const mw = require("../middlewares/team.MW");
const tmw = require("../middlewares/testimonial.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")

  .get(authorization.allAuth, controller.getAllTeams)

  .post(
    authorization.AdminAndFreelancerAuth,
    mw.post,
    validationMW,
    controller.createTeam
  );

router
  .route("/member")
  .get(authorization.AdminAndFreelancerAuth, controller.getTeamByMember);

//   .get(controller.getTestimonialByProjectId);

router.route("/:id/create/portfolio").put(
  authorization.AdminAndTeamAuth,
  // mw.createPortfolio,
  // validationMW,
  controller.filesUpload,
  controller.createPortfolio
);

router.route("/:id/update/portfolio").put(
  // authorization.AdminAndTeamAuth,
  // mw.updatePortfolio,
  // validationMW,
  controller.filesUpload,
  controller.updatePortfolio
);

router.route("/:id/delete/portfolio").put(
  // authorization.AdminAndTeamAuth,
  mw.deletePortfolio,
  validationMW,
  controller.deletePortfolio
);

router
  .route("/:id/private")
  .get(authorization.AdminAndFreelancerAuth, controller.getTeamByIdPrivate);

router
  .route("/:id")
  .put(
    // authorization.AdminAndFreelancerAndTeamAuth,
    mw.put,
    validationMW,
    controller.imageUpload,
    controller.updateTeam
  )
  .all(mw.getDelete, validationMW)
  .get(
    // authorization.allAuth,
    controller.getTeamByIdPublic
  )
  .delete(
    // authorization.AdminAndTeamAuth,
    controller.deleteTeam
  );
module.exports = router;
