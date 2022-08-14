const mongoose = require("mongoose");

require("../models/reports.model");

let Report = mongoose.model("reports");

/** get all Report data
 */
module.exports.getAllReports = (request, response, next) => {
  Report.find({}, { createdAt: 1, reporter: 1, reported: 1 })
    .sort({ _id: -1 })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get report by id (admin only)
 */
module.exports.getReportById = (request, response, next) => {
  Report.findOne({ _id: request.params.id })
    .populate({ path: "reporter", select: "email -_id " })
    .populate({ path: "reported", select: "description" })
    .then((data) => {
      if (!data) next(new Error("report not found"));
      else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** add new Report
 */
module.exports.createReport = (request, response, next) => {
  let ReportObject = new Report({
    _id: request.body.id,
    title: request.body.title,
    body: request.body.body,
    category: request.body.category,
    reporter: request.id,
    reporterModel: request.role + "s",
    reported: request.body.reported,
    reportedModel: request.body.reportedModel,
  });
  ReportObject.save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

/** update a Report data
 */
module.exports.updateReport = (request, response, next) => {
  Report.findById(request.body.id)
    .then((data) => {
      if (!data) next(new Error("report not found"));

      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** delete a Report
 */
module.exports.deleteReport = (request, response, next) => {
  Report.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "delete " + request.params.id });
    })
    .catch((error) => next(error));
};
