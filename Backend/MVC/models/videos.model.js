const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//create schema object
const videoSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

//mapping
videoSchema.plugin(AutoIncrement, { id: "videoId" });
mongoose.model("videos", videoSchema);
