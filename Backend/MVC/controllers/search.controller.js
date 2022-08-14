const Client = require("../models/client.model");
// const Team = require("./../models/team.model");
// const Freelancer = require("./../models/freelancers.model");
// const Project = require("./../models/project.model");

module.exports.getJob = (req, res, next) => {
  // console.log(req.query.searchKey, "This is the QuerySearch");
  /**
   * Search Key:
   *  - project Name
   *  - project Description
   *  - project Skills ref: skills
   *
   * Filtration:
   *  a ) Budget: budget
   *  a ) Internship: isInternship
   *  a ) time: duration
   *  a ) Client Location: location ref: client
   *  a ) required Connects: connects
   */

  // const { searchKey, budget, isInternship, time, location, connects } = req.query; // ! Handling According to The UI input name values..

  let regex = new RegExp(req.query.searchKey, "i"),
    query = { name: regex };

  Project.find(query, function (err, data) {
    if (err) {
      res.json(err);
    }
    res.status(200).json(data);
  });
  res.status(200).json({ data: "Aho Ya Man🥰" });
};

module.exports.getProfile = (req, res, next) => {
  /**
   * a ) Client:
   *  1- Search:
   *  - Client Name: firstName & lastName
   *  - Client Description
   *  - Client Skills ref: skills
   *
   * 2 - Filters:
   *    - Testimonials: 0 to 5 stars
   *    - Verification: isVerified
   *    - Wallet: wallet
   *
   * b ) Freelancer:
   *  1- Search:
   *  - Freelancer Name: firstName & lastName
   *  - Freelancer Description: description
   *  - Freelancer Skills ref: skills
   *  - Freelancer title: title
   *
   * 2 - Filters:
   *    - Testimonials: 0 to 5 stars
   *    - Verification: isVerified
   *    - Wallet: wallet
   *    - Hourly Rate: hourlyRate
   *    - Weekly Rate: hoursPerWeek
   *    - badges: badges
   *    - Skills: skills ref: skills
   *
   * C ) Team:
   *  1- Search:
   *  - Team Name: name
   *  - Team Description: description
   *  - Team Skills ref: skills
   *  - Team projects
   *  - Team members
   *
   * 2 - Filters:
   *    - Testimonials: 0 to 5 stars
   *    - Verification: isVerified
   *    - Wallet: wallet
   *    - Hourly Rate: hourlyRate
   *    - Skills: skills ref: skills
   */

  // const { searchKey, } = req.query; // ! Handling According to The UI input name values..

  let Schema;
  // console.log(req.query.searchKey, "==> QuerySearch");
  // console.log(req.params.userType, "==> userType");

  // ! Ensure form the names the Collections
  req.params.userType == "freelancer"
    ? (Schema = Freelancer)
    : req.params.userType == "team"
      ? (Schema = Team)
      : req.params.userType == "client"
        ? (Schema = Client)
        : null;

  let regex = new RegExp(req.query.searchKey, "i"),
    query = { $or: [{ firstName: regex }, { lastName: regex }] };

  Schema.find(query, function (err, data) {
    if (err) {
      res.json(err);
    }
    res.status(200).json(data);
  });
};
