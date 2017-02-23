var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  referenceSchema = new Schema({
    textbook: String
  }, {
    timestamps: true
  }),
  Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
