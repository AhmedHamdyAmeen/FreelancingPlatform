const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Team = require("../models/team.model");
const Freelancer = require("../models/freelancers.model");

const { imageExtRegex, fileExtRegex } = require("../helpers/regex");

/** for testing */
module.exports.freelancerSignup = (req, res, next) => {
  let { firstName, lastName, email, password } = req.body;
  Freelancer.findOne({ email })
    .then((user) => {
      if (user) next(new Error("User is already registered!"));
      bcrypt.hash(password, 10, (error, hash) => {
        let newUser = new Freelancer({
          firstName,
          lastName,
          email,
          password: hash,
        });

        newUser
          .save()
          .then((data) => {
            res.status(200).json({ message: "User SignedUP", data });
          })
          .catch((error) => next(`SignUp Activation Error: ${error}`));
      });
    })
    .catch((error) => next(error));
};

/** multer */
const imageStorage = multer.diskStorage({
  destination: `public/profileImages/freelancers`,
  filename: (request, response, next) => {
    next(null, request.params.id + path.extname(response.originalname));
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(request, response, next) {
    if (!response.originalname.match(imageExtRegex)) {
      next(new Error("Please upload a valid image (.jpg)"));
    } else next(undefined, true);
  },
}).single("image");

const filesStorage = multer.diskStorage({
  destination: `public/portfolioFiles/freelancers`,
  filename: (request, response, next) => {
    Freelancer.findById(request.params.id).then((data) => {
      if (!data) next(new Error("freelncer not found"));
      else
        next(
          null,
          request.id + "_" + new Date().getTime() + "_" + response.originalname
        );
    });
  },
});

module.exports.filesUpload = multer({
  storage: filesStorage,
  limits: {
    fileSize: 300000000, // 300000000 Bytes = 0.3 GB
  },
  fileFilter(request, response, next) {
    console.log(response);
    if (!response.originalname.match(fileExtRegex)) {
      return next(new Error("Please upload a File"));
    }
    next(undefined, true);
  },
}).array("files", 5);

/** update a freelancer data (update profile)
 */
module.exports.updateFreelancerDetails = (request, response, next) => {
  if (request.role == "freelancer" && request.id != request.params.id)
    next(new Error("not Authorized"));
  const profileDetails = [
    "firstName",
    "lastName",
    "address",
    "title",
    "description",
    "languages",
    "phoneNumber",
    "profileImage",
    "hoursPerWeek",
    "hourlyRate",
  ];
  Freelancer.findById(request.id)
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      //info
      if (request.params.detail === "details") {
        for (let key of profileDetails) {
          if (key == "address") {
            /*****************address */
            for (let addressKey in data[key]) {
              if (request.body.hasOwnProperty(addressKey)) {
                data.address[addressKey] = request.body[addressKey];
              }
            }
          } else if (key === "languages" && request.body[key]) {
            /*****************languages */
            data.languages = [...new Set([...request.body.languages])];
          } else data[key] = request.body[key] || data[key];
        }

        data.save().then((data) => {
          response.status(201).json({ data: "updated" });
        });
      }
      //array of objects
      else if (
        ["certificates", "education", "experience", "portfolio"].includes(
          request.params.detail
        )
      ) {
        let detailObject = {};
        for (let key in request.body) {
          detailObject[key] = request.body[key];
        }
        /***********portfolio files ************/
        if (request.params.detail == "portfolio") {
          detailObject.files = [];
          request.files.map((file) => {
            detailObject.files.push(
              `${request.protocol}://${request.hostname}:${process.env.PORT
              }/${file.path.replaceAll("\\", "/")}`
            );
          });
        }
        data[request.params.detail].push(detailObject);
        data.save().then((data) => {
          response.status(201).json({ data: "updated" });
        });
      }
      //array of numbers
      else if (request.params.detail === "skills") {
        data.skills = [...new Set([...request.body.skills])];
        data.save().then((data) => {
          // response.status(201).json({ data: "updated" });
          next();
        });
      } else {
        next(new Error("Invalid request"));
      }
    })
    .catch((error) => next(error));
};

/** update a freelancer image (update)
 */
module.exports.updateFreelancerImage = (request, response, next) => {
  if (request.params.id != request.id) next(new Error("not Authorized"));
  if (!request.file) next(new Error("file not found"));
  Freelancer.findById(request.id)
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      data.profileImage = `${request.protocol}://${request.hostname}:${process.env.PORT
        }/${request.file.path.replaceAll("\\", "/")}`;
      return data.save().then((data) => {
        response
          .status(201)
          .json({ msg: "freelancer updated", data: data.profileImage });
      });
    })
    .catch((error) => {
      next(error);
    });
};

/** update a freelancer data (update projects and testimonials)
 */
module.exports.updateFreelancerTestimonials = (request, response, next) => {
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      testimonialObject = {};
      for (let key in request.body) {
        testimonialObject[key] = request.body[key];
      }
      data.testimonials.push(testimonialObject);
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** update a freelancer data (update back end data)
 */
module.exports.updateFreelancerInfo = (request, response, next) => {
  const backInfo = [
    "analytics",
    "badges",
    "connects",
    "isVerified",
    "isBlocked",
    "wallet",
    "projects",
  ];
  Freelancer.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      for (let key of backInfo) {
        if (key === "analytics") {
          for (let analyticKey in data[key]) {
            if (request.body.hasOwnProperty(analyticKey)) {
              data.analytics[analyticKey] = request.body[analyticKey];
            }
          }
        } else if (key === "badges" && request.body[key]) {
          /*****************badges */
          data.badges = [...new Set([...data.badges, request.body.badges])];
        } else data[key] = request.body[key] || data[key];
      }
      return data.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** edit an object in an array (update)
 */
module.exports.editData = (request, response, next) => {
  if ((request.role == "freelancer", request.id != request.params.id))
    throw new Error("not Authorized");
  Freelancer.findById(
    { _id: request.params.id },
    { education: 1, certificates: 1, eperience: 1, portfolio: 1 }
  )
    .then((data) => {
      if (!data) next(new Error("freelancer not found"));
      if (request.body.index < data[request.params.detail].length)
        //index is valid
        //assign updated object to the old object
        data[request.params.detail][request.body.index] = Object.assign(
          {},
          request.body[request.params.detail]
        );
      else next(new Error(`freelancer's ${request.params.detail} not found`));
      return data.save();
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** delete an object in an array (update) data
 */
module.exports.removeData = (request, response, next) => {
  if ((request.role == "freelancer", request.id != request.params.id))
    throw new Error("not Authorized");
  Freelancer.findById(
    { _id: request.id },
    { education: 1, certificates: 1, experience: 1, portfolio: 1 }
  )
    .then((data) => {
      console.log(request.body.index);
      if (!data) next(new Error("freelancer not found"));
      if (request.body.index < data[request.params.detail].length) {
        if (request.params.detail == "portfolio") {
          data.portfolio[request.body.index].files.map((file) => {
            fs.unlinkSync(
              file.replace(
                `${request.protocol}://${request.hostname}:${process.env.PORT}/`,
                ""
              )
            );
          });
        }
        data[request.params.detail].splice(request.body.index, 1);
        return data.save();
      } else throw new Error(`freelancer's ${request.params.detail} not found`);
    })
    .then(() => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};

/** get freelancer data  by id (get profile / public view)
 */
module.exports.getFreelancerPublic = (request, response, next) => {
  Freelancer.findOne(
    { _id: request.params.id },
    {
      wallet: 0,
      isBlocked: 0,
      password: 0,
      email: 0,
      connects: 0,
    }
  )
    .populate({ path: "skills", select: "name" })
    .populate({
      path: "projects",
      select: "-proposals",
      populate: { path: "category" },
    })
    .populate({ path: "portfolio", populate: { path: "skills relatedJob" } })
    .populate({
      path: "testimonials",
      populate: { path: "project", populate: { path: "category" } },
    })
    .then((data) => {
      if (!data) next(new Error("Freelancer not found"));
      else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/** get freelancer data  by id (get profile/ private view)
 */
module.exports.getFreelancerPrivate = (request, response, next) => {
  if (request.role == "freelancer" && request.id != request.params.id) {
    next(new Error(`not authorized`));
  } else {
    Freelancer.findOne(
      { _id: request.params.id },
      { isBlocked: 0, password: 0 }
    )
      .populate({ path: "skills", select: "name" })
      .populate({
        path: "projects",
        select: "-proposals",
        populate: { path: "category" },
      })
      .populate({ path: "portfolio", populate: { path: "skills relatedJob" } })
      .populate({
        path: "testimonials",
        populate: { path: "project", populate: { path: "category" } },
      })
      .then((data) => {
        if (!data) next(new Error("Freelancer not found"));
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }
};

/** get all freelancer data
 * auth by users
 */
module.exports.getAllFreelancers = (request, response, next) => {
  Freelancer.find(
    {},
    {
      email: 1,
      skills: 1,
      description: 1,
      firstName: 1,
      lastName: 1,
      title: 1,
      analytics: 1,
    }
  )
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**delete a freelancer
 * admin only
 * for dev use only
 */
module.exports.deleteFreelancer = (request, response, next) => {
  Freelancer.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "delete " + request.params.id });
    })
    .catch((error) => next(error));
};

/** update (add) connects
 * monthly 50 connects
 */
module.exports.updateConnects = (request, response, next) => {
  let User;

  request.params.userType == "freelancer"
    ? (User = Freelancer)
    : request.params.userType == "team"
      ? (User = Team)
      : next(new Error("Invalid User type"));

  User.findById(request.id)
    .then((user) => {
      console.log(user);
      if (!user) next(new Error("user not found"));
      else {
        /** monthly at 1st*/
        // const today = new Date(request.body.date); //test
        const today = new Date();
        // const dTime = Math.abs(today - data.createdAt);
        // const dDays = Math.floor(dTime / (1000 * 60 * 60 * 24));
        // if (dDays > 30) data.connects += 50;
        if (today.getDate() == 1) {
          user.connects += 50;
          if (user.connects - 500) user.connects -= user.connects - 500; //connects cant exceed 500
        } else {
          next(new Error("not today bud!"));
        }
      }
      return user.save();
    })
    .then((data) => {
      response.status(201).json({ data: "updated" });
    })
    .catch((error) => next(error));
};
