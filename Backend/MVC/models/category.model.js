const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const validators = require("../helpers/functions");

const minSkills = 0;
const maxSkills = 100;

const categorySchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  image: {
    type: String,
  },
  skills: {
    type: [Number],
    ref: "skills",
    validate: [
      {
        validator: validators.checkUniqueItems,
        message: "category skills should be unique",
      },
      {
        validator: (items) =>
          validators.itemsLimit(items, minSkills, maxSkills),
        message: () =>
          `category skills should be between ${minSkills},${maxSkills}`,
      },
    ],
  },
});

categorySchema.plugin(AutoIncrement, { id: "categoryId" });

mongoose.model("categories", categorySchema);
