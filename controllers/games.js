// references
var express = require('express');
var router = express.Router();
const Game = require('../models/game');
const functions = require('../config/functions');
/* GET home page. */
router.get('/', function(req, res, next) {
	// get game documents from db
	Game.find((err, games) => {
			if (err) {
					console.log(err);
			}
			else {
					res.render('games/index', {
							title: 'Game Tracker',
							games: games,
							user: req.user
					});
			}
	});
});
/*==========================================
Add
============================================*/
//GET: add a new Game page
router.get('/add', functions.isLoggedIn,(req,res,next) => {
	res.render('games/add', {
		title: 'Add a new game',
		user: req.user
	});
});
//POST: add a new game to the database
router.post('/add', functions.isLoggedIn,(req,res,next) => {
	// create new game in the database
    Game.create({
			sportType: req.body.sportType,
			teamOne: req.body.teamOne,
			teamTwo: req.body.teamTwo,
			eventDate: req.body.eventDate,
			scoreOne: req.body.scoreOne,
			scoreTwo: req.body.scoreTwo,
			location: req.body.location,
			outCome: req.body.outCome
    }, (err, make) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/gametracker');
        }
    });
});
/*==========================================*/
/*==========================================
Edit
============================================*/
// GET: edit game page
router.get('/edit/:_id', functions.isLoggedIn,(req, res, next) => {
    // get _id param from url
    let _id = req.params._id;

    // use the Make model to find the selected document
    Game.findById(_id, (err, game) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('games/edit', {
                title: 'Edit the game info',
                game: game,
                user: req.user
            });
        }
    });
});
// POST: and update that information in DB
router.post('/edit/:_id', functions.isLoggedIn,(req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values
    Game.update({ _id: _id },
        { $set: {
					sportType: req.body.sportType,
					teamOne: req.body.teamOne,
					teamTwo: req.body.teamTwo,
					eventDate: req.body.eventDate,
					scoreOne: req.body.scoreOne,
					scoreTwo: req.body.scoreTwo,
					location: req.body.location,
					outCome: req.body.outCome
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/gameTracker');
            }
        });
			});
/*==========================================*/
/*==========================================
Delete
============================================*/
router.get('/delete/:_id', (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Game model to delete the document with this id
    Game.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/gametracker');
        }
    });
});
/*==========================================*/

module.exports = router;
