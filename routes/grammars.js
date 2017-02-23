var express = require("express"),
  bodyParser = require("body-parser"),
  error = require("../middlewares/error.js"),
  Grammar = require("../models/grammars.js"),
  Template = require("../models/templates.js"),
  Verify = require("./verify"),
  router = express.Router();

router.route("/")
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Grammar.find({})
      .exec(function(err, grammars) {
        if (err) {
          err.status = 500;
          next(error);
        }
        res.json(grammars);
      });
  })
  .post(Verify.verifyOrdinaryUser, function(req, res, next) {
    var grammar = req.body;
    grammar.createdBy = req.decoded._doc.username;
    grammar.updatedBy = req.decoded._doc.username;
    Grammar.insertMany([grammar], function(error, grammar) {
      if (grammar.length) {
        res.json(grammar);
      } else {
        var err = new Error("Grammar '" + JSON.stringify(req.body) + "' not inserted");
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
    Grammar.findById(req.params.id)
      .exec(function(err, grammar) {
        if (grammar) {
          res.json(grammar);
        } else {
          var err = new Error("Grammar '" + req.params.id + "' not found");
          err.status = 404;
          next(err);
        }
      });
  })
  .put(Verify.verifyOrdinaryUser, function(req, res, next) {
    var grammar = req.body;
    grammar.updatedBy = req.decoded._doc.username;
    Grammar.findByIdAndUpdate(req.params.id, {
      $set: grammar
    }, {
      new: false
    }, function(err, oldGrammar) {
      if (oldGrammar) {
        Template.updateMany({ "grammarPoints": oldGrammar.grammarPoint }, { $set: { "grammarPoints.$": grammar.grammarPoint } },
          function(err, templates) {
            res.json({ oldGrammar, templates });
          }
        );
      } else {
        var err = new Error("Grammar '" + req.params.id + "' not updated");
        err.status = 404;
        next(err);
      }
    });
  })
  .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Grammar.findByIdAndRemove(req.params.id, function(err, oldGrammar) {
      if (oldGrammar) {
        Template.updateMany({ "grammarPoints": oldGrammar.grammarPoint }, { "$pull": { grammarPoints: oldGrammar.grammarPoint } },
          function(err, templates) {
            res.json({ oldGrammar, templates });
          }
        );
      } else {
        var err = new Error("Grammar '" + req.params.id + "' not deleted");
        err.status = 404;
        next(err);
      }
    });
  });

module.exports = router;
