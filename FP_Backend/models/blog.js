"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var blogSchema = new mongoose.Schema({

	title: {
     required: [true, "Please provide name"],
     type: String,
 },

 	description: {
     required: [true, "Please provide age"],
     type: String,
 },

 url: {
     required: false,
     type: String,
 }

});

module.exports = mongoose.model('blog', blogSchema);