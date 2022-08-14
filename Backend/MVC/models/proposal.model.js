const mongoose = require("mongoose");

const talentSchema = require("./talent.model");

const proposalSchema = new mongoose.Schema({
  _id: false,
  talent: talentSchema,
  name: String,
  text: {
    type: String,
    required: true,
  },
  files: [String],
});

mongoose.model("proposals", proposalSchema);
