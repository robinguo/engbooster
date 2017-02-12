var express = require("express"),
  bodyParser = require("body-parser"),
  Template = require("../models/templates"),
  router = express.Router();

router.route("/")
.get(function(req, res, next) {
  Template.find({}, function(err, templates) {
    if (err) {
      err.status = 500;
      next(error);
    }
    res.json(templates);
  });
})
.post(function(req, res, next) {
  Template.insertMany([req.body], function(error, templates) {
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
.all(function(req, res, next) {
  next();
})
.get(function(req, res, next) {
  Template.findById(req.params.id, function(err, template) {
    if (template) {
      res.json(template);
    } else {
      var err = new Error("Template '" + req.params.id + "' not found");
      err.status = 404;
      next(err);
    }
  });
})
.put(function(req, res, next) {
  Template.findByIdAndUpdate(req.params.id, {
    $set: req.body
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
.delete(function(req, res, next) {
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