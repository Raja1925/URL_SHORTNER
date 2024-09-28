const { Timestamp } = require('bson');
const mongoose = require('mongoose');

// Creating Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [ { timestamp: { type: Number } } ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
 },
 { timestamps: true }
);


// Creating Model
const URL = mongoose.model('url', urlSchema);

module.exports = URL;