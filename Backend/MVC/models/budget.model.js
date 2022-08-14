const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["fixed", "hourlyRate"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 5,
      // max: 1000,
    },
  },
  { _id: false }
);
module.exports = budgetSchema;
