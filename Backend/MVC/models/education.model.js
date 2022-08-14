const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
        organization: {
                required: true,
                minLength: 2,
                type: String,
        },
        degree: {
                required: true,
                minLength: 2,
                type: String,
        },
        areaOfStudy: {
                type: String,
                minLength: 2,
        },
        startDate: {
                type: Date,
                required: true,
        },
        endDate: {
                type: Date
        },
        description: {
                type: String,
                minLength: 100,
                maxLength: 500
        }
}, { _id: false });

module.exports = educationSchema;