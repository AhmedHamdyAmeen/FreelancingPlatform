const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    issued: {
      type: Date
    },
    comment: {
      required: true,
      type: String,
    },
    project: {
      type: Number,
      ref: "projects",
      required: true,
    },
    testimonialBack: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

module.exports = testimonialSchema;
