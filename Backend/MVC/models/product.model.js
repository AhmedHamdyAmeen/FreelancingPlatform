const mongoose = require("mongoose");
const recruiterSchema = require("./recruiter.model");

const { Schema, Types } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    ownerId: {
      type: Number,
      refPath: "ownerModel", //refPath
    },
    ownerModel: {
      type: String,
      required: true,
      emun: ["freelancers", "teams"],
    },

    productName: {
      type: String,
      required: true,
      unique: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    timesOfDownload: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    buyer: {
      type: [{ type: recruiterSchema }],
    },
    product: {
      type: String,
      required: true,
    },
    buyerModel: {
      type: String,
      enum: ["companies", "clients"],
    },
    skills: {
      type: [{ type: Number }],
      ref: "skills",
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

productSchema.plugin(AutoIncrement, { id: "productId" });
mongoose.model("products", productSchema);
