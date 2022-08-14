const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { languages } = require("../helpers/enums");

const { emailRegex, passwordRegex, phoneRegex } = require("../helpers/regex");
const { checkDuplicated } = require("../helpers/functions");

const locationSchema = require("./locations.model");
const educationSchema = require("./education.model");
const analyticsSchema = require("./analytics.model");
const certificateSchema = require("./certificates.model");
const testimonialSchema = require("./testimonial.model");
const portfolioSchema = require("./portfolio.model");
const experinceSchema = require("./experince.model");

//create schema object
const freelancerSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
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
    // secondEmail: {
    //   type: String,
    // },
    phoneNumber: {
      type: String,
      // validate: {
      //     validator: function(value) {
      //       return phoneRegex.test(value);
      //     },
      //     message: props => `${props.value} is not a valid phone number!`
      // },
    },
    profileImage: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    hourlyRate: {
      type: Number,
    },
    wallet: {
      type: Number,
      default: 0,
      min: 0,
    },
    connects: {
      type: Number,
      default: 50,
      min: 0,
      max: 500,
    },
    hoursPerWeek: {
      type: Number,
      default: 30,
      max: 30,
      min: 5,
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      minLength: 100,
      maxLength: 500,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    // 1:Many embedded relationships
    languages: {
      type: [String],
      enum: languages,
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated language value`,
      },
    },
    education: {
      type: [educationSchema],
    },
    testimonials: {
      type: [testimonialSchema],
    },
    certificates: {
      type: [certificateSchema],
    },
    portfolio: {
      type: [portfolioSchema],
    },
    experience: {
      type: [experinceSchema],
    },

    // 1:Many parent ref relationships
    projects: {
      //in progress
      type: [Number],
      ref: "projects",
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated project ID value`,
      },
    },
    badges: {
      type: [Number],
      ref: "tests",
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated language value`,
      },
    },

    //many:many 2-way ref relationships
    skills: {
      type: [Number],
      ref: "skills",
      validate: {
        validator: checkDuplicated,
        message: (props) => `${props.value} duplicated skill value`,
      },
    },

    //1:1 embedded relationships
    analytics: {
      type: analyticsSchema,
      default: () => ({}),
    },
    address: {
      type: locationSchema,
      default: () => ({}),
    },
  },
  { _id: false, timestamps: true }
);

//mapping
freelancerSchema.plugin(AutoIncrement, { id: "freelancerId" });
module.exports = mongoose.model("freelancers", freelancerSchema);
