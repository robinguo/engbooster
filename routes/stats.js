var express = require("express"),
  // bodyParser = require("body-parser"),
  async = require("async"),
  error = require("../middlewares/error.js"),
  Template = require("../models/templates.js"),
  Reference = require("../models/references"),
  Verify = require("./verify"),
  router = express.Router();

router.route("/")
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    async.parallel({
        "subject": function(callback) {
          Template.aggregate([{ $unwind: "$subjects" }, { $group: { _id: "$subjects", count: { $sum: 1 } } }, { $sort: { _id: 1 } }], function(err, results) {
            console.log(results);
            callback(null, results);
          });
        },
        "reference": function(callback) {
          Template.aggregate([{ $unwind: "$references" }, { $group: { _id: {textbook: "$references.textbook", chapter: "$references.chapter"}, count: { $sum: 1 } } }, { $sort: { "_id.textbook": 1, "_id.chapter": 1 } }], function(err, results) {
            console.log(results);
            callback(null, results);
          });
        },
        "createdBy": function(callback) {
          Template.aggregate([{ $group: { _id: "$createdBy", count: { $sum: 1 } } }], function(err, results) {
            console.log(results);
            callback(null, results);
          });
        }
      },
      function(err, results) {
        console.log(results);
        res.json(results);
      }
    );
  });

module.exports = router;
