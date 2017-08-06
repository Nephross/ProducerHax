'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const HttpError = require('./api/utils/http-error');

let api = require('./api/routes/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('x-powered-by', false); // Disables the http header value of x-powered-by

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/app/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true })); // CRSF protection
app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false // To reduce storrage usage
})); // Session initialized
app.use(express.static(path.join(__dirname, '/app/public/')));
app.use(express.static(path.join(__dirname, '/app/')));

// routes
app.use('/api', api);

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
  res.sendFile(path.join(__dirname, '/app/public/index.html'));
});

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.httpStatus);
    if (err.body) {
      return res.json(err.body);
    } else {
      return res.end(err.message);
    }
  } else {
    next(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    next(err);
  }
  // handle CSRF token errors here
  res.status(403);
  return res.send('form tampered with');
});

// Apply error handling after the routes

module.exports = app;
