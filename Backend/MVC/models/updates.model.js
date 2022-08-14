const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object
const updateSchema = new mongoose.Schema({
    _id:{
        type: Number,
    },
    admin:{
        type: Number,
        ref: "admins",
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, { _id: false });

//mapping
updateSchema.plugin(AutoIncrement, {id: 'updatesId'});
mongoose.model("updates",updateSchema);