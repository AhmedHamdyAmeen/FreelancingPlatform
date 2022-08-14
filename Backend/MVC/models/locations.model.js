const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    postalCode:{
        type: Number,
        default: 00000
    },
    city:{
        type: String,
        default: ""
    },
    address:{
        type: String,
        default: ""
    },
    state:{
        type: String,
        default: ""
    }
},{_id: false });

module.exports = locationSchema;