const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//DB connection
const config = require('./config/globals');
//passport
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const partials = require('express-partials');

const index = require('./controllers/index');
const teams = require('./controllers/teams');
const games = require('./controllers/games');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
mongoose.connect(config.db);

// passport configuration
app.use(session({
    secret: 'any string for salting here',
    resave: true,
    saveUninitialized: false
}));

// initialize passport and the session
app.use(passport.initialize());
app.use(passport.session());
// reference User model
const User = require('./models/user');
// create local strategy
passport.use(User.createStrategy());

// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Use the GitHubStrategy within Passport.
passport.use(new GitHubStrategy({
    clientID: config.github.githubClientId,
    clientSecret: config.github.githubClientSecret,
    callbackURL: config.github.githubCallbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // and return that user instead.
      return done(null, profile);
    });
  }
));
// map the controllers
app.use('/', index);
app.use('/teamtracker', teams);
app.use('/gametracker', games);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
