var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/engbooster"; // TODO: MOVE constants to global config file
mongoose.connect(url, {user: "eb", pass: "bobobo"}); // TODO: MOVE constants to global config file
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongoose default connection error: "));
db.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});
db.on("reconnected", function() {
  console.log("Mongoose default connection reconnected to: " + url);
});
db.once('open', function () {
  console.log("Mongoose default connection open to: " + url);
});
process.on("SIGINT", function() {
  db.close(function() {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});


var checkDBConn = require("./middlewares/checkDBConn.js");
var templates = require("./routes/templates.js");
var users = require("./routes/users.js");
var stats = require("./routes/stats.js");
var references = require("./routes/references.js");
var grammars = require("./routes/grammars.js");
var error =require("./middlewares/error.js")

var app = express();

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models/users.js");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
app.use(checkDBConn);
app.use('/api/users', users);
app.use("/api/templates", templates);
app.use("/api/stats", stats);
app.use("/api/references", references);
app.use("/api/grammars", grammars);
app.use("/*", function(req, res, next) {
  res.sendFile("index.html", {root: path.join(__dirname, "public", "manager")});
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(error);

module.exports = app;
