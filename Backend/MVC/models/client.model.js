let mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

let analyticsSchema = require("./analytics.model");
let locationSchema = require("./locations.model");
let testimonialSchema = require("./testimonial.model");

const {
  emailRegex,
  passwordRegex,
  //  phoneRegex
} = require("../helpers/regex");

const { languages } = require("../helpers/enums");
const { checkDuplicated } = require("../helpers/functions");

const schema = new mongoose.Schema(
  {
    _id: { type: Number },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    lastName: { type: String, required: true },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return passwordRegex.test(value);
        },
        message: (props) => `${props.value} is too weak!`,
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: true,
    },
    picture: {
      type: String,
    },
    address: {
      type: locationSchema,
      default: {},
    },
    phoneNumber: {
      type: Number,

      default: 0,
    },
    analytics: {
      type: analyticsSchema,
      default: {},
    },
    languages: {
      type: [String],
      enum: languages,
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated language value`,
      },
    },
    wallet: { type: Number, default: 0 },
    description: {
      type: String,
      //  minLength: 50,
      maxLength: 1000,
      default: "",
    },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    testimonials: [testimonialSchema], // ! handling
    projects: { type: [Number], ref: "projects" },
    resetLink: { type: String, default: "" },
    loginToken: { type: String, default: "" },
  },
  { timestamps: true }
);

schema.plugin(AutoIncrement, { inc_field: "_id" });
module.exports = mongoose.model("clients", schema);
