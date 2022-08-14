const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const testimonialSchema = require("./testimonial.model");
const analyticSchema = require("./analytics.model");
const portfolioSchema = require("./portfolio.model");

const validators = require("../helpers/functions");

const teamSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
    maxLength: 1000,
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
  },
  hoursPerWeek: {
    type: Number,
    required: true,
    min: 5,
    max: 30,
    default: 30,
  },
  logo: {
    type: String,
  },
  members: {
    type: [Number],
    ref: "freelancers",
    validate: [
      {
        validator: (items) => validators.itemsLimit(items, 2, 10),
        message: "team members should be between 2,10",
      },
      {
        validator: validators.checkUniqueItems,
        message: "team members items should be unique",
      },
    ],
  },
  skills: {
    type: [Number],
    ref: "skills",
    validate: [
      {
        validator: validators.itemsLimit,
        message: "team skills should be between 2,15",
      },
      {
        validator: validators.checkUniqueItems,
        message: "team skills items should be unique",
      },
    ],
  },
  projects: {
    type: [Number],
    ref: "projects",
    validate: {
      validator: validators.checkUniqueItems,
      message: "team projects items should be unique",
    },
  },
  testimonials: {
    type: [testimonialSchema],
    validate: {
      validator: validators.checkUniqueProject,
      message: "project already has testimonial",
    },
  },
  portfolios: {
    type: [portfolioSchema],
  },
  connects: {
    type: Number,
    default: 50,
    min: 0,
    max: 500,
  },
  analytics: { type: analyticSchema, default: () => ({}) },
  wallet: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

teamSchema.plugin(AutoIncrement, { id: "teamId" });

module.exports = mongoose.model("teams", teamSchema);
