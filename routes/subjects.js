var express = require("express"),
  bodyParser = require("body-parser"),
  error = require("../middlewares/error.js"),
  Template = require("../models/templates.js"),
  Subject = require("../models/subjects.js"),
  Verify = require("./verify"),
  router = express.Router();

router.route("/")
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    var level = req.query.level || 0;
    if (level === 0) {
      Subject.getChildrenTree({ recursive: true }, function(err, subjects) {
        res.json(subjects);
      });
    } else {
      Subject.find({ path: { $regex: "^\\w+(#\\w+){1," + level + "}$" } }, function(err, subjects) {
        res.json(subjects);
      })
    }
  })
  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    var subject = req.body;
    subject.createdBy = req.decoded._doc.username;
    subject.updatedBy = req.decoded._doc.username;
    var sub = new Subject(subject);
    sub.save(function(error, subject) {
      if (subject) {
        res.json(subject);
      } else {
        var err = new Error("Subject '" + JSON.stringify(req.body) + "' not inserted");
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
    Subject.findById(req.params.id, function(err, subject) {
      if (subject) {
        res.json(subject);
      } else {
        var err = new Error("Subject '" + req.params.id + "' not found");
        err.status = 404;
        next(err);
      }
    });
  })
  .put(Verify.verifyOrdinaryUser, function(req, res, next) {
    var subject = req.body;
    subject.updatedBy = req.decoded._doc.username;

    var sub = new Subject(subject);
    sub.isNew = false;
    sub.getAncestors(function(err, subjects) {
      var newSubject = [];
      for (var i = 1; i < subjects.length; i++) {
        newSubject.push(subjects[i].title);
      }
      newSubject.push(sub.title);
      Subject.findById(sub._id, function(err, oldSubject) {
        var oldTitle = oldSubject.title;
        Template.updateMany({ subjects: { $elemMatch: { $elemMatch: { $in: [oldTitle] } } } }, { $push: { "subjects": newSubject } }, function(err, results) {
          Template.updateMany({ subjects: { $elemMatch: { $elemMatch: { $in: [oldTitle] } } } }, { $unset: { "subjects.$": 1 } }, function(err, results) {
            Template.updateMany({}, { $pull: { "subjects": null } }, function(err, results) {
              sub.save(function(err, subject) {
                if (subject) {
                  res.json(subject);
                } else {
                  console.log(err);
                  var err = new Error("Subject '" + req.params.id + "' not updated");
                  err.status = 404;
                  next(err);
                }
              });
            });
          });
        });
      });
    });
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Subject.findById(req.params.id, function(err, subject) {
      subject.remove(function(err, subject) {
        if (subject) {
          var title = subject.title;
          Template.updateMany({ subjects: { $elemMatch: { $elemMatch: { $in: [title] } } } }, { $unset: { "subjects.$": 1 } }, function(err, results) {
            Template.updateMany({}, { $pull: { "subjects": null } }, function(err, results) {
              res.json(subject);
            });
          });
        } else {
          var err = new Error("Subject '" + req.params.id + "' not deleted");
          err.status = 404;
          next(err);
        }
      });
    });
  });

module.exports = router;
