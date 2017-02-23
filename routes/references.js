var express = require("express"),
  bodyParser = require("body-parser"),
  error = require("../middlewares/error.js"),
  Reference = require("../models/references.js"),
  Template = require("../models/templates.js"),
  Verify = require("./verify"),
  router = express.Router();

router.route("/")
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Reference.find({})
      .sort({ textbook: "asc" })
      .exec(function(err, reference) {
        if (err) {
          err.status = 500;
          next(error);
        }
        res.json(reference);
      });
  })
  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    var reference = req.body;
    reference.createdBy = req.decoded._doc.username;
    reference.updatedBy = req.decoded._doc.username;
    Reference.insertMany([reference], function(error, reference) {
      if (reference.length) {
        res.json(reference);
      } else {
        var err = new Error("Reference '" + JSON.stringify(req.body) + "' not inserted");
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
    Reference.findById(req.params.id, function(err, reference) {
      if (reference) {
        res.json(reference);
      } else {
        var err = new Error("Reference '" + req.params.id + "' not found");
        err.status = 404;
        next(err);
      }
    });
  })
  .put(Verify.verifyOrdinaryUser, function(req, res, next) {
    var reference = req.body;
    reference.updatedBy = req.decoded._doc.username;
    Reference.findByIdAndUpdate(req.params.id, {
      $set: reference
    }, {
      new: false
    }, function(err, oldReference) {
      if (oldReference) {
        Template.updateMany({ "references.textbook": oldReference.textbook }, { "references.$.textbook": reference.textbook },
          function(err, templates) {
            res.json({ reference, templates });
          }
        );
      } else {
        var err = new Error("Reference '" + req.params.id + "' not updated");
        err.status = 404;
        next(err);
      }
    });
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Reference.findByIdAndRemove(req.params.id, function(err, oldReference) {
      if (oldReference) {
        Template.updateMany({ "references.textbook": oldReference.textbook }, { "$pull": { references: { textbook: oldReference.textbook } } },
          function(err, templates) {
            res.json({ oldReference, templates });
          }
        );
      } else {
        var err = new Error("Reference '" + req.params.id + "' not deleted");
        err.status = 404;
        next(err);
      }
    });
  });

module.exports = router;
