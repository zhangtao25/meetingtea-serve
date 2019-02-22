var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var authRouter = require('./routes/auth');
var noteRouter = require('./routes/note');
var cityRouter = require('./routes/city');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req,res,next){
  if(req.url =='/test'){
    let tokenObj = req.headers.authorization;
    tokenObj = JSON.parse(tokenObj)
    jwt.verify(tokenObj.token,tokenObj.phonenumber,function(err,decode){
      if(err){
        res.json({
          message: 'token过期，请重新登录',
          resultCode: '403'
        })
      }else{
        next();
      }
    })
  }else{
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/note', noteRouter);
app.use('/city', cityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
