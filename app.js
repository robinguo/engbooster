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
var error =require("./middlewares/error.js")

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
app.use(checkDBConn);
app.use("/api/templates", templates);
app.use("/*", function(req, res, next) {
  res.sendFile("index.html", {root: path.join(__dirname, "public")});
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(error);

module.exports = app;
