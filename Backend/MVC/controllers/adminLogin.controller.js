const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let Admin = mongoose.model("admins");

module.exports.adminLogin = (request, response, next) => {
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
    response.status(200).json({ token, message: "login" });
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
              response.status(200).json({ token, message: "login" });
            } else {
              next(new Error("password unmatched"));
            }
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
};
