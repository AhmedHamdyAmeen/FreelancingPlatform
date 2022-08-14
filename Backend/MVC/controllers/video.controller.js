const mongoose = require("mongoose");

require("../models/videos");

let Video = mongoose.model("videos");
/**
 get all video data
 */
module.exports.getAllVideos = (request, response, next) => {
    Video.find({})
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
}
/**
 add new video
 */
module.exports.addVideo = (request, response, next) => {
    let videoObject = new Video({
        _id: request.body.id,
        duration: request.body.duration,
        video: request.body.video,
        title: request.body.title,
        description: request.body.description,
    });
    videoObject.save()
        .then(data => {
            response.status(201).json({ data: "added" });
        })
        .catch(error => next(error))
}
/**
 update a Video data
 */
module.exports.updateVideo = (request, response, next) => {
    Video.findById(request.body.id)
        .then(data => {
            if (data) return data.save()
        })
        .then(data => {
            response.status(201).json({ data: "updated" });
        })
        .catch(error => next(error))
}
/**
 delete a Video
 */
module.exports.deleteVideo = (request, response, next) => {
    Video.deleteOne({ _id: request.params.id })
        .then(data => {
            response.status(200).json({ data: "delete " + request.params.id })
        })
        .catch(error => next(error));
}