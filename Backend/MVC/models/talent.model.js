const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: Number,
    required: true,
    refPath: "type",
  },
  type: {
    type: String,
    required: true,
    enum: ["freelancers", "teams"],
  },
});

module.exports = talentSchema;
