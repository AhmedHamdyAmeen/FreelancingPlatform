const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object
const testSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    skills: {
      type: Number,
      ref: "skills",
      required: true,
      unique: true,
    },
    questions: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
    badges: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

//mapping
testSchema.plugin(AutoIncrement, {id: 'testsId'});
mongoose.model("tests",testSchema);