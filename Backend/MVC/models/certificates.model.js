const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
    },
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    certificateId: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = certificateSchema;
