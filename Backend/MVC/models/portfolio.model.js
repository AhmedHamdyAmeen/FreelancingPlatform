const mongoose = require("mongoose");

const { checkDuplicated } = require("../helpers/functions");

const portfolioSchema = new mongoose.Schema(
  {
    projectTitle: {
      required: true,
      type: String,
    },
    relatedJob: {
      type: Number,
      ref: "projects",
    },
    completionDate: {
      required: true,
      type: Date,
    },
    files: {
      required: true,
      type: [String],
    },
    skills: {
      type: [Number],
      ref: "skills",
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated skill value`,
      },
    },
    url: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 1000,
    },
  },
  { _id: false }
);

module.exports = portfolioSchema;
