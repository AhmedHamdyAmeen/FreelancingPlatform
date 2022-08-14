const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { reportTypes, users } = require("../helpers/enums");

//create schema object
const reportSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    category: {
      type: String,
      enum: reportTypes,
      required: true,
    },
    body: {
      type: String,
    },
    reporter: {
      type: Number,
      required: true,
      refPath: "reporterModel",
    },
    reporterModel: {
      type: String,
      required: true,
      enum: users,
    },
    reported: {
      type: Number,
      required: true,
      refPath: "reportedModel",
    },
    reportedModel: {
      type: String,
      required: true,
      enum: ["clients", "freelancers", "company", "teams", "products"],
    },
  },
  { _id: false, timestamps: true }
);

//mapping
reportSchema.plugin(AutoIncrement, { id: "reportsId" });
mongoose.model("reports", reportSchema);
