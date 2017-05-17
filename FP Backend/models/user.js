"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
 email: { type: String, unique: true, lowercase: true },
 password: { type: String, select: false },
 displayName: String,
 picture: String,
 bitbucket: String,
 facebook: String,
 foursquare: String,
 google: String,
 github: String,
 instagram: String,
 linkedin: String,
 live: String,
 yahoo: String,
 twitter: String,
 twitch: String,
 spotify: String,
 locations: Array,
});

userSchema.pre('save', function(next) {
 var user = this;
 if (!user.isModified('password')) {
   return next();
 }
 bcrypt.genSalt(10, function(err, salt) {
   bcrypt.hash(user.password, salt, function(err, hash) {
     user.password = hash;
     next();
   });
 });
});

userSchema.methods.comparePassword = function(password, done) {
 bcrypt.compare(password, this.password, function(err, isMatch) {
   done(err, isMatch);
 });
};

module.exports = mongoose.model('User', userSchema);
