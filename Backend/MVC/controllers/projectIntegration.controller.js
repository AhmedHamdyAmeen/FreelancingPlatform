let Client = require("../models/client.model");
let Freelancer = require("../models/freelancers.model");
let Company = require("../models/company.model");
let Team = require("../models/team.model");

/* when project is ongoing */
module.exports.addProjectToTalent = (request, response, next) => {
  let Talent;
  if (request.body.talent.type == "freelancers") Talent = Freelancer;
  else if (request.body.talent.type == "teams") Talent = Team;
  else next(new Error("invalid talent type"));

  Talent.findById(request.body.talent.id)
    .populate({ path: "projects", populate: { path: "proposals" } })
    .then((data) => {
      console.log(data);
      if (!data) throw new Error("talent not found");
      data.projects.push(request.params.id);
      return data.save().then((data) => {
        response
          .status(200)
          .json({ msg: "project added to talent", data: data.projects });
      });
    })
    .catch((error) => {
      next(error);
    });
};

/*when project is fininshed */
module.exports.createTestimonialToRecruiter = (request, response, next) => {
  let Recruiter;
  if (request.body.recruiterType == "client") Recruiter = Client;
  else if (request.body.recruiterType == "company") Recruiter = Company;
  else next(new Error("invalid Recruiter type"));

  let Talent;
  if (request.body.talent == "freelancer") Talent = Freelancer;
  else if (request.body.talent == "team") Talent = Team;
  else next(new Error("invalid talennt type"));

  Talent.findOne(
    { _id: request.id, "testimonials.project": request.params.id },
    { testimonials: 1 }
  )
    .populate({ path: "testimonials" })
    .then((talent) => {
      if (!talent) {
        next(new Error("talent not found"));
      } else {
        for (let testimonial of talent.testimonials) {
          if (testimonial.project == request.params.id) {
            testimonial.testimonialBack = true;
            return talent.save();
          }
        }
      }
    })
    .then(() => {
      Recruiter.findOne({ projects: request.params.id })
        .populate({ path: "projects" })
        .then((data) => {
          if (!data) next(new Error("project not found"));
          let testimonial = {};
          testimonial.project = request.params.id;
          testimonial.issued = new Date();
          testimonial.rating = request.body.rating;
          testimonial.comment = request.body.comment;
          data.testimonials.push(testimonial);
          let project = data.projects.filter(
            (obj) => obj._id == request.params.id
          );
          data.analytics.spent += project[0].budget;
          data.analytics.jobs += 1;
          data.wallet -= project[0].budget;
          return data.save().then((data) => {
            response.status(200).json({
              msg: "testimonial created",
              data: data.testimonials,
            });
          });
        })
        .catch((error) => {
          next(error);
        });
    });
};

module.exports.deleteTestimonialByProjectId = (request, response, next) => {
  let User;
  if (request.params.userType == "freelancer") User = Freelancer;
  else if (request.params.userType == "team") User = Team;
  else if (request.params.userType == "client") User = Client;
  else if (request.params.userType == "company") User = Company;
  else next(new Error("invalid User"));

  User.findOne({ "testimonials.project": request.params.id })
    .then((data) => {
      if (!data) {
        next(new Error("testimonial not found"));
      } else {
        for (let testimonial of data.testimonials) {
          if (testimonial.project == request.params.id) {
            data.testimonials.splice(data.testimonials.indexOf(testimonial), 1);
            console.log(data.testimonials.indexOf(testimonial));
            data.save();
            response.status(200).json({ msg: "testimonial deleted" });
          }
        }
      }
    })
    .catch((error) => next(error));
};
