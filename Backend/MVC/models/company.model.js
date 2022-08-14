const mongoose = require("mongoose");
const locationSchema = require("./locations.model");
const analyticsSchema = require("./analytics.model");
const testimonialSchema = require("./testimonial.model");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const companyschema = new mongoose.Schema(
  {
    _id: {
      type: Number, /// auto
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minlength: 100,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
    },
    logo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    secondEmail: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    address: {
      type: locationSchema,
      default: {},
    },
    analytics: {
      type: analyticsSchema,
      default: {},
    },
    wallet: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: Number,
    },
    projects: {
      type: [Number],
      ref: "projects",
    },
    testimonials: { type: [testimonialSchema] },
  },
  { _id: false }
);

companyschema.plugin(AutoIncrement, { id: "company_id" });
module.exports = mongoose.model("company", companyschema);
