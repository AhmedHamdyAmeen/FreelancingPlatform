const mongoose = require("mongoose");

require("../models/questions");

let Question = mongoose.model("questions");
/**
 get all Question data
 */
module.exports.getAllQuestions = (request, response, next) => {
    Question.find({})
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        })
}
/**
 add new Question
 */
module.exports.addQuestion = (request, response, next) => {
    let QuestionObject = new Question({
        _id: request.body.id,
        date: request.body.date,
        question: request.body.question,
        answer: request.body.answer,
        tag: request.body.tag,
    });
    QuestionObject.save()
        .then(data => {
            response.status(201).json({ data: "added" });
        })
        .catch(error => next(error))
}
/**
 update a Question data
 */
module.exports.updateQuestion = (request, response, next) => {
    Question.findById(request.body.id)
        .then(data => {
            if (data) return data.save()
        })
        .then(data => {
            response.status(201).json({ data: "updated" });
        })
        .catch(error => next(error))
}
/**
 delete a Question
 */
module.exports.deleteQuestion = (request, response, next) => {
    Question.deleteOne({ _id: request.params.id })
        .then(data => {
            response.status(200).json({ data: "delete " + request.params.id })
        })
        .catch(error => next(error));
}