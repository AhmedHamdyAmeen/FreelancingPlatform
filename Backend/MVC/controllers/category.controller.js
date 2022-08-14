const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const { imageExtRegex } = require("../helpers/regex");

require("../models/category.model");
let Category = mongoose.model("categories");
let Skill = mongoose.model("skills");

const imageStorage = multer.diskStorage({
  destination: "public/categories",
  filename: (request, response, next) => {
    next(null, request.params.id + path.extname(response.originalname));
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(request, response, next) {
    if (!response.originalname.match(imageExtRegex)) {
      return next(new Error("Please upload an Image"));
    }
    next(undefined, true);
  },
}).single("image");

module.exports.createCategory = (request, response, next) => {
  let object = new Category({
    name: request.body.name,
    skills: request.body.skills,
  });
  if (object.skills.length !== new Set([...object.skills]).size)
    throw Error("category skills should be unique");
  return object
    .save()
    .then((data) => {
      Skill.find({ _id: { $in: data.skills } }).then((skills) => {
        skills.map((skill) => {
          skill.categories.push(data._id);
          skill.save();
        });
        response.status(201).json({ msg: "category created", data });
      });
    })
    .catch((error) => next(error));
};

module.exports.getAllCategories = (request, response, next) => {
  Category.find({})
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getCategoryById = (request, response, next) => {
  Category.findById({ _id: request.params.id })
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      if (data == null) next(new Error("category not found"));
      else {
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteCategory = (request, response, next) => {
  Category.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("category not found"));
      } else {
        Skill.find({ categories: request.params.id }).then((skills) => {
          skills.map((skill) => {
            skill.categories.splice(
              skill.categories.indexOf(request.params.id),
              1
            );
            skill.save();
          });
        });
        response.status(200).json({ msg: "category deleted" });
      }
    })
    .catch((error) => next(error));
};

module.exports.updateImage = (request, response, next) => {
  console.log(request.file.path);
  console.log(request.body);
  if (!request.file) next(new Error("file not found"));
  Category.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("category not found"));

      // console.log(request.file.path);
      data.image = `${request.protocol}://${request.hostname}:${process.env.PORT
        }/${request.file.path.replaceAll("\\", "/")}`;
      return data.save().then((data) => {
        response.status(201).json({ msg: "Category updated", data });
      });
    })
    .catch((error) => {
      next(error);
    });
  // response.send(request.file);
};

module.exports.updateCategory = (request, response, next) => {
  console.log(request.body);
  console.log(request.file);
  Category.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("category not found"));
      for (let prop in request.body) {
        if (prop == "name") {
          if (request.body[prop] == data[prop]) {
            continue;
          }
          data[prop] = request.body[prop];
        } else if (prop == "skills") {
          for (let skill in request.body.skills) {
            request.body.skills[skill] = parseInt(request.body.skills[skill]);
          }
          data.skills = [...new Set([...data.skills, ...request.body.skills])];
        }
      }
      if (request.file) {
        data.image = `${request.protocol}://${request.host}:${process.env.PORT
          }/${request.file.path.replaceAll("\\", "/")}`;
      }

      return data.save().then((data) => {
        request.project = request.params.id;
        response.status(201).json({ msg: "Category updated", data });
      });
    })
    .catch((error) => {
      next(error);
    });
};
