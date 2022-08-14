let Client = require("../models/client.model");
const bcrypt = require("bcrypt");

const getAllClients = (request, response, next) => {
  Client.find({}, { password: 0, isBlocked: 0 })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

const getClientById = (request, response, next) => {
  Client.findOne({ _id: request.params.id }, { password: 0, isBlocked: 0 })
    .populate({
      path: "testimonials",
      populate: { path: "project", populate: { path: "category" } },
    })
    .populate({
      path: "projects",
      select: "-proposals",
      populate: { path: "category" },
    })
    .then((data) => {
      if (!data) next(new Error("Client Not Found!"));
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

const updateClient = (request, response, next) => {
  Client.findOne({ _id: request.params.id })
    .then((data) => {
      for (let item in request.body) {
        if (["password", "isBlocked"].includes(item)) {
          continue;
        } else if (["postalCode", "city", "address", "state"].includes(item)) {
          data["address"][item] = request.body[item];
        } else if (item == "analytics") {
          for (let nestedItem in request.body[item]) {
            if (["earnings", "jobs", "hours", "views"].includes(nestedItem)) {
              data["analytics"][nestedItem] =
                request.body["analytics"][nestedItem];
            }
          }
        } else data[item] = request.body[item];
      }
      return data.save();
    })
    .then((newData) => {
      response.status(201).json({ newData });
    })
    .catch((error) => {
      next(error);
    });
};

const uploadImage = (request, response, next) => {
  const file = request.file;
  const imgPath = `${request.protocol}://${request.hostname}:${process.env.PORT
    }/${request.file.path.replaceAll("\\", "/")}`;

  console.log(file, "<==File");

  Client.findOne({ _id: request.params.id })
    .then((client) => {
      if (!client) throw new Error("Client not Found!");

      client
        .updateOne({ picture: imgPath })
        .then((data) => {
          response.status(201).json({
            msg: "imageUploaded",
            imgPath,
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

const deleteClient = (request, response, next) => {
  Client.deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("Client Not Found!"));
      else
        response
          .status(200)
          .json({ data: `Client ${request.params.id} Deleted` });
    })
    .catch((error) => next(error));
};

// ! in UI handle => before user update password it must be re-login to take the loginToken and compare it with the saved one in the database
const updatePassword = (request, response, next) => {
  const { loginToken, email, oldPassword, newPassword } = request.body;

  Client.findOne({ loginToken, email }, { password: 1 })
    .then((user) => {
      if (!user) throw new Error("User with this token doesn't exist!");

      bcrypt.compare(user.password, oldPassword, (error, data) => {
        if (error) throw new Error("Incorrect Old Password");

        bcrypt.hash(newPassword, 10, (error, hash) => {
          user
            .updateOne({ password: hash })
            .then((data) => {
              response
                .status(200)
                .json({ data: "Password Updating done successfully" });
            })
            .catch((error) => next(error));
        });
      });
    })
    .catch((error) => next(error));
};

const blockClient = (request, response, next) => {
  Client.findOne({
    email: request.body.email,
    _id: request.params.id,
  })
    .then((user) => {
      if (!user) throw new Error("User Email not Found!");

      user
        .updateOne({ isBlocked: request.body.isBlocked })
        .then((data) => {
          response.status(200).json({
            data: data,
            message: "Password Resiting done successfully",
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => {
      next(error);
    });
};

const updateTestimonials = (request, response, next) => {
  Client.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("Client not found!");

      let TestimonialObject = {};
      console.log(TestimonialObject);
      for (let key in request.body) {
        TestimonialObject[key] = request.body[key];
        console.log(TestimonialObject);
      }
      data.testimonials.push(TestimonialObject);
      data.projects = request.body.project;
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

const deleteTestimonial = (request, response, next) => {
  Freelancer.findOne({ "testimonials.project": request.body.project })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let item of data.testimonials) {
          if (item.project == request.body.project) {
            data.testimonials.splice(data.testimonials.indexOf(item), 1);
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  getAllClients,
  getClientById,
  // signUp,
  updateClient,
  deleteClient,
  updateTestimonials,
  updatePassword,
  blockClient,
  uploadImage,
  deleteTestimonial,
};
