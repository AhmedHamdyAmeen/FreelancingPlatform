const mongoose = require("mongoose");

require("../models/tests.model");

let Test = mongoose.model("tests");

/**get all Test data
 */
module.exports.getAllTests = (request, response, next) => {
    Test.find({})
        .sort({ skills: 1 })
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
}

/** get test by id
 */
module.exports.getTestById = (request, response, next) => {
    Test.findOne({ _id: request.params.id })
        .populate({ path: "skills", select: "name -_id" })
        .then((data) => {
            if (!data) next(new Error("test not found"));
            else response.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        });
};

/** add new Test
 */
module.exports.createTest = (request, response, next) => {
    let TestObject = new Test({
        _id: request.body.id,
        duration: request.body.duration,
        skills: request.body.skills,
        body: request.body.body,
        badges: request.body.badges
    });
    TestObject.save()
        .then(data => {
            response.status(201).json({ data: "added" });
        })
        .catch(error => next(error))
}

/**update a Test data
 */
module.exports.updateTest = (request, response, next) => {
    Test.findById(request.body.id)
        .then(data => {
            if (!data) next(new Error("test not found"));
            else {
                for (let key in request.body) {
                    data[key] = request.body[key];
                }
                return data.save();
            }
        })
        .then(data => {
            response.status(201).json({ data: "updated" });
        })
        .catch(error => next(error))
}

/**delete a Test
 */
module.exports.deleteTest = (request, response, next) => {
    Test.deleteOne({ _id: request.params.id })
        .then(data => {
            response.status(200).json({ data: "delete " + request.params.id })
        })
        .catch(error => next(error));
}