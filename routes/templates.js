var express = require("express"),
  bodyParser = require("body-parser"),
  error = require("../middlewares/error.js"),
  Template = require("../models/templates.js"),
  Verify = require("./verify"),
  router = express.Router();

router.route("/")
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Template.find({})
      .exec(function(err, templates) {
        if (err) {
          err.status = 500;
          next(error);
        }
        res.json(templates);
      });
  })
  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    var template = req.body;
    template.createdBy = req.decoded._doc.username;
    template.updatedBy = req.decoded._doc.username;
    Template.insertMany([template], function(error, templates) {
      if (templates.length) {
        res.json(templates);
      } else {
        var err = new Error("Template '" + JSON.stringify(req.body) + "' not inserted");
        err.status = 404;
        next(err);
      }
    });
  });

router.route("/:id")
  .all(Verify.verifyOrdinaryUser, function(req, res, next) {
    next();
  })
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Template.findById(req.params.id)
      .exec(function(err, template) {
        if (template) {
          res.json(template);
        } else {
          var err = new Error("Template '" + req.params.id + "' not found");
          err.status = 404;
          next(err);
        }
      });
  })
  .put(Verify.verifyOrdinaryUser, function(req, res, next) {
    var template = req.body;
    template.updatedBy = req.decoded._doc.username;
    Template.findByIdAndUpdate(req.params.id, {
      $set: template
    }, {
      new: true
    }, function(err, template) {
      if (template) {
        res.json(template);
      } else {
        var err = new Error("Template '" + req.params.id + "' not updated");
        err.status = 404;
        next(err);
      }
    });
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Template.findByIdAndRemove(req.params.id, function(err, template) {
      if (template) {
        res.json(template);
      } else {
        var err = new Error("Template '" + req.params.id + "' not deleted");
        err.status = 404;
        next(err);
      }
    });
  });

module.exports = router;
