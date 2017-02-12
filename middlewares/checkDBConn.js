var mongoose = require("mongoose");

module.exports = function(request, response, next) {
  if (mongoose.connection.readyState !== 1) {
    var err = new Error("Database error");
    err.status = 500;
    next(err);
  }
  next();
}