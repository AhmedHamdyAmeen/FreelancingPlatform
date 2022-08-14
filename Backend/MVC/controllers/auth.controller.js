const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("../models/client.model");
const Freelancer = require("./../models/freelancers.model");
const Admin = require("./../models/admins.model");
const Company = require("./../models/company.model");

const mailgun = require("mailgun-js");
const DOMAIN = process.env.MailgunDOMAIN;
const api_key = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

/** SignUp
 */
let signUp = (req, res, next) => {
  let User, payload;

  req.params.userType == "freelancer"
    ? (User = Freelancer)
    : req.params.userType == "company" ? User = Company :
      req.params.userType == "client"
        ? (User = Client)
        : req.params.userType == "admin"
          ? (User = Admin)
          : null;


  if (["freelancer", "client", "admin"].includes(req.params.userType)) {
    var { firstName, lastName, email, password } = req.body;
    payload = { firstName, lastName, email, password };
  } else if (req.params.userType == "company") {
    var { name, email, password } = req.body;
    console.log(email, "<==Email here");
    payload = { name, email, password };
  } else {
    next(new Error("Invalid UserType!"));
  }


  User.findOne({ email })
    .then((user) => {
      if (user) throw new Error("User is already registered!");

      // Email Verification
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "10m",
      });

      const data = {
        from: "geoAhmedHamdy1@gmail.com",
        to: email,
        subject: "Email Verification Link",
        // text: 'Verify Email'
        html: `
        <h2>Account Verification</h2>
        <pre>
          Hello,
          
          Thank you for choosing Our Freelancing platform 😍
          Please confirm your email address by clicking the link below..

        <a href="http://localhost:${process.env.FR_PORT}/activate-account/${req.params.userType}/${token}">Verification</a>

          If you did not sign up, you can simply disregard this mail.

          Happy Emailing!
            Freelancico Team.
          </pre>
        `,
      };


      mg.messages().send(data, function (error, body) {
        if (error) next(error);

        console.log(body);
        console.log(error);
        return res.status(201).json({
          msg: "Email verification link has been sent, kindly activate your account",
        });
      });
    })
    .catch((error) => next(error));
};

/** Activate Email (Email Verification)
*/
let activateAccount = (req, res, next) => {
  const { token } = req.body;
  let User;

  console.log("====>", token);

  req.params.userType == "freelancer"
    ? (User = Freelancer)
    : req.params.userType == "company" ? User = Company :
      req.params.userType == "client"
        ? (User = Client)
        : req.params.userType == "admin"
          ? (User = Admin)
          : null;

  try {
    if (!token) new Error("Something went Wrong!!");
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (["freelancer", "client", "admin"].includes(req.params.userType)) {
      var { firstName, lastName, email, password } = decodedToken;
    } else if (req.params.userType == "company") {
      var { name, email, password } = decodedToken;
    } else {
      next(new Error("Invalid UserType!"));
    }

    User.findOne({ email })
      .then((user) => {
        if (user) throw new Error("User is already registered!");

        bcrypt.hash(password, 10, (error, hash) => {
          let newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
          });

          newUser
            .save()
            .then((data) => {
              res.status(200).json({ msg: "User SignedUP", data });
            })
            .catch((error) => next(`SignUp Activation Error: ${error}`));
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

/** User Generic Login (admin & client & Freelancer & company )
 */
const userLogin = (req, res, next) => {
  let User;

  console.log(req.body, "<=====")

  req.params.userType == "freelancer"
    ? (User = Freelancer)
    : req.params.userType == "company"
      ? User = Company
      : req.params.userType == "client"
        ? (User = Client)
        : req.params.userType == "admin"
          ? (User = Admin)
          : next(new Error("Invalid User type"));

  User.findOne(
    {
      email: req.body.email,
    },
    { email: 1, password: 1, isBlocked: 1 }
  )
    .then((user) => {
      if (!user) {
        // user not found
        let error = new Error("Incorrect Username or Password!");
        error.status = 401;
        throw error;
      }
      if (user.isBlocked) next(new Error("Login failed!"));

      let isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        throw new Error("Incorrect Password");
      } else {
        let token = jwt.sign(
          {
            id: user._id,
            role: req.params.userType,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );

        user
          .updateOne({ loginToken: token })
          .then((data) => {
            // res.status(200).json({ msg: "loginToken Saved successfully" });
          })
          .catch((error) => next(error));

        res.status(200).json({ token, msg: `${req.params.userType}Login` });
      }
    })
    .catch((error) => next(error));
};

/** Forgot Password
 */

let forgotPassword = (req, res, next) => {
  const { email } = req.body;
  let User;

  req.params.userType == "freelancer"
    ? (User = Freelancer)
    : req.params.userType == "company" ? User = Company :
      req.params.userType == "client"
        ? (User = Client)
        : req.params.userType == "admin"
          ? (User = Admin)
          : null;

  User.findOne({ email }, { firstName: 1, email: 1, _id: 1 })
    .then((user) => {
      if (!user) throw new Error("User is Not Exist!");

      let token = jwt.sign({ _id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "10m",
      });
      const data = {
        from: "geoAhmedHamdy1@gmail.com",
        to: email,
        subject: "Password Resiting Link",
        // text: 'Verify Email'
        html: `
          <h2 style="color: red; font-size: 50px">Password Resiting</h2>
          <pre style="font-size: 30px;">
          Hello ${user.firstName},
          
          Please click on the given link to reset password..

        <a href="http://localhost:${process.env.FR_PORT}/forgot-password/${req.params.userType}/${token}">Reset Password</a>

          If you did not forget password, Change your password now 👀.

          Happy Emailing!
            Freelancico Team.
          </pre>
        `,
      };

      user
        .updateOne({ resetLink: token })
        .then((newData) => {
          if (!newData) throw new Error("Reset Password Link error!");

          mg.messages().send(data, function (error, body) {
            if (error) next(error);

            res.status(200).json({
              msg: "Reset Password link has been sent to your Email, kindly check your mail and follow the instructions",
            });
            // console.log(body);
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

/** Reset Password
*/
let resetPassword = (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  if (!resetLink) next(new Error("Authentication Error!!"));

  let User;
  req.params.userType == "freelancer"
    ? (User = Freelancer)
    : req.params.userType == "company" ? User = Company :
      req.params.userType == "client"
        ? (User = Client)
        : req.params.userType == "admin"
          ? (User = Admin)
          : null;

  try {
    User.findOne({ resetLink }, { password: 1 })
      .then((user) => {
        if (!user) next(new Error("User with this token doesn't exist!"));

        // bcrypt.compareSync(plainText, hashedText) ==> return true or false;
        let isMatch = bcrypt.compareSync(newPassword, user.password);

        if (isMatch) {
          // isMatch ==> the two password is the same..
          next(Error("This is the Old Password, Enter new One"));
        } else {
          bcrypt.hash(newPassword, 10, (error, hash) => {
            user
              .updateOne({ password: hash, resetLink: "" })
              .then((data) => {
                res
                  .status(200)
                  .json({ msg: "Password Resiting done successfully" });
              })
              .catch((error) => next(error));
          });
        }
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  signUp,
  activateAccount,
  forgotPassword,
  resetPassword,
};
