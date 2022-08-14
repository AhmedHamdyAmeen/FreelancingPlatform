const mongoose = require("mongoose");

require("../models/Updates");

let Update = mongoose.model("updates");
/**
 get all Update data
 */
module.exports.getAllUpdates = (request, response, next) => {
    Update.find({})
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
}
/**
 add new Update
 */
module.exports.addUpdate = (request, response, next) => {
    let updateObject = new Update({
        _id: request.body.id,
        admin: request.body.admin,
        title: request.body.title,
        description: request.body.description,
        date: request.body.date,
        image: request.body.image
    });
    updateObject.save()
        .then(data => {
            response.status(201).json({ data: "added" });
        })
        .catch(error => next(error))
}
/**
 update a Update data
 */
module.exports.updateUpdate = (request, response, next) => {
    Update.findById(request.body.id)
        .then(data => {
            if (data) return data.save()
        })
        .then(data => {
            response.status(201).json({ data: "updated" });
        })
        .catch(error => next(error))
}
/**
 delete a Update
 */
module.exports.deleteUpdate = (request, response, next) => {
    Update.deleteOne({ _id: request.params.id })
        .then(data => {
            response.status(200).json({ data: "delete " + request.params.id })
        })
        .catch(error => next(error));
}