const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object
const questionSchema = new mongoose.Schema({
    _id:{
        type: Number
    },
    date:{
        type: Date,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    }
}, { _id: false });

//mapping
questionSchema.plugin(AutoIncrement, {id: 'questionId'});
mongoose.model("questions",questionSchema);