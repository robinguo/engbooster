var mongoose = require("mongoose");
var tree = require('mongoose-path-tree');
var Schema = mongoose.Schema;
var subjectSchema = new Schema({
  title: String
}, {
  timestamps: true
});

subjectSchema.plugin(tree);
Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
