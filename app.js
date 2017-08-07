'use strict';
// Initialise env
require('./configEnv');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const HttpError = require('./api/lib/utils/http-error');

// Routes ::V1
const api = require('./api/routes/api');

var app = express();

app.set('x-powered-by', false); // Disables the http header value of x-powered-by

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/app/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // To reduce storrage usage
  cookie: {
    httpOnly: true, // To mitigate XSS
    secure: true // To avoid man in the middle Attacks
  }
})); // Session initialized
app.use(csrf()); // CRSF protection

// Middleware for setting csrf token on all responses.
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

app.use(express.static(path.join(__dirname, '/app/public/')));
app.use(express.static(path.join(__dirname, '/app/')));

// routes
app.use('/api', api);

app.all('/', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
  res.sendFile(path.join(__dirname, '/app/public/index.html'));
});

// middleware for custom httpErrors
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
    // handle CSRF token errors here
    res.status(403);
    return res.send('form tampered with');
  }
});

// Apply error handling after the routes

module.exports = app;
