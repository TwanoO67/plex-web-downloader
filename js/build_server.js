var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('../config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

//protection par mot de passe
if( typeof config.auth_user !== 'undefined' && typeof config.auth_password !== 'undefined' ){
  console.log("SAFE MODE: votre serveur est protégé par mot de passe.");
  var basicAuth = require('basic-auth');
  app.use(function(req, res, next) {
    var user = basicAuth(req);
    if (!user || user.name !== config.auth_user || user.pass !== config.auth_password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    else{
      next();
    }
  });
}
else{
  console.log("UNSAFE MODE: configurez un auth_user et auth_password dans le fichier config.js");
}

//envoyer config a tout le monde
app.use(function(req, res, next) {
  res.locals.config = config;
  next();
});

app.use(favicon(path.join(__dirname, '../public', 'iconarchive_plex.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/', require('../routes/index'));
app.use('/users', require('../routes/users'));
app.use('/file', require('../routes/file'));
app.use('/channel', require('../routes/channel'));
app.use('/movie', require('../routes/movie'));
app.use('/show_list', require('../routes/show_list'));
app.use('/show', require('../routes/show'));
app.use('/divers', require('../routes/divers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
