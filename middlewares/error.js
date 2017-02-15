module.exports = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error_message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error_status = err.status || 500;
  res.locals.error_stack = err.stack;

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
}
