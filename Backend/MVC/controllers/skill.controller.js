const mongoose = require("mongoose");

require("../models/skill.model");
let Skill = mongoose.model("skills");

require("../models/category.model");
let Category = mongoose.model("categories");

module.exports.createSkill = (request, response, next) => {
  let object = new Skill({
    name: request.body.name,
    categories: request.body.categories,
  });
  if (object.categories.length !== new Set([...object.categories]).size)
    throw Error("categories should be unique");
  Skill.find({ name: request.body.name })
    .then((data) => {
      if (!data.length) {
        return object.save();
      } else throw Error("skill name already token");
    })
    .then((data) => {
      Category.find({ _id: { $in: data.categories } }).then((categories) => {
        categories.map((category) => {
          category.skills.push(data._id);
          category.save();
        });
        response.status(201).json({ msg: "category created", data });
      });
    })
    .catch((error) => next(error));
};

module.exports.getAllSkills = (request, response, next) => {
  Skill.find({})
    .populate({ path: "categories", select: "name" })
    .populate({ path: "talents" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getSkillById = (request, response, next) => {
  Skill.findById({ _id: request.params.id })
    .populate({ path: "categories", select: "name" })
    .populate({ path: "talents" })
    .then((data) => {
      if (!data) next(new Error("skill not found"));
      else {
        console.log(data.talents.id);
        response.status(200).json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteSkill = (request, response, next) => {
  Category.find({ skills: request.params.id }).then((categories) => {
    console.log(categories);
    categories.map((category) => {
      category.skills.splice(category.skills.indexOf(request.params.id), 1);
      category.save();
    });
  });
  Skill.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("skill not found"));
      } else response.status(200).json({ msg: "skill deleted" });
    })
    .catch((error) => next(error));
};

module.exports.updateSkill = (request, response, next) => {
  Skill.findById(request.params.id)
    .then((data) => {
      if (!data) next(new Error("skill not found"));
      for (let prop in request.body) {
        if (prop == "talents") continue;
        else if (prop == "name") {
          if (request.body[prop] == data[prop]) {
            continue;
          }
          Skill.findOne({ name: request.body.name }).then((repeatedData) => {
            if (repeatedData) {
              next(new Error("skill name is already token"));
            } else {
              data[prop] = request.body[prop];
            }
          });
        } else data[prop] = request.body[prop] || data[prop];
      }
      return data.save().then((data) => {
        Category.find({}).then((categories) => {
          categories.map((category) => {
            if (!request.body.categories.includes(category._id)) {
              category.skills.splice(category.skills.indexOf(data._id), 1);
            } else category.skills.push(data._id);
            category.skills = [...new Set(category.skills)];
            category.save();
          });
          response.status(201).json({ msg: "Skill updated", data });
        });
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addTalentToSkill = (request, response, next) => {
  Skill.find({ _id: { $in: request.body.skills } })
    .then((skills) => {
      for (let skill in skills) {
        if (!skill) next(new Error("skill not found"));
        skill.talents = [...new Set([...skill.talents, request.id])];
      }
      return skills.save().then((skills) => {
        response.status(201).json({ msg: "talent added to skill", skills });
      });
    })
    .catch((error) => {
      next(error);
    });
};
