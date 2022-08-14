const express = require("express");
const { body, param } = require("express-validator");

const videoController = require("../controllers/video.controller");

const validationMW = require("../middlewares/validation.MW");
const videoValidation = require("../middlewares/videoValidation");
const videoRoute = express.Router();

videoRoute.route("/videos")
    .get(videoController.getAllVideos)
    .post(
    //     videoValidation,
    //     [body("education.organization").optional({ checkFalsy: true, nullable: true })
    //     .isAlpha().withMessage("video's education is invalid")],
    // validationMW,
    videoController.addVideo)
    .put(videoController.updateVideo);

videoRoute.route("/videos/:id")
    .delete([
        param("id").isNumeric().withMessage("video id wrong")
    ],
    validationMW,
    videoController.deleteVideo);

module.exports = videoRoute;