const express = require("express");

const {
  AdminAndClientAndCompanyAuth,
  allAuth,
  adminAuth,
  AdminAndFreelancerAndTeamAuth,
} = require("../middlewares/authorization.MW");
const validationMW = require("../middlewares/validation.MW");
const controller = require("../controllers/project.controller");
const {
  addProjectToTalent,
  createTestimonialToRecruiter,
  deleteTestimonialByProjectId,
} = require("../controllers/projectIntegration.controller");

const mw = require("../middlewares/project.MW");
const {
  createTestimonialMW,
  deleteTestimonialMW,
} = require("../middlewares/testimonial.MW");
const auth = require("../middlewares/auth.MW");
const router = express.Router();

router.use(auth);

router
  .route("/")

  .get(allAuth, controller.getAllProjects)
  .post(
    AdminAndClientAndCompanyAuth,
    mw.post,
    validationMW,
    controller.createProject
  );

router

  .route("/:id/private")
  .get(AdminAndClientAndCompanyAuth, controller.getProjectByIdPrivate);

router
  .route("/:id/proposal")
  .put(
    allAuth,
    // mw.createProposal,
    // validationMW,
    controller.filesUpload,
    controller.createProposal
  )
  .get(AdminAndClientAndCompanyAuth, controller.getProjectProposals)
  .post(
    AdminAndClientAndCompanyAuth,
    controller.selectProposal,
    addProjectToTalent
  );

router
  .route("/:id/finish")
  .put(
    AdminAndClientAndCompanyAuth,
    createTestimonialMW,
    validationMW,
    controller.finishProject
  );

router
  .route("/:id/testimonial")
  .put(
    AdminAndFreelancerAndTeamAuth,
    createTestimonialMW,
    validationMW,
    createTestimonialToRecruiter
  );

router
  .route("/:id/testimonial/:userType")
  .put(
    adminAuth,
    deleteTestimonialMW,
    validationMW,
    deleteTestimonialByProjectId
  );

router
  .route("/:id")
  .put(
    AdminAndClientAndCompanyAuth,
    mw.put,
    validationMW,
    controller.updateProject
  )
  .all(mw.getDelete, validationMW)

  .get(allAuth, controller.getProjectById)
  .delete(controller.deleteProject);

module.exports = router;
