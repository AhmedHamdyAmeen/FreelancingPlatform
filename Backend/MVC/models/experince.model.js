const mongoose = require("mongoose");

const locationSchema = require("./locations.model");

const experinceSchema = new mongoose.Schema(
  {
    organization: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    location: locationSchema,
    startDate: Date,
    endDate: Date,
    description: {
      type: String,
      minLength: 100,
      maxLength: 500,
    },
  },
  { _id: false }
);

module.exports = experinceSchema;
