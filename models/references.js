var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var referenceSchema = new Schema({
  textbook: String,
  chapter: String,
  grammar: { type: Schema.Types.ObjectId, ref: "Grammar" }
}, {
  timestamps: true
});
var Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
