var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  grammarSchema = new Schema({
    grammarPoint: String
  }, {
    timestamps: true
  }),
  Grammar = mongoose.model("Grammar", grammarSchema);

module.exports = Grammar;
