
const mongoose = require("mongoose");
require("../models/admins.model");
let Admin = mongoose.model("admins");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



/** Admin login for static Admin
 */

const adminLogin = (request, response, next) => {
  if (
    request.body.email === process.env.ADMIN_EMAIL &&
    request.body.password === process.env.ADMIN_PASS
  ) {
    let token = jwt.sign(
      {
        id: process.env.ADMIN_ID,
        role: "admin",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    response.status(200).json({ token, msg: "login" });
  } else {
    Admin.findOne(
      {
        email: request.body.email,
      },
      { email: 1, password: 1 }
    )
      .then((data) => {
        if (!data) {
          //email not found
          let error = new Error("username or password incorrect");
          error.status = 401;
          next(error);
        }
        bcrypt
          .compare(request.body.password, data.password)
          .then((result) => {
            if (result) {
              //password is correct
              let token = jwt.sign(
                {
                  id: data._id,
                  role: "admin",
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
              );
              response.status(200).json({ token, msg: "login" });
            } else {
              next(new Error("password unmatched"));
            }
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
};

/** signup as an admin
 */
const addAdmin = (request, response, next) => {
  console.log(request.body, "<=====");

  Admin.find({ email: request.body.email }, { _id: 0, email: 1 })
    .then((data) => {
      if (data.length) {
        next(new Error("email already signed up"));
      } else {
        let adminObject = new Admin({
          _id: request.body.id,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          password: request.body.password,
          email: request.body.email,
        });
        return adminObject.save();
      }
    })
    .then((data) => {

      response.status(201).json({ msg: "signup success" });

    })
    .catch((error) => next(error));
};

/** update an admin data (update profile)
 */

const updateAdminDetails = (request, response, next) => {

  Admin.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("admin not found"));
      for (let key in request.body) {
        console.log(key);
        if (key == "email" || key == "password")
          next(new Error("Invalid request"));

        else if (key == "location") {/*****************location */

          for (let locationKey in data[key]) {
            if (request.body.hasOwnProperty(locationKey)) {
              data.location[locationKey] = request.body[locationKey];
            }
          }
        } else data[key] = request.body[key] || data[key];
      }

      return data.save();
    })
    .then((data) => {

      response.status(201).json({ msg: "updated" });

    })
    .catch((error) => next(error));
};


/** get admin  by id 
 */
const getAdminById = (request, response, next) => {
  Admin.findOne(
    { _id: request.params.id },
    { password: 0 }//

  )
    .then((data) => {
      if (data == null) next(new Error("admin not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get all admins
 */

const getAllAdmins = (request, response, next) => {

  Admin.find(
    {},
    {
      password: 0,
    }
  )
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**delete an admin
 * admin only
 */

const deleteAdmin = (request, response, next) => {
  Admin.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ msg: "delete " + request.params.id });
    })
    .catch((error) => next(error));
};

module.exports = {
  adminLogin,
  addAdmin,
  updateAdminDetails,
  getAdminById,
  getAllAdmins,
  deleteAdmin
}

