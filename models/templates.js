var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  substitionSchema = new Schema({
    src: String,
    dst: String
  }),
  variableSchema = new Schema({
    name: String,
    subs: [substitionSchema]
  }),
  templateSchema = new Schema({
    problem: String,
    solution: String,
    variables: [variableSchema],
    level: String,
    difficulty: Number,
    grammarPoint: String,
    // vacabularies: [String],
    reference: [{textbook: String, chapter: String}],
    tags: [String]
  }, {
    timestamps: true
  }),
  Template = mongoose.model("Template", templateSchema);

module.exports = Template;
