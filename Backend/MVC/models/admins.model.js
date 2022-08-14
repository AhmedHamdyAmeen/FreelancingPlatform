const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { emailRegex, passwordRegex } = require("../helpers/regex");
const locationSchema = require("./locations.model");

const adminSchema = new mongoose.Schema(
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
      unique: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return passwordRegex.test(value);
        },
        message: (props) => `${props.value} is too weak!`,
      },
    },
    title: {
      type: String,
      minLength: 5,
      maxLength: 25,
    },
    profileImage: {
      type: String,
    },
    location: locationSchema,
  },
  { _id: false }
);

adminSchema.plugin(AutoIncrement, { id: "adminId" });
module.exports = mongoose.model("admins", adminSchema);
