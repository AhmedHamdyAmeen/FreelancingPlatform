
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/freelancers.model")
require("../models/admins.model")
const Freelancer = mongoose.model("freelancers");
const Admin = mongoose.model("admins");
const Company = require("../models/company.model")
const Client = require("../models/client.model")


module.exports.changePassword = (request, response, next) => {
  let User = null;
  request.role === "freelancer"
    ? (User = Freelancer)
    : request.role === "admin"
      ? (User = Admin)
      : request.role === "company"
        ? (User = Company)
        : request.role === "client"
          ? (User = Client)
          : null;

  // Already logged in
  User.findOne({ _id: request.id }, { email: 1, password: 1 })
    .then((data) => {
      if (!data) { // User not found
        let error = new Error("Invalid Request");
        error.status = 400;
        throw error;
      } else if (
        !bcrypt.compareSync(request.body.oldPassword, data.password)
      ) { // If the Old Password is Incorrect
        throw new Error("Incorrect old Password.");
      } else if (bcrypt.compareSync(request.body.password, data.password)) {
        // if New password = Old password
        throw new Error("The New password is must be different than the Old password.");
      } else {
        data.password = bcrypt.hashSync(request.body.password, 10);
        data.save();
        response.status(201).json({ msg: "Password Changed" });

      }
    })
    .catch((error) => next(error));
};
