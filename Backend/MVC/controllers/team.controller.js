const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { imageExtRegex, fileExtRegex } = require("../helpers/regex");

let Team = require("../models/team.model");

module.exports.createTeam = (request, response, next) => {
  let object = new Team({
    name: request.body.name,
    description: request.body.description,
    hourlyRate: request.body.hourlyRate,
    members: [...request.body.members, request.id],
    skills: request.body.skills,
  });
  Team.findOne({
    $or: [{ members: request.body.members }, { name: request.body.name }],
  })
    .then((team) => {
      if (!team) {
        object.save().then((data) => {
          response.status(201).json({ msg: "team created", data });
        });
      } else {
        throw new Error(
          "team members already exist in another team or team name already token"
        );
      }
    })
    .catch((error) => next(error));
};

module.exports.getAllTeams = (request, response, next) => {
  Team.find({}, { testimonials: 0, wallet: 0 })
    .populate({ path: "members", select: "firstName lastName -_id" })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "projects", select: "name" })
    .populate({ path: "portfolios" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getTeamByIdPublic = (request, response, next) => {
  Team.findOne({ _id: request.params.id }, { wallet: 0 })
    .populate({ path: "members" })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "projects", select: "name" })
    .populate({ path: "portfolios", populate: { path: "skills" } })
    .then((data) => {
      if (data == null) next(new Error("team not found"));
      else {
        request.id = data.id;
        request.role = "team";
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getTeamByIdPrivate = (request, response, next) => {
  Team.findOne({ _id: request.params.id })
    .populate({ path: "members" })
    .populate({ path: "skills", select: "name" })
    .populate({ path: "projects", select: "name" })
    .then((data) => {
      if (!data) next(new Error("team not found"));
      else if (
        request.role == "freelancer" &&
        !data.members.filter((member) => member._id == request.id)[0]
      )
        next(new Error("not team member"));
      else {
        request.id = data.id;
        request.role = "team";
        console.log(request.id, request.role);
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getTeamByMember = (request, response, next) => {
  Team.findOne({ members: request.id }, { name: 1, logo: 1 })
    .then((data) => {
      if (!data) next(new Error("freelancer is not a member in any team"));
      else {
        request.id = data.id;
        console.log(request.id);
        request.role = "team";
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

const imageStorage = multer.diskStorage({
  destination: "public/profileImages/teams",
  filename: (request, response, next) => {
    Team.findById(request.params.id).then((data) => {
      if (!data) next(new Error("Team not found"));
      else next(null, request.params.id + path.extname(response.originalname));
    });
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(request, response, next) {
    console.log(!response);
    if (!response.originalname.match(imageExtRegex)) {
      return next(new Error("Please upload an Image"));
    }
    next(undefined, true);
  },
}).single("image");

module.exports.updateTeam = (request, response, next) => {
  console.log(request.file);
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("team not found"));
      else if (request.role == "team" && request.id !== request.params.id)
        throw new Error("not team member");

      for (let prop in request.body) {
        if (prop == "name") {
          if (request.body[prop] == data[prop]) {
            continue;
          }
          Team.findOne({ name: request.body.name }).then((repeatedData) => {
            if (repeatedData) {
              next(new Error("team name is already token"));
            } else {
              data[prop] = request.body[prop];
            }
          });
        } else if (prop == "members" || prop == "skills") {
          if (
            [...request.body[prop]].length ===
            new Set([...request.body[prop]]).size
          )
            data[prop] = [...new Set([...request.body[prop]])];
          else throw new Error(`team ${prop} should be unique`);
          if ([...request.body[prop]].length > 16) {
            throw new Error(`team ${prop} should be less than 16`);
          }
        } else if (
          prop == "testimonials" ||
          prop == "logo" ||
          prop == "analytics" ||
          prop == "wallet" ||
          prop == "isVerified" ||
          prop == "projects" ||
          prop == "connects"
        )
          continue;
        else data[prop] = request.body[prop] || data[prop];
      }
      if (request.file) {
        data.logo = `${request.protocol}://${request.hostname}:${process.env.PORT
          }/${request.file.path.replaceAll("\\", "/")}`;
      }
      Team.findOne({ members: data.members, name: { $ne: data.name } }).then(
        (team) => {
          if (team) {
            next(new Error("team members already exist in another team"));
          }
          return data.save().then((data) => {
            response.status(201).json({ msg: "team updated", data });
          });
        }
      );
    })

    .catch((error) => {
      next(error);
    });
};

module.exports.deleteTeam = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) {
        next(new Error("Team not found"));
      } else if (request.role == "team" && !data.members.includes(request.id)) {
        next(new Error("not team member"));
      } else {
        fs.unlinkSync(
          data.logo.replace(
            `${request.protocol}://${request.hostname}:${process.env.PORT}/`,
            ""
          )
        );
        data.delete();
        response.status(200).json({ msg: "team deleted" });
      }
    })
    .catch((error) => next(error));
};

const filesStorage = multer.diskStorage({
  destination: `public/portfolioFiles/teams`,
  filename: (request, response, next) => {
    Team.findById(request.params.id).then((data) => {
      if (!data) next(new Error("Team not found"));
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
}).array("files", 2);

module.exports.createPortfolio = (request, response, next) => {
  console.log(request.body.projectTitle);
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (request.role == "team" && !data.members.includes(request.id))
        next(new Error("not team member"));

      let object = {};
      for (let prop in request.body) {
        object[prop] = request.body[prop];
      }
      request.files.map((file) => {
        object.files.push(
          `${request.protocol}://${request.hostname}:${process.env.PORT
          }/${file.path.replaceAll("\\", "/")}`
        );
      });
      data.portfolios.push(object);
      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "portfolio created", data: data.portfolios });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updatePortfolio = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (!data.members.includes(request.id))
        next(new Error("not team member"));
      for (let prop in request.body) {
        if (prop == "files") {
          data.portfolios[request.body.index].files = [
            `${request.protocol}://${request.hostname}:${process.env.PORT
            }/${request.files[0].path.replaceAll("\\", "/")}`,
            `${request.protocol}://${request.hostname}:${process.env.PORT
            }/${request.files[1].path.replaceAll("\\", "/")}`,
          ];
        } else if (prop != "index") {
          data.portfolios[request.body.index][prop] = request.body[prop];
        }
      }

      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "portfolio updated", data: data.portfolios });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deletePortfolio = (request, response, next) => {
  Team.findById(request.params.id)
    .then((data) => {
      if (!data) throw new Error("team not found");
      else if (request.role == "team" && !data.members.includes(request.id))
        next(new Error("not team member"));
      console.log(request.body.index);
      console.log(data.portfolios.length);
      if (request.body.index < data.portfolios.length) {
        data.portfolios[request.body.index].files.map((file) => {
          fs.unlinkSync(
            file.replace(
              `${request.protocol}://${request.hostname}:${process.env.PORT}/`,
              ""
            )
          );
        });
        data.portfolios.splice(request.body.index, 1);

        return data.save().then(() => {
          response.status(200).json({ msg: "portfolio deleted" });
        });
      } else {
        throw Error("team portfolio not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

// module.exports.getTestimonialByProjectId = (request, response, next) => {
//   Team.findOne({ "testimonials.project": request.params.pId })
//     // .populate({ path: "project", select: "name" })
//     .then((data) => {
//       console.log(data);
//       if (!data) {
//         next(new Error("testimonial not found"));
//       } else {
//         for (let item of data.testimonials) {
//           if (item.project == request.params.pId) {
//             response.status(200).json({ testimonials: item });
//           }
//         }
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// };
