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
        "tag": function(callback) {
          Template.aggregate([{ $unwind: "$tags" }, { $group: { _id: "$tags", count: { $sum: 1 } } }], function(err, results) {
            console.log(results);
            callback(null, results);
          });
        },
        "reference": function(callback) {
          Template.aggregate([{ $unwind: "$reference" }, { $group: { _id: "$reference", count: { $sum: 1 } } }], function(err, results) {
            console.log(results);
            Reference.populate(results, { path: "_id" }, function(err, reference) {
              console.log(reference);
              callback(null, reference);
            })
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
