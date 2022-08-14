const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const recruiterSchema = require("./recruiter.model");
const talentSchema = require("./talent.model");
const proposalSchema = require("./proposal.model");

const validators = require("../helpers/functions");

const minSkills = 3,
  maxSkills = 20,
  minProposals = 0,
  maxProposals = 50;

const projectSchema = new mongoose.Schema(
  {
    _id: Number,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 1000,
    },
    isInternship: {
      type: Boolean, //updatable only by company
      default: false,
    },
    budget: {
      type: Number,
      min: 5,
    },
    recruiter: { type: recruiterSchema, required: true },
    category: {
      type: Number,
      required: true,
      ref: "categories",
    },
    skills: {
      type: [Number],
      ref: "skills",
      validate: {
        validator: (items) =>
          validators.itemsLimit(items, minSkills, maxSkills),
        message: `project skills should be between ${minSkills},${maxSkills}`,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    connects: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    /*properties below will be added in backend not by user*/
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["posted", "ongoing", "finished"],
      default: "posted",
    },
    talent: talentSchema,
    proposals: {
      type: [proposalSchema],
      validate: {
        validator: (items) =>
          validators.itemsLimit(items, minProposals, maxProposals),
        message: `project proposals should be between ${minProposals},${minProposals}`,
      },
    },
  },
  { timestamps: true }
);

projectSchema.plugin(AutoIncrement, { id: "projectId" });
module.exports = mongoose.model("projects", projectSchema);
