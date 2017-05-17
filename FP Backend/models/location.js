"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var locationSchema = new mongoose.Schema({

    location: {
        required: [true, "Please provide location"],
        type: String,
    },

});

module.exports = mongoose.model('location', locationSchema);
