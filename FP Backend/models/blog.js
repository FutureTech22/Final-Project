"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({

	title: {
     required: [true, "Please provide name"],
     type: String,
 },

 	description: {
     required: [true, "Please provide age"],
     type: String,
 },

 URL: {
     required: false,
     type: String,
 }

});

module.exports = mongoose.model('user', userSchema);