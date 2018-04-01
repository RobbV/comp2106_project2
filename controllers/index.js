var express = require('express');
var router = express.Router();
//passport
const passport = require('passport');
// model
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
		title: 'Sport Tracker',
		user: req.user,
		username: req.username
	});
});
/*==========================================
About
============================================*/
//GET: about page
router.get('/about', (req,res,next) => {
	res.render('index', {
		title: 'About',
		user: req.user
	});
});
/*==========================================*/
/*==========================================
Register
============================================*/
//GET: Register Page
router.get('/register', (req,res,next) => {
	res.render('register', {
		title: 'Register',
		user: req.user,
		backgroundimage: 'stylesheets/registerbackground'
	});
});
//POST: Register
router.post('/register', (req,res,next) => {
	User.register(new User({
			username: req.body.username,
			fullName: req.body.fullname
	}), req.body.password, (err,user) =>{
		if(err) {
			console.log(err);
		} else {
			res.redirect('/login');
		}
	});
});
/*==========================================*/
/*==========================================
Login
============================================*/
//GET: Login Page
router.get('/login', (req,res,next) => {
	res.render('login', {
		title: 'Login',
		user: req.user
	});
});
//POST: /Login
router.post('/login', passport.authenticate('local', {
	  successRedirect: '/',
	    failureRedirect: '/login',
	    failureMessage: 'Invalid Login'
	}));
/*==========================================*/
/*==========================================
Logout
============================================*/
router.get('/logout', (req, res, next) => {

    // clear out any session messages
    req.session.messages = [];

    // end the user's session
    req.logout();

    // redirect to login or home
    res.redirect('/');
});
/*==========================================*/
module.exports = router;
